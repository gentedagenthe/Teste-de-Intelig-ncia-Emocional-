import React from 'react';
import { Button } from './Button';
import { Logo } from './Logo';
import { Info, AlertCircle, Eye, Clock } from 'lucide-react';

interface InstructionsProps {
  onNext: () => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center">
        <div className="mb-8">
          <Logo className="h-10 w-auto" />
        </div>

        <h2 className="font-heading text-3xl font-bold text-brand-dark mb-8 text-center">Instruções Importantes</h2>
        
        <div className="space-y-6 mb-10 w-full">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-brand-primary">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Seja Honesto</h3>
              <p className="text-gray-600">Não há respostas certas ou erradas. Responda como você <span className="font-bold text-brand-primary">realmente tem se sentido</span> nas últimas semanas, não como gostaria de ser.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Reserve um Tempo</h3>
              <p className="text-gray-600">O teste leva cerca de 10 a 15 minutos. Tente fazer em um momento tranquilo, sem interrupções.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">A Escala</h3>
              <p className="text-gray-600 mb-2">Você usará uma escala de 1 a 5:</p>
              <div className="grid grid-cols-5 gap-1 text-center text-xs md:text-sm font-medium text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>1<br/>Nunca</div>
                <div>2<br/>Pouco</div>
                <div>3<br/>Às vezes</div>
                <div>4<br/>Muito</div>
                <div>5<br/>Sempre</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-l-4 border-brand-primary p-4 mb-8 rounded-r-lg w-full">
          <div className="flex gap-2 text-brand-dark">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">Isenção de responsabilidade: Este teste é uma ferramenta educativa de autoconhecimento e não substitui diagnóstico ou acompanhamento psicológico profissional.</p>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <Button onClick={onNext} className="w-full md:w-auto md:px-12">
            Entendi, começar teste
          </Button>
        </div>
      </div>
    </div>
  );
};