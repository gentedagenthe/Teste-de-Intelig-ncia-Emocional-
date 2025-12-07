export enum EmotionType {
  JOY = 'Alegria',
  TRUST = 'Confiança',
  FEAR = 'Medo',
  SURPRISE = 'Surpresa',
  SADNESS = 'Tristeza',
  ANTICIPATION = 'Antecipação',
  ANGER = 'Raiva',
  DISGUST = 'Nojo'
}

export interface Question {
  id: number;
  text: string;
  emotion: EmotionType;
}

export interface EmotionScore {
  emotion: EmotionType;
  score: number; // 8 to 40
  level: 'Equilíbrio' | 'Atenção' | 'Alerta' | 'Urgente';
  color: string;
}

export interface UserData {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
}

export interface TestResult {
  scores: EmotionScore[];
  dominantEmotion: EmotionScore;
  timestamp: string;
  userData: UserData;
}

export type AppStep = 'landing' | 'instructions' | 'user-form' | 'quiz' | 'results';