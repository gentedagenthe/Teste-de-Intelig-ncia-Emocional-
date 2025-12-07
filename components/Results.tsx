
import React, { useMemo, useEffect, useRef } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { TestResult, EmotionType } from '../types';
import { REPORT_CONTENT } from '../constants';
import { Button } from './Button';
import { Logo } from './Logo';
import { Download, AlertTriangle, CheckCircle, RefreshCw, Phone, Lock, ArrowRight, User, Star, FileText, CreditCard } from 'lucide-react';
import jsPDF from 'jspdf';

// --- CONFIGURAÇÃO DE PAGAMENTO ---
// Link para onde o usuário vai ao clicar em "Comprar"
const CHECKOUT_LINK = "https://seu-link-de-pagamento-aqui.com"; 

// --- CONFIGURAÇÃO DA PLANILHA GOOGLE (A PARTE MAIS IMPORTANTE) ---
// URL configurada para o script de recepção de leads da Genthe
const GOOGLE_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbx4PT8UWlkTFcKZWJIh3PCiuOl1CEfo2p2jvCH8GXiLdU_St6eYW98bkOzr-e8JQEj-Ug/exec";

interface ResultsProps {
  result: TestResult;
  onRetake: () => void;
}

export const Results: React.FC<ResultsProps> = ({ result, onRetake }) => {
  const dataSentRef = useRef(false);

  const chartData = useMemo(() => {
    return result.scores.map(s => ({
      subject: s.emotion,
      A: s.score,
      fullMark: 40,
    }));
  }, [result]);

  const urgentEmotions = result.scores.filter(s => s.score >= 33);

  // Envio automático do Lead para a Planilha Google
  useEffect(() => {
    // Evita enviar duas vezes (React Strict Mode pode rodar o efeito 2x)
    if (dataSentRef.current) return;
    
    // Verifica se a URL foi configurada corretamente
    if (GOOGLE_SCRIPT_URL.includes("COLE_SUA_URL") || GOOGLE_SCRIPT_URL === "") {
      console.warn("⚠️ AVISO: A URL do Google Script ainda não foi configurada no código.");
      return;
    }

    const dataToSend = {
      name: result.userData.name,
      email: result.userData.email,
      cpf: result.userData.cpf,
      birthDate: result.userData.birthDate,
      emotion: result.dominantEmotion.emotion,
      score: result.dominantEmotion.score
    };

    // Envio usando fetch para o Google Apps Script
    // O modo 'no-cors' é essencial para enviar dados ao Google sem bloqueio do navegador
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend)
    })
    .then(() => {
      console.log('✅ SUCESSO: Dados enviados para a planilha!');
      dataSentRef.current = true;
    })
    .catch((err) => {
      console.error('❌ ERRO: Falha ao enviar para planilha:', err);
    });

  }, [result]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 92, 144); // Azul Genthe #005C90
    doc.text("Genthe", 20, 20);
    
    doc.setFontSize(18);
    doc.text("Resumo de Inteligência Emocional", 20, 30);
    
    // Dados do Usuário
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Nome: ${result.userData.name}`, 20, 42);
    doc.text(`CPF: ${result.userData.cpf}`, 20, 47);
    doc.text(`Nascimento: ${result.userData.birthDate.split('-').reverse().join('/')}`, 110, 47);
    doc.text(`Data do Teste: ${new Date(result.timestamp).toLocaleDateString()}`, 110, 42);

    // Divisória
    doc.setDrawColor(200);
    doc.line(20, 52, pageWidth - 20, 52);
    
    // Dominant Emotion
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`Emoção Predominante: ${result.dominantEmotion.emotion}`, 20, 65);
    
    doc.setFontSize(12);
    doc.text(`Nível: ${result.dominantEmotion.score}/40`, 20, 72);

    let yPos = 85;

    // Report Content
    const content = REPORT_CONTENT[result.dominantEmotion.emotion];
    
    doc.setFontSize(14);
    doc.setTextColor(0, 92, 144);
    doc.text("Perfil Simplificado", 20, yPos);
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
    doc.text("Dicas Básicas de Equilíbrio", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setTextColor(0);
    content.balance.forEach(item => {
      doc.text(`- ${item}`, 20, yPos);
      yPos += 7;
    });

    // Sales Pitch in PDF
    yPos += 20;
    doc.setDrawColor(0, 92, 144);
    doc.setLineWidth(0.5);
    doc.rect(20, yPos, pageWidth - 40, 40);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 92, 144);
    doc.text("Este é apenas um resumo gratuito.", 30, yPos + 15);
    doc.setTextColor(50);
    doc.text("Para ter acesso à análise completa das 8 emoções e plano de ação,", 30, yPos + 22);
    doc.text("adquira o relatório completo por R$ 14,90.", 30, yPos + 29);


    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Este relatório é informativo e não substitui diagnóstico profissional.", 20, 280);
    doc.text("Genthe - Gente que entende de gente", 20, 285);

    doc.save(`genthe-resumo-${result.userData.name.split(' ')[0].toLowerCase()}.pdf`);
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'Urgente': return 'bg-red-500 text-white';
      case 'Alerta': return 'bg-orange-400 text-white';
      case 'Atenção': return 'bg-yellow-400 text-gray-900';
      default: return 'bg-green-500 text-white';
    }
  };

  const handlePurchase = () => {
    let url = CHECKOUT_LINK;
    
    // Verificação simples se o link foi configurado
    if (url.includes('seu-link-de-pagamento-aqui')) {
      alert("Você será redirecionado para a página de pagamento em breve.");
      return;
    }
    
    // Tenta adicionar o email para preenchimento automático
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}email=${encodeURIComponent(result.userData.email)}&prefilled_email=${encodeURIComponent(result.userData.email)}`;
    
    window.open(url, '_blank');
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
          <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
            <User className="w-4 h-4" />
            <span className="font-medium">Olá, {result.userData.name.split(' ')[0]}</span>
          </div>
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
            <h2 className="text-2xl font-heading font-bold text-gray-800">Seu Guia (Resumo)</h2>
            <Button onClick={handleDownloadPDF} variant="outline" className="hidden md:flex gap-2">
              <Download className="w-4 h-4" /> Baixar Resumo
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

        {/* SALES SECTION - RELATÓRIO COMPLETO */}
        <div className="bg-gradient-to-br from-[#1F4E78] to-[#005C90] text-white rounded-3xl shadow-xl overflow-hidden animate-fade-in">
          <div className="p-8 md:p-12 relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 bg-white opacity-5 w-64 h-64 rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 bg-[#7CC242] opacity-10 w-48 h-48 rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#7CC242] font-bold uppercase tracking-wider text-sm bg-white/10 w-fit px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Oferta Especial</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
                  Desbloqueie seu Relatório Completo
                </h2>
                
                <p className="text-blue-100 text-lg leading-relaxed">
                  O que você viu acima foi apenas o resumo. Tenha acesso à análise profunda de <strong>todas as suas 8 emoções</strong> e um plano prático para sua vida.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-blue-50">
                    <CheckCircle className="w-5 h-5 text-[#7CC242]" />
                    <span>Análise detalhada das 8 emoções</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-50">
                    <CheckCircle className="w-5 h-5 text-[#7CC242]" />
                    <span>Gráficos comparativos avançados</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-50">
                    <CheckCircle className="w-5 h-5 text-[#7CC242]" />
                    <span>Exercícios práticos personalizados</span>
                  </li>
                  <li className="flex items-center gap-3 text-blue-50">
                    <CheckCircle className="w-5 h-5 text-[#7CC242]" />
                    <span>Orientação de carreira e relacionamentos</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20 shadow-2xl">
                <span className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-2">Investimento Único</span>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold opacity-60">R$</span>
                  <span className="text-5xl font-bold text-white">14,90</span>
                </div>

                <button 
                  onClick={handlePurchase}
                  className="w-full bg-[#7CC242] hover:bg-[#6ab035] text-white py-4 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg group mb-4"
                >
                  <CreditCard className="w-5 h-5" />
                  Comprar Relatório Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="text-xs text-blue-200 text-center space-y-2">
                  <p>Pagamento seguro (PIX ou Cartão)</p>
                  <p className="opacity-70">Ambiente Criptografado 🔒</p>
                </div>
              </div>

            </div>
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
              <Download className="w-4 h-4" /> Baixar Resumo Gratuito
           </Button>
           <Button onClick={onRetake} variant="outline" className="md:w-auto flex items-center justify-center gap-2 border-gray-300 text-gray-500 hover:text-brand-dark">
             <RefreshCw className="w-4 h-4" /> Refazer Teste
           </Button>
        </div>

      </div>
    </div>
  );
};
