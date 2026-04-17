'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen, Answers, Version } from '@/lib/types';
import { QUESTIONS, getNextScreen } from '@/lib/quizData';
import QuizHeader from './QuizHeader';
import LandingPage from './LandingPage';
import QuizQuestion from './QuizQuestion';
import ResultsPage1 from './ResultsPage1';
import EducationSlide from './EducationSlide';
import ResultsPage2 from './ResultsPage2';

interface QuizFunnelProps {
  version: Version;
}

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function QuizFunnel({ version }: QuizFunnelProps) {
  const initialScreen: Screen = version === 'b' ? 'landing' : 'q1';
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);

  const advance = useCallback(
    (nextScreen?: Screen) => {
      setDirection(1);
      setScreen((cur) => nextScreen ?? getNextScreen(cur, version));
    },
    [version]
  );

  function handleAnswer(questionId: keyof Omit<Answers, 'gender'>, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    advance();
  }

  function handleGenderSelect(gender: string) {
    setAnswers((prev) => ({ ...prev, gender }));
    advance('q1');
  }

  const showHeader = screen !== 'landing';

  const questionConfig = QUESTIONS.find((q) => q.screen === screen);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {showHeader && <QuizHeader screen={screen} />}

      <div className="flex-1 flex items-start justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {screen === 'landing' && <LandingPage onGenderSelect={handleGenderSelect} />}

            {questionConfig && (
              <QuizQuestion
                config={questionConfig}
                currentAnswer={answers[questionConfig.id]}
                onAnswer={(val) => handleAnswer(questionConfig.id, val)}
              />
            )}

            {screen === 'results1' && <ResultsPage1 onContinue={() => advance()} />}

            {screen === 'education' && <EducationSlide onContinue={() => advance()} />}

            {screen === 'results2' && <ResultsPage2 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
