import React from 'react';
import Hero from '@/components/home/Hero';
import WhyChooseUs from '@/components/home/WhyChooseUs';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <section className="relative bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-ph-purple mb-6">
              Purple Haze BBQ Signature Smokehouse Platter
            </h2>
            <div className="text-xl font-bold text-ph-gold mb-4">
              Award-Winning BBQ
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our signature smokehouse platters feature slow-smoked meats with our exclusive 
              purple haze rub, complemented by homemade sides prepared with locally-sourced ingredients.
            </p>
          </div>
        </div>
      </section>
      {/* Additional sections will go here */}
    </main>
  );
};

export default HomePage;