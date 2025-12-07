import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { Instructions } from './components/Instructions';
import { UserForm } from './components/UserForm';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { AppStep, TestResult, EmotionScore, EmotionType, UserData } from './types';
import { QUESTIONS, EMOTION_COLORS, getScoreLevel } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [result, setResult] = useState<TestResult | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleUserFormSubmit = (data: UserData) => {
    setUserData(data);
    setStep('quiz');
  };

  const calculateResults = (answers: Record<number, number>) => {
    if (!userData) return;

    // Initialize scores
    const rawScores: Record<EmotionType, number> = {
      [EmotionType.JOY]: 0,
      [EmotionType.TRUST]: 0,
      [EmotionType.FEAR]: 0,
      [EmotionType.SURPRISE]: 0,
      [EmotionType.SADNESS]: 0,
      [EmotionType.ANTICIPATION]: 0,
      [EmotionType.ANGER]: 0,
      [EmotionType.DISGUST]: 0,
    };

    // Sum answers
    Object.entries(answers).forEach(([questionId, score]) => {
      const q = QUESTIONS.find(q => q.id === Number(questionId));
      if (q) {
        rawScores[q.emotion] += score;
      }
    });

    // Format scores
    const processedScores: EmotionScore[] = Object.values(EmotionType).map(emotion => {
      const score = rawScores[emotion];
      return {
        emotion,
        score,
        level: getScoreLevel(score),
        color: EMOTION_COLORS[emotion]
      };
    });

    // Find dominant
    const dominant = processedScores.reduce((prev, current) => 
      (current.score > prev.score) ? current : prev
    );

    setResult({
      scores: processedScores,
      dominantEmotion: dominant,
      timestamp: new Date().toISOString(),
      userData: userData
    });
    
    setStep('results');
  };

  const handleRestart = () => {
    setResult(null);
    setUserData(null);
    setStep('landing');
    window.scrollTo(0,0);
  };

  return (
    <div className="font-sans antialiased text-slate-800">
      {step === 'landing' && (
        <Landing onStart={() => setStep('instructions')} />
      )}
      
      {step === 'instructions' && (
        <Instructions onNext={() => setStep('user-form')} />
      )}

      {step === 'user-form' && (
        <UserForm onSubmit={handleUserFormSubmit} />
      )}
      
      {step === 'quiz' && (
        <Quiz 
          questions={QUESTIONS} 
          onComplete={calculateResults} 
        />
      )}
      
      {step === 'results' && result && (
        <Results 
          result={result} 
          onRetake={handleRestart} 
        />
      )}
    </div>
  );
};

export default App;