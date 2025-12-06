import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  // Cores oficiais extraídas da identidade visual
  const blueColor = "#005C90"; // Azul Genthe
  const greenColor = "#7CC242"; // Verde Genthe

  // Remove classes de altura/largura do className para controlar via style do SVG, mas mantém margens
  const containerClass = className.replace(/h-\d+|w-\d+/g, '').trim();
  
  // Determina tamanho baseado na classe passada ou usa padrão
  const isLarge = className.includes('h-16') || className.includes('h-12');
  const height = isLarge ? 50 : 35;

  return (
    <div className={`${containerClass} select-none inline-flex`}>
      <svg 
        height={height} 
        viewBox="0 0 300 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Genthe Logo"
      >
        {/* Letra g */}
        <path d="M41.8 45.5C41.8 55.6 34.6 61.5 24.5 61.5C14.8 61.5 8.2 55.1 8.2 44.5V36.5C8.2 25.9 14.9 19.5 24.6 19.5C33.8 19.5 40.8 25.1 41.6 34.5H34.1C33.5 28.9 29.8 26.2 24.8 26.2C19.5 26.2 15.8 30.5 15.8 36.8V44.2C15.8 50.5 19.5 54.8 24.6 54.8C29.6 54.8 33.5 52.2 34.2 46.8V45.5H41.8ZM41.8 45.5V72.5C41.8 82.5 35.5 88.5 24.5 88.5C13.5 88.5 7.5 82.5 7.5 72.5H15.1C15.1 78.5 18.5 81.8 24.5 81.8C30.5 81.8 34.2 78.5 34.2 72.5V61.5H41.8V45.5Z" fill={blueColor}/>
        
        {/* Letra e */}
        <path d="M50.5 40.5C50.5 28.5 58.5 19.5 70.5 19.5C82.5 19.5 90.5 28.2 90.5 40.8V43.5H57.8C58.5 50.5 63.5 54.8 70.2 54.8C75.2 54.8 79.2 52.5 81.5 48.5H89.2C86.5 56.5 79.5 61.5 70.2 61.5C58.2 61.5 50.5 52.5 50.5 40.5ZM82.8 37.5C82.2 30.8 77.5 26.2 70.5 26.2C63.5 26.2 58.8 30.8 58.2 37.5H82.8Z" fill={blueColor}/>
        
        {/* Letra n */}
        <path d="M100.5 60.5V20.5H108.1V28.5C110.5 22.5 115.5 19.5 121.5 19.5C130.5 19.5 136.5 25.5 136.5 35.5V60.5H128.9V36.5C128.9 30.5 125.5 26.5 120.5 26.5C115.5 26.5 108.1 30.5 108.1 38.5V60.5H100.5Z" fill={blueColor}/>
        
        {/* Letra t */}
        <path d="M146.5 10.5V20.5H155.5V26.5H146.5V50.5C146.5 54.5 148.5 56.5 152.5 56.5H155.5V62.5H151.5C143.5 62.5 138.9 58.5 138.9 50.5V26.5H134.5V20.5H138.9V10.5H146.5Z" fill={blueColor}/>
        
        {/* Letra h - Com a parte verde característica */}
        <path d="M165.5 60.5V10.5H173.1V28.5C175.5 22.5 180.5 19.5 186.5 19.5C195.5 19.5 201.5 25.5 201.5 35.5V60.5H193.9V36.5C193.9 30.5 190.5 26.5 185.5 26.5C180.5 26.5 173.1 30.5 173.1 38.5V60.5H165.5Z" fill={greenColor}/>
        
        {/* Letra e (final) */}
        <path d="M210.5 40.5C210.5 28.5 218.5 19.5 230.5 19.5C242.5 19.5 250.5 28.2 250.5 40.8V43.5H217.8C218.5 50.5 223.5 54.8 230.2 54.8C235.2 54.8 239.2 52.5 241.5 48.5H249.2C246.5 56.5 239.5 61.5 230.2 61.5C218.2 61.5 210.5 52.5 210.5 40.5ZM242.8 37.5C242.2 30.8 237.5 26.2 230.5 26.2C223.5 26.2 218.8 30.8 218.2 37.5H242.8Z" fill={blueColor}/>

        {/* Slogan */}
        <text x="65" y="78" fontFamily="sans-serif" fontSize="10" fill={blueColor} letterSpacing="0.05em">GENTHE QUE ENTENDE DE GENTE</text>
        
        {/* Registered Trademark */}
        <text x="252" y="24" fontFamily="sans-serif" fontSize="12" fill={blueColor}>®</text>
      </svg>
    </div>
  );
};