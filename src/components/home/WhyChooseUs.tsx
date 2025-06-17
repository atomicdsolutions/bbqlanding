import React from 'react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="h-10 w-10 text-ph-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: 'Custom Menus',
      description:
        'We work with you to create a menu that perfectly fits your event, preferences, and budget.',
    },
    {
      icon: (
        <svg className="h-10 w-10 text-ph-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      title: 'Premium Quality',
      description:
        'We use only the finest meats and freshest ingredients, smoked to perfection with our signature rubs and sauces.',
    },
    {
      icon: (
        <svg className="h-10 w-10 text-ph-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Professional Service',
      description:
        'Our experienced team handles everything from setup to cleanup, allowing you to enjoy your event stress-free.',
    },
    {
      icon: (
        <svg className="h-10 w-10 text-ph-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      ),
      title: 'Local DMV Expertise',
      description:
        'Proudly serving DC, Maryland, and Virginia with authentic regional flavors and responsive local service.',
    },
  ];

  return (
    <section id="services" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">Why We're Best in Class</h2>
          <p className="text-lg text-gray-600">
            Our commitment to exceptional quality and service has made us the top choice for BBQ catering in the DMV area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg border border-gray-100 hover:border-ph-gold flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-ph-purple">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;