'use client';

import { useSearchParams } from 'next/navigation';
import QuizFunnel from './QuizFunnel';
import { Localization, Version } from '@/lib/types';

interface QuizFunnelEntryProps {
  localization: Localization;
}

export default function QuizFunnelEntry({ localization }: QuizFunnelEntryProps) {
  const params = useSearchParams();
  const version: Version = params.get('v') === 'b' ? 'b' : 'a';

  return <QuizFunnel version={version} localization={localization} />;
}
