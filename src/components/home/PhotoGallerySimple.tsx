import React from 'react';
import Image from 'next/image';

const PhotoGallerySimple: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">Catering for Every Occasion</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From family gatherings to corporate events, Purple Haze BBQ delivers exceptional food and service
            tailored to your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px]">
            <Image 
              src="/images/mockups/family-gathering.svg"
              alt="African American family gathering with Purple Haze BBQ catering" 
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ph-dark to-transparent">
              <h3 className="text-xl font-bold text-white mb-2">Family Gatherings</h3>
              <p className="text-white text-sm opacity-90">
                Create unforgettable moments with authentic BBQ that brings everyone together.
                Perfect for reunions, birthday celebrations, and backyard parties.
              </p>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px]">
            <Image 
              src="/images/mockups/corporate-event.svg"
              alt="Corporate event with Purple Haze BBQ premium catering" 
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ph-dark to-transparent">
              <h3 className="text-xl font-bold text-white mb-2">Corporate Events</h3>
              <p className="text-white text-sm opacity-90">
                Elevate your professional gatherings with our premium catering services.
                From office parties to client appreciation events and conferences.
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl h-[300px] md:h-[500px]">
          <Image 
            src="/images/mockups/signature-platter.svg"
            alt="Purple Haze BBQ Signature Smokehouse Platter with premium meats and sides" 
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-bold text-white mb-2">Award-Winning BBQ</h3>
            <p className="text-white text-opacity-90">
              Our signature smokehouse platters feature slow-smoked meats with our exclusive purple haze rub,
              complemented by homemade sides prepared with locally-sourced ingredients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySimple;