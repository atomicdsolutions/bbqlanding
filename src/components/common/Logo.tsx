import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({
  width = 192,
  height = 96,
  className = '',
  variant = 'dark'
}) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ width, height }}>
      <Image 
        src="/images/logo.png"
        alt="Purple Haze BBQ Logo" 
        width={width}
        height={height}
        className="object-contain w-full h-full"
        priority
      />
    </div>
  );
};

export default Logo;