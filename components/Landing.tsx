import React from 'react';
import { Brain, Heart, Activity } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-light to-white p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in">
        <div className="grid md:grid-cols-2">
          
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="mb-8 self-start">
              <Logo className="h-12 w-auto" />
            </div>

            <div className="flex items-center gap-2 mb-6 text-brand-primary font-bold tracking-wider text-sm uppercase">
              <Activity className="w-4 h-4" />
              <span>Autodesenvolvimento</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Sua <span className="text-brand-primary">Emoção Predominante</span> é?
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Baseado na teoria de Plutchik, este teste identifica seus padrões emocionais e oferece um guia personalizado para o equilíbrio.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onStart} fullWidth>
                Iniciar Teste Gratuito
              </Button>
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm py-3 px-4">
                <Brain className="w-4 h-4" />
                <span>10-15 minutos</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary/5 p-10 flex flex-col justify-center items-center text-center border-l border-gray-100">
            <div className="bg-white p-6 rounded-full shadow-lg mb-8">
              <Heart className="w-16 h-16 text-brand-primary" />
            </div>
            
            <h3 className="font-heading text-xl font-bold text-brand-dark mb-4">Por que fazer este teste?</h3>
            
            <ul className="space-y-4 text-left max-w-xs mx-auto text-gray-600">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                <span>Mapeie as 8 emoções primárias</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                <span>Identifique suas áreas emocionais</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                <span>Receba relatório prático de cuidados</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-gray-400 text-sm">
        <p>2024 Teste Gente e suas Emoções da Genthe. Acesse <a href="https://www.genthe.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">www.genthe.com.br</a></p>
      </footer>
    </div>
  );
};