import React, { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { EmotionScore, TestResult, EmotionType } from '../types';
import { EMOTION_COLORS, REPORT_CONTENT, getScoreLevel } from '../constants';
import { Button } from './Button';
import { Logo } from './Logo';
import { Download, AlertTriangle, CheckCircle, RefreshCw, Phone } from 'lucide-react';
import jsPDF from 'jspdf';

interface ResultsProps {
  result: TestResult;
  onRetake: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onRetake }) => {
  const chartData = useMemo(() => {
    return result.scores.map(s => ({
      subject: s.emotion,
      A: s.score,
      fullMark: 40,
    }));
  }, [result]);

  const urgentEmotions = result.scores.filter(s => s.score >= 33);
  const alertEmotions = result.scores.filter(s => s.score >= 25 && s.score < 33);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(31, 78, 120); // brand-dark
    doc.text("Genthe", 20, 20);
    
    doc.setFontSize(18);
    doc.text("Relatório de Inteligência Emocional", 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Dominant Emotion
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`Emoção Predominante: ${result.dominantEmotion.emotion}`, 20, 55);
    
    doc.setFontSize(12);
    doc.text(`Nível: ${result.dominantEmotion.score}/40`, 20, 62);

    let yPos = 75;

    // Report Content
    const content = REPORT_CONTENT[result.dominantEmotion.emotion];
    
    doc.setFontSize(14);
    doc.setTextColor(31, 78, 120);
    doc.text("Perfil", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(content.title, 20, yPos);
    yPos += 15;

    doc.setFontSize(14);
    doc.setTextColor(200, 0, 0);
    doc.text("Pontos de Atenção", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0);
    content.care.forEach(item => {
      doc.text(`- ${item}`, 20, yPos);
      yPos += 7;
    });
    yPos += 5;

    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0);
    doc.text("Como Equilibrar", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setTextColor(0);
    content.balance.forEach(item => {
      doc.text(`- ${item}`, 20, yPos);
      yPos += 7;
    });

    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Este relatório é informativo e não substitui diagnóstico profissional.", 20, 280);
    doc.text("Genthe - Gente que entende de gente", 20, 285);

    doc.save("genthe-perfil-emocional.pdf");
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'Urgente': return 'bg-red-500 text-white';
      case 'Alerta': return 'bg-orange-400 text-white';
      case 'Atenção': return 'bg-yellow-400 text-gray-900';
      default: return 'bg-green-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center space-y-4">
           <div className="mb-2">
            <Logo className="h-16 w-auto" />
           </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">Seu Mapa Emocional</h1>
          <p className="text-lg text-gray-600">Baseado em suas respostas, aqui está a análise do seu momento atual.</p>
        </div>

        {/* Top Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Chart Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">Radar das Emoções</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 40]} tick={false} axisLine={false} />
                  <Radar
                    name="Você"
                    dataKey="A"
                    stroke="#4472C4"
                    fill="#4472C4"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> >32 Urgente</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div> >24 Alerta</span>
            </div>
          </div>

          {/* Dominant Emotion Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
            
            <h2 className="text-gray-500 font-medium text-sm tracking-widest uppercase mb-1">Emoção Predominante</h2>
            <div className="flex items-baseline gap-3 mb-6">
              <h1 className="text-5xl font-heading font-bold text-brand-dark">
                {result.dominantEmotion.emotion}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getUrgencyColor(result.dominantEmotion.level)}`}>
                {result.dominantEmotion.level}
              </span>
            </div>

            <div className="flex-1 space-y-6">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-2">
                  {REPORT_CONTENT[result.dominantEmotion.emotion].title}
                </h4>
                <p className="text-gray-600 text-sm">
                  Esta emoção está guiando a maior parte das suas reações e decisões no momento atual. 
                </p>
              </div>

              {/* Show critical alerts if any */}
              {urgentEmotions.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-red-800 font-bold">Nível Crítico Detectado</p>
                      <p className="text-xs text-red-700 mt-1">
                        Você pontuou muito alto em: {urgentEmotions.map(e => e.emotion).join(', ')}. 
                        Considere buscar apoio profissional.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Report Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-heading font-bold text-gray-800">Seu Guia Personalizado</h2>
            <Button onClick={handleDownloadPDF} variant="outline" className="hidden md:flex gap-2">
              <Download className="w-4 h-4" /> Baixar PDF
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4 text-orange-600">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Pontos de Atenção</h3>
              </div>
              <ul className="space-y-4">
                {REPORT_CONTENT[result.dominantEmotion.emotion].care.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-orange-50 p-4 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-white text-orange-500 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">!</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Como Cultivar Equilíbrio</h3>
              </div>
              <ul className="space-y-4">
                {REPORT_CONTENT[result.dominantEmotion.emotion].balance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-white text-green-600 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Help Resources */}
        {(result.dominantEmotion.emotion === EmotionType.SADNESS || urgentEmotions.length > 0) && (
           <div className="bg-brand-dark text-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4">
                <div className="bg-white/10 p-4 rounded-full">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Precisa conversar com alguém?</h3>
                  <p className="text-brand-light opacity-90">O CVV realiza apoio emocional gratuito 24h.</p>
                </div>
             </div>
             <a 
               href="tel:188" 
               className="bg-white text-brand-dark px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
             >
               Ligar 188
             </a>
           </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center pb-8">
           <Button onClick={handleDownloadPDF} variant="secondary" className="md:hidden w-full flex justify-center gap-2">
              <Download className="w-4 h-4" /> Baixar Relatório PDF
           </Button>
           <Button onClick={onRetake} variant="primary" className="md:w-auto flex items-center justify-center gap-2">
             <RefreshCw className="w-4 h-4" /> Refazer Teste
           </Button>
        </div>

      </div>
    </div>
  );
};