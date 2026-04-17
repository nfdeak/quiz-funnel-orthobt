import { QuestionConfig, Screen } from './types';

export const QUESTIONS: QuestionConfig[] = [
  {
    id: 'q1',
    screen: 'q1',
    question: 'How old are you?',
    options: [
      { value: '20-29', label: '20–29 Years Old' },
      { value: '30-39', label: '30–39 Years Old' },
      { value: '40-49', label: '40–49 Years Old' },
      { value: '50+', label: '50+ Years Old' },
    ],
  },
  {
    id: 'q2',
    screen: 'q2',
    question: 'Where do you feel your pain most?',
    options: [
      { value: 'lower-back', label: 'Lower back' },
      { value: 'hip-buttock', label: 'Hip or buttock' },
      { value: 'sciatica', label: 'Shooting down one leg (sciatica)' },
      { value: 'everything', label: 'A bit of everything' },
      { value: 'not-sure', label: "I'm not sure, it moves around" },
    ],
  },
  {
    id: 'q3',
    screen: 'q3',
    question:
      "Do you experience stiffness or pain that\u2019s worse in the morning or after sitting for a long time?",
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'q4',
    screen: 'q4',
    question: 'How much does your back pain affect your daily life?',
    options: [
      {
        value: 'a-lot',
        label: "A lot (I've had to stop activities I used to enjoy)",
      },
      { value: 'some', label: "Some (I push through, but it's always there)" },
      { value: 'a-little', label: 'A little (It comes and goes)' },
    ],
  },
  {
    id: 'q5',
    screen: 'q5',
    question: 'How long have you been dealing with this pain?',
    options: [
      { value: 'over-year', label: 'Over a year' },
      { value: 'past-year', label: 'In the past year' },
      { value: 'past-months', label: 'In the past few months' },
      { value: 'not-sure', label: 'Not sure' },
    ],
  },
  {
    id: 'q6',
    screen: 'q6',
    question: 'What solutions have you tried before? (Choose all that apply)',
    multiSelect: true,
    options: [
      { value: 'medication', label: 'Pain medication / anti-inflammatories' },
      { value: 'stretching', label: 'Stretching / yoga' },
      { value: 'physio', label: 'Physiotherapy' },
      { value: 'cortisone', label: 'Cortisone injections' },
      { value: 'ergonomic', label: 'Ergonomic chair / standing desk' },
      { value: 'back-brace', label: 'Back brace or support belt' },
      { value: 'others', label: 'Others' },
      { value: 'nothing', label: 'Nothing yet' },
    ],
  },
  {
    id: 'q7',
    screen: 'q7',
    question:
      "What's your biggest concern if your back pain continues unchanged?",
    options: [
      {
        value: 'mobility',
        label: "It will get worse, and I'll lose even more mobility",
      },
      {
        value: 'activities',
        label: "I'll have to give up activities I love permanently",
      },
      {
        value: 'money',
        label: "I'll keep wasting money on treatments that don't work",
      },
      {
        value: 'surgery',
        label: "I'll end up needing surgery",
      },
    ],
  },
  {
    id: 'q8',
    screen: 'q8',
    question: 'How motivated are you to fix your back pain?',
    options: [
      { value: 'extremely', label: 'Extremely (I need this fixed now)' },
      { value: 'very', label: "Very (I'm ready to try something new)" },
      { value: 'somewhat', label: "Somewhat (I've been let down before)" },
      { value: 'depends', label: 'It depends on the solution' },
    ],
  },
];

export const SCREEN_ORDER: Screen[] = [
  'landing',
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
  'results1',
  'q6',
  'education',
  'q7',
  'q8',
  'results2',
];

export const QUIZ_SCREENS: Screen[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

export function getProgressPercent(screen: Screen): number {
  const idx = QUIZ_SCREENS.indexOf(screen);
  if (idx === -1) return 0;
  return ((idx + 1) / QUIZ_SCREENS.length) * 100;
}

export function getNextScreen(current: Screen, version: string): Screen {
  const order = version === 'b' ? SCREEN_ORDER : SCREEN_ORDER.filter((s) => s !== 'landing');
  const idx = order.indexOf(current);
  return order[idx + 1] ?? 'results2';
}
