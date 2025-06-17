import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-ph-dark text-white">
      {/* Background Image - We'll use a CSS gradient overlay until we have a real image */}
      <div className="absolute inset-0 bg-gradient-to-r from-ph-dark to-transparent opacity-90"></div>

      <div className="container-custom relative z-10 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Purple Haze BBQ Logo" 
              width={240} 
              height={120} 
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Premium BBQ Catering in the DMV Area
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            From intimate gatherings to large events, we bring the best smoked meats and homemade sides to your table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#menu" className="btn btn-primary text-center text-lg">
              View Our Menu
            </Link>
            <Link href="#consultation" className="btn btn-secondary text-center text-lg">
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Angled bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
    </section>
  );
};

export default Hero;