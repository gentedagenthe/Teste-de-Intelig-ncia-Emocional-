import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [error, setError] = useState(false);
  // URL da logo
  const logoUrl = "https://genthe.com.br/wp-content/uploads/2021/04/Logo-Genthe-R.png";

  // Se a imagem falhar (erro 403/404), mostramos o texto estilizado
  if (error) {
    return (
      <div className={`flex items-baseline select-none ${className.replace(/h-\d+/, '')}`}>
        <span className="font-heading font-bold text-4xl tracking-tighter text-[#1F4E78]">
          genthe
        </span>
        {/* Ponto verde característico da marca (simulado) */}
        <span className="h-3 w-3 rounded-full bg-[#8CC63F] ml-1 mb-1"></span>
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt="Genthe Logo" 
      className={`${className} object-contain`}
      onError={() => setError(true)}
    />
  );
};