'use client';

import { useSearchParams } from 'next/navigation';
import QuizFunnel from './QuizFunnel';
import { Version } from '@/lib/types';

export default function QuizFunnelEntry() {
  const params = useSearchParams();
  const version: Version = params.get('v') === 'b' ? 'b' : 'a';
  return <QuizFunnel version={version} />;
}
