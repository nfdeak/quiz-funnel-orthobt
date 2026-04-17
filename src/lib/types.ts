export type Version = 'a' | 'b';

export type Screen =
  | 'landing'
  | 'q1'
  | 'q2'
  | 'q3'
  | 'q4'
  | 'q5'
  | 'results1'
  | 'q6'
  | 'education'
  | 'q7'
  | 'q8'
  | 'results2';

export type Answers = {
  gender?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
  q6?: string[];
  q7?: string;
  q8?: string;
};

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionConfig {
  id: keyof Omit<Answers, 'gender'>;
  screen: Screen;
  question: string;
  options: QuestionOption[];
  multiSelect?: boolean;
}
