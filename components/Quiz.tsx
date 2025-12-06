import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Record<number, number>) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [animate, setAnimate] = useState(true);

  const currentQuestion = questions[currentIndex];
  const progress = currentIndex + 1;
  const total = questions.length;
  const isLast = currentIndex === total - 1;

  useEffect(() => {
    setAnimate(true);
  }, [currentIndex]);

  const handleOptionSelect = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    // Auto advance after short delay for better UX
    setTimeout(() => {
        handleNext(value);
    }, 250);
  };

  const handleNext = (currentValue?: number) => {
    // Determine if we have a value for the current question
    const val = currentValue || answers[currentQuestion.id];
    
    if (!val) return; // Prevent advancing if no answer

    if (isLast) {
      onComplete({ ...answers, [currentQuestion.id]: val });
    } else {
      setAnimate(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimate(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  const scaleOptions = [
    { val: 1, label: 'Nunca' },
    { val: 2, label: 'Pouco' },
    { val: 3, label: 'Às vezes' },
    { val: 4, label: 'Frequente' },
    { val: 5, label: 'Sempre' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mb-6">
        <ProgressBar current={progress} total={total} />
      </div>

      <div className={`w-full max-w-3xl bg-white rounded-3xl shadow-lg p-6 md:p-12 transition-all duration-300 transform ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <div className="mb-8">
          <span className="text-brand-primary font-bold text-sm tracking-wider uppercase mb-2 block">
            Questão {progress} de {total}
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-medium text-gray-800 leading-snug min-h-[5rem]">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-4 mb-10">
          {scaleOptions.map((opt) => {
            const isSelected = answers[currentQuestion.id] === opt.val;
            return (
              <button
                key={opt.val}
                onClick={() => handleOptionSelect(opt.val)}
                className={`
                  flex flex-col items-center justify-center p-2 md:p-4 rounded-xl border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-brand-primary bg-brand-primary text-white shadow-md scale-105' 
                    : 'border-gray-200 hover:border-brand-primary/50 hover:bg-brand-light/30 text-gray-600'}
                `}
              >
                <span className={`text-xl md:text-3xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                  {opt.val}
                </span>
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-wide hidden md:block">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Mobile Labels for scale */}
        <div className="flex justify-between text-xs text-gray-400 px-2 mb-8 md:hidden">
            <span>Nunca</span>
            <span>Sempre</span>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center text-gray-500 hover:text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>
          
          <div className="text-gray-300 text-sm hidden md:block">
            Selecione uma opção para avançar
          </div>

          <Button 
            onClick={() => handleNext()}
            disabled={!answers[currentQuestion.id]}
            className="px-8 py-2 md:py-3"
          >
            {isLast ? 'Finalizar' : 'Próxima'}
            {!isLast && <ArrowRight className="w-5 h-5 ml-2 inline-block" />}
          </Button>
        </div>
      </div>
    </div>
  );
};