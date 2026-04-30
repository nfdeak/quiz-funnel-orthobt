-- One-time analytics adjustment for the Q1 age bucket change.
--
-- Old buckets: 20-29, 30-39, 40-49, 50+
-- New buckets: 30-39, 40-49, 50-59, 60+
-- Cutoff: only shift pre-change events before 2026-04-30 15:38:11.343+00.
--
-- This script is safe to re-run:
-- - The old-bucket shift is guarded by public.analytics_data_migrations.
-- - The '<39' normalization is idempotent and can run repeatedly.

create table if not exists public.analytics_data_migrations (
  name text primary key,
  applied_at timestamptz not null default now()
);

-- Preview the rows that will be changed.
with old_bucket_candidates as (
  select
    'pre_cutoff_bucket_shift' as update_type,
    answer_text as previous_answer,
    case answer_text
      when '20-29' then '30-39'
      when '30-39' then '40-49'
      when '40-49' then '50-59'
      when '50+' then '60+'
    end as adjusted_answer,
    count(*)::bigint as rows_to_update
  from public.quiz_events
  where not exists (
      select 1
      from public.analytics_data_migrations
      where name = '2026-04-30-shift-q1-age-buckets'
    )
    and event_type = 'answer'
    and question_id = 'q1'
    and created_at < timestamp with time zone '2026-04-30 15:38:11.343+00'
    and answer_text in ('20-29', '30-39', '40-49', '50+')
  group by answer_text
),
placeholder_candidates as (
  select
    'placeholder_normalization' as update_type,
    answer_text as previous_answer,
    '30-39' as adjusted_answer,
    count(*)::bigint as rows_to_update
  from public.quiz_events
  where event_type = 'answer'
    and question_id = 'q1'
    and answer_text = '<39'
  group by answer_text
)
select *
from old_bucket_candidates
union all
select *
from placeholder_candidates
order by update_type, previous_answer;

-- Run the adjustment. Change `commit;` to `rollback;` if you want a dry run.
begin;

with migration_claim as (
  insert into public.analytics_data_migrations (name)
  values ('2026-04-30-shift-q1-age-buckets')
  on conflict (name) do nothing
  returning name
),
old_bucket_updates as (
  update public.quiz_events as event
  set answer_text = case event.answer_text
    when '20-29' then '30-39'
    when '30-39' then '40-49'
    when '40-49' then '50-59'
    when '50+' then '60+'
  end
  from migration_claim
  where event.event_type = 'answer'
    and event.question_id = 'q1'
    and event.created_at < timestamp with time zone '2026-04-30 15:38:11.343+00'
    and event.answer_text in ('20-29', '30-39', '40-49', '50+')
  returning
    'pre_cutoff_bucket_shift'::text as update_type,
    case event.answer_text
      when '30-39' then '20-29'
      when '40-49' then '30-39'
      when '50-59' then '40-49'
      when '60+' then '50+'
    end as previous_answer,
    event.answer_text as adjusted_answer
),
placeholder_updates as (
  update public.quiz_events as event
  set answer_text = '30-39'
  where event.event_type = 'answer'
    and event.question_id = 'q1'
    and event.answer_text = '<39'
  returning
    'placeholder_normalization'::text as update_type,
    '<39'::text as previous_answer,
    event.answer_text as adjusted_answer
),
all_updates as (
  select * from old_bucket_updates
  union all
  select * from placeholder_updates
)
select
  update_type,
  previous_answer,
  adjusted_answer,
  count(*)::bigint as updated_rows
from all_updates
group by update_type, previous_answer, adjusted_answer
order by update_type, previous_answer;

-- Verify the resulting Q1 age distribution.
select
  answer_text as q1_age_bucket,
  count(*)::bigint as responses
from public.quiz_events
where event_type = 'answer'
  and question_id = 'q1'
group by answer_text
order by q1_age_bucket;

commit;
