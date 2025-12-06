import { EmotionType, Question, EmotionScore } from './types';

// Colors for the Radar Chart and UI
export const EMOTION_COLORS: Record<EmotionType, string> = {
  [EmotionType.JOY]: '#FFD700',
  [EmotionType.TRUST]: '#4472C4',
  [EmotionType.FEAR]: '#9370DB',
  [EmotionType.SURPRISE]: '#FF6B6B',
  [EmotionType.SADNESS]: '#4A5568',
  [EmotionType.ANTICIPATION]: '#48BB78',
  [EmotionType.ANGER]: '#E53E3E',
  [EmotionType.DISGUST]: '#8B4513',
};

// Generating 64 questions (8 per emotion)
const createQuestions = (): Question[] => {
  const qs: Question[] = [];
  let id = 1;

  // Q1-8: JOY
  const joyQs = [
    "Sinto-me otimista em relação ao meu futuro.",
    "Tenho facilidade em sorrir e rir durante o dia.",
    "Percebo beleza nas pequenas coisas do cotidiano.",
    "Sinto uma sensação de leveza e bem-estar geral.",
    "Consigo celebrar as conquistas dos outros genuinamente.",
    "Sinto gratidão pelas experiências que vivo.",
    "Tenho energia para iniciar novos projetos.",
    "Sinto-me conectado e em harmonia com as pessoas ao redor."
  ];
  joyQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.JOY }));

  // Q9-16: TRUST
  const trustQs = [
    "Acredito que as pessoas são, em sua maioria, bem-intencionadas.",
    "Sinto-me seguro para expressar minhas opiniões verdadeiras.",
    "Tenho facilidade em delegar tarefas e confiar no resultado.",
    "Aceito ajuda quando preciso sem me sentir diminuído.",
    "Sinto que pertenço aos grupos que frequento.",
    "Acredito que as coisas vão se resolver da melhor forma.",
    "Tenho facilidade em perdoar falhas minhas e dos outros.",
    "Sinto-me apoiado pelas pessoas próximas."
  ];
  trustQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.TRUST }));

  // Q17-24: FEAR
  const fearQs = [
    "Sinto uma preocupação constante de que algo ruim vai acontecer.",
    "Tenho dificuldade em relaxar devido à tensão nervosa.",
    "Evito situações novas por receio do desconhecido.",
    "Sinto palpitações ou aperto no peito sem motivo físico aparente.",
    "Tenho medo de ser julgado ou rejeitado socialmente.",
    "Preocupo-me excessivamente com a segurança financeira.",
    "Sinto-me paralisado diante de decisões importantes.",
    "Tenho pensamentos recorrentes sobre perigos potenciais."
  ];
  fearQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.FEAR }));

  // Q25-32: SURPRISE
  const surpriseQs = [
    "Fico facilmente chocado com notícias inesperadas.",
    "Tenho dificuldade em me adaptar a mudanças repentinas.",
    "Sinto-me desorientado quando minha rotina é quebrada.",
    "Reajo de forma exagerada a sustos ou imprevistos.",
    "Sinto-me frequentemente despreparado para o que acontece.",
    "Tenho dificuldade em acreditar quando algo inusitado ocorre.",
    "Fico atordoado por muito tempo após uma novidade.",
    "Questiono constantemente 'como isso foi acontecer?'."
  ];
  surpriseQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.SURPRISE }));

  // Q33-40: SADNESS
  const sadnessQs = [
    "Sinto um desânimo frequente para realizar tarefas diárias.",
    "Tenho vontade de chorar sem um motivo específico.",
    "Sinto-me isolado, mesmo estando acompanhado.",
    "Perdi o interesse em atividades que antes me davam prazer.",
    "Tenho pensamentos pessimistas sobre mim mesmo.",
    "Sinto um cansaço emocional que o sono não resolve.",
    "Tenho dificuldade em ver propósito nas minhas ações.",
    "Sinto falta de energia vital."
  ];
  sadnessQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.SADNESS }));

  // Q41-48: ANTICIPATION
  const antQs = [
    "Passo muito tempo planejando o futuro e pouco vivendo o agora.",
    "Sinto ansiedade esperando por eventos futuros.",
    "Tenho dificuldade em lidar com a espera.",
    "Estou sempre monitorando o ambiente em busca de sinais.",
    "Crio roteiros mentais de conversas que ainda não aconteceram.",
    "Tenho necessidade de controlar os desfechos das situações.",
    "Fico agitado dias antes de um compromisso importante.",
    "Tenho dificuldade em improvisar."
  ];
  antQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.ANTICIPATION }));

  // Q49-56: ANGER
  const angerQs = [
    "Sinto-me irritado facilmente com pequenos contratempos.",
    "Tenho vontade de explodir quando sou contrariado.",
    "Sinto tensão muscular na mandíbula ou punhos frequentemente.",
    "Tenho pensamentos de vingança ou retaliação.",
    "Sinto que as pessoas estão testando minha paciência.",
    "Tenho reações verbais agressivas das quais me arrependo.",
    "Sinto o rosto esquentar em discussões simples.",
    "Tenho dificuldade em tolerar erros alheios."
  ];
  angerQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.ANGER }));

  // Q57-64: DISGUST
  const disgustQs = [
    "Sinto repulsa frequente por comportamentos alheios.",
    "Tenho dificuldade em conviver com quem pensa diferente de mim.",
    "Sinto-me contaminado em certos ambientes.",
    "Tenho critério excessivamente rígido sobre o que é aceitável.",
    "Afasto-me de pessoas que considero moralmente inferiores.",
    "Sinto náusea física diante de situações desagradáveis.",
    "Tenho dificuldade em aceitar imperfeições.",
    "Sinto desprezo por atitudes que considero fracas."
  ];
  disgustQs.forEach(text => qs.push({ id: id++, text, emotion: EmotionType.DISGUST }));

  return qs;
};

export const QUESTIONS = createQuestions();

export const REPORT_CONTENT: Record<EmotionType, { title: string; care: string[]; balance: string[] }> = {
  [EmotionType.JOY]: {
    title: "Perfil: Otimista e Expansivo",
    care: [
      "Cuidado com o excesso de otimismo que ignora riscos reais.",
      "Atenção para não invalidar a dor alheia com positividade tóxica.",
      "Evite prometer mais do que pode cumprir no calor da empolgação."
    ],
    balance: [
      "Pratique a escuta ativa empática.",
      "Equilibre sonhos com planejamento prático."
    ]
  },
  [EmotionType.TRUST]: {
    title: "Perfil: Confiante e Agregador",
    care: [
      "Cuidado com a ingenuidade ao confiar cegamente.",
      "Atenção para não anular suas próprias necessidades para agradar.",
      "Evite assumir responsabilidades de outros por excesso de disponibilidade."
    ],
    balance: [
      "Estabeleça limites saudáveis.",
      "Valide sua intuição quando algo parecer errado."
    ]
  },
  [EmotionType.FEAR]: {
    title: "Perfil: Cauteloso e Preservador",
    care: [
      "Atenção à paralisia diante de decisões.",
      "Cuidado com o isolamento social por receio.",
      "Evite a catastrofização de cenários futuros."
    ],
    balance: [
      "Pratique exercícios de respiração e ancoragem.",
      "Exponha-se gradualmente a pequenos riscos calculados."
    ]
  },
  [EmotionType.SURPRISE]: {
    title: "Perfil: Reativo e Impresionável",
    care: [
      "Cuidado com a desorientação frequente.",
      "Atenção à dificuldade de manter o foco e a constância.",
      "Evite reações impulsivas diante do novo."
    ],
    balance: [
      "Estabeleça rotinas sólidas para criar segurança.",
      "Pratique mindfulness para manter o centro."
    ]
  },
  [EmotionType.SADNESS]: {
    title: "Perfil: Reflexivo e Introspectivo",
    care: [
      "Atenção ao isolamento prolongado.",
      "Cuidado com a ruminação de pensamentos negativos.",
      "Alerta para a perda de vitalidade física."
    ],
    balance: [
      "Busque conexões sociais, mesmo que pequenas.",
      "Mantenha uma rotina mínima de movimento físico."
    ]
  },
  [EmotionType.ANTICIPATION]: {
    title: "Perfil: Planejador e Vigilante",
    care: [
      "Cuidado com a ansiedade crônica.",
      "Atenção para não deixar de viver o presente.",
      "Evite o controle excessivo sobre os outros."
    ],
    balance: [
      "Pratique estar presente no 'aqui e agora'.",
      "Exercite a flexibilidade diante de imprevistos."
    ]
  },
  [EmotionType.ANGER]: {
    title: "Perfil: Energético e Defensivo",
    care: [
      "Cuidado com reações destrutivas nos relacionamentos.",
      "Atenção à hipertensão e problemas gástricos.",
      "Evite decisões tomadas no calor do momento."
    ],
    balance: [
      "Canalize a energia para atividades físicas vigorosas.",
      "Pratique a pausa antes de reagir (conte até 10)."
    ]
  },
  [EmotionType.DISGUST]: {
    title: "Perfil: Crítico e Seletivo",
    care: [
      "Cuidado com a arrogância e o isolamento.",
      "Atenção à rigidez excessiva que afasta pessoas.",
      "Evite o julgamento precipitado."
    ],
    balance: [
      "Pratique a tolerância e a aceitação das diferenças.",
      "Foque nas qualidades, não apenas nos defeitos."
    ]
  }
};

export const getScoreLevel = (score: number): EmotionScore['level'] => {
  if (score >= 33) return 'Urgente';
  if (score >= 25) return 'Alerta';
  if (score >= 17) return 'Atenção';
  return 'Equilíbrio';
};