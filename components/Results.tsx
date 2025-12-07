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
import { Download, AlertTriangle, CheckCircle, RefreshCw, Phone, Calendar, ArrowRight } from 'lucide-react';
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
    doc.setTextColor(0, 92, 144); // Azul Genthe #005C90
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
    doc.setTextColor(0, 92, 144);
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
    doc.setTextColor(124, 194, 66); // Verde Genthe #7CC242
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

  // WhatsApp comercial da Genthe atualizado
  const whatsappLink = "https://wa.me/5567998005656?text=Olá! Fiz o teste de Inteligência Emocional e gostaria de saber mais sobre a Devolutiva com especialista.";

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
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> &gt;32 Urgente</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400"></div> &gt;24 Alerta</span>
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

        {/* SALES SECTION - DEVOLUTIVA */}
        <div className="bg-gradient-to-r from-[#1F4E78] to-[#4472C4] text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white opacity-10 w-64 h-64 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2 text-brand-light font-bold uppercase tracking-wider text-sm">
                <Calendar className="w-4 h-4" />
                <span>Exclusivo Genthe</span>
              </div>
              <h2 className="text-3xl font-heading font-bold leading-tight">
                Quer ir além deste resultado?
              </h2>
              <p className="text-blue-100 text-lg">
                Agende uma <span className="font-bold text-white">Devolutiva com um Especialista</span>. Transforme esse diagnóstico em um plano de ação concreto para sua carreira e vida pessoal.
              </p>
            </div>

            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7CC242] hover:bg-[#6ab035] text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 text-lg whitespace-nowrap"
            >
              Agendar Devolutiva
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Help Resources (CVV) - Only if needed */}
        {(result.dominantEmotion.emotion === EmotionType.SADNESS || urgentEmotions.length > 0) && (
           <div className="bg-gray-800 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-90">
             <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Apoio Emocional Gratuito</h3>
                  <p className="text-gray-300">Se estiver muito difícil, o CVV (Centro de Valorização da Vida) atende 24h.</p>
                </div>
             </div>
             <a 
               href="tel:188" 
               className="text-white underline hover:text-gray-200"
             >
               Ligar 188
             </a>
           </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center pb-8 pt-4">
           <Button onClick={handleDownloadPDF} variant="secondary" className="md:hidden w-full flex justify-center gap-2">
              <Download className="w-4 h-4" /> Baixar Relatório PDF
           </Button>
           <Button onClick={onRetake} variant="outline" className="md:w-auto flex items-center justify-center gap-2 border-gray-300 text-gray-500 hover:text-brand-dark">
             <RefreshCw className="w-4 h-4" /> Refazer Teste
           </Button>
        </div>

      </div>
    </div>
  );
};