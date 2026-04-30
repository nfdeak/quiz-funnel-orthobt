import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAnalyticsParams, toSupabaseRow } from './analytics';
import { getLocalizationByLocale, getLocalizationBySlug } from './localization';

test('returns German localization for the German slug', () => {
  const localization = getLocalizationBySlug('orthogurtel-de');

  assert.equal(localization.locale, 'de-DE');
  assert.equal(localization.market, 'de');
  assert.equal(localization.slug, 'orthogurtel-de');
});

test('falls back to US localization for unsupported locales', () => {
  const localization = getLocalizationByLocale('fr-FR');

  assert.equal(localization.locale, 'en-US');
  assert.equal(localization.slug, 'orthobelt-us');
});

test('includes locale in analytics params and row mapping', () => {
  const params = buildAnalyticsParams({
    from: null,
    to: null,
    version: 'all',
    environment: 'all',
    locale: 'de-DE',
  });

  assert.equal(params.p_locale, 'de-DE');

  const row = toSupabaseRow({
    sessionId: 'session-1',
    timestamp: '2026-04-30T00:00:00.000Z',
    version: 'a',
    environment: 'prod',
    locale: 'de-DE',
    eventType: 'step_view',
    stepId: 'q1',
  });

  assert.equal(row.locale, 'de-DE');
});
