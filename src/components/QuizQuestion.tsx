'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionConfig } from '@/lib/types';

interface QuizQuestionProps {
  config: QuestionConfig;
  currentAnswer?: string | string[];
  onAnswer: (value: string | string[]) => void;
}

export default function QuizQuestion({ config, currentAnswer, onAnswer }: QuizQuestionProps) {
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []
  );

  function handleSingleSelect(value: string) {
    onAnswer(value);
  }

  function handleMultiToggle(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-stone-800 text-center mb-8 leading-snug">
        {config.question}
      </h2>

      <div className="flex flex-col gap-3">
        {config.options.map((option, i) => {
          const isSelected = config.multiSelect
            ? selected.includes(option.value)
            : currentAnswer === option.value;

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              onClick={() =>
                config.multiSelect
                  ? handleMultiToggle(option.value)
                  : handleSingleSelect(option.value)
              }
              className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-base transition-all duration-150 cursor-pointer
                ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 text-amber-900'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-amber-300 hover:bg-amber-50/40'
                }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                    ${
                      config.multiSelect
                        ? isSelected
                          ? 'bg-amber-500 border-amber-500'
                          : 'border-stone-300'
                        : isSelected
                        ? 'bg-amber-500 border-amber-500 rounded-full'
                        : 'border-stone-300 rounded-full'
                    }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {option.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      {config.multiSelect && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: selected.length > 0 ? 1 : 0.4 }}
          onClick={() => selected.length > 0 && onAnswer(selected)}
          className="mt-6 w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg tracking-wide transition-colors duration-200 disabled:opacity-40"
          disabled={selected.length === 0}
        >
          Continue →
        </motion.button>
      )}
    </div>
  );
}
