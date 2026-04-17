import { Suspense } from 'react';
import QuizFunnelEntry from '@/components/QuizFunnelEntry';

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <QuizFunnelEntry />
    </Suspense>
  );
}
