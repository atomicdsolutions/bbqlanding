import React from 'react';
import Link from 'next/link';
import EnhancedImage from '@/components/common/EnhancedImage';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const packages = [
    {
      id: 'small',
      name: 'Small Gatherings',
      description: 'Perfect for intimate gatherings of 10-25 guests',
      features: [
        '2 premium meat options',
        '3 homemade sides',
        'Fresh baked rolls',
        'Signature sauces',
        'Disposable serving ware'
      ],
      image: '/images/catering/small-bbq-spread.jpg',
      imageFallback: 'bg-ph-purple bg-opacity-20',
      imageAlt: 'Small BBQ spread with brisket and ribs'
    },
    {
      id: 'medium',
      name: 'Medium Events',
      description: 'Ideal for parties of 25-50 guests',
      features: [
        '3 premium meat options',
        '4 homemade sides',
        'Fresh baked rolls',
        'Signature sauces', 
        'Disposable serving ware',
        'On-site service staff'
      ],
      image: '/images/catering/medium-bbq-setup.jpg',
      imageFallback: 'bg-ph-purple',
      imageAlt: 'Medium BBQ setup with multiple meats and sides',
      featured: true
    },
    {
      id: 'large',
      name: 'Large Celebrations',
      description: 'The full experience for 50+ guests',
      features: [
        '4 premium meat options',
        '5 homemade sides',
        'Fresh baked rolls & cornbread',
        'Signature sauces',
        'Disposable serving ware',
        'On-site service staff',
        'Custom menu consultation'
      ],
      image: '/images/catering/large-bbq-catering.jpg',
      imageFallback: 'bg-ph-gold bg-opacity-70',
      imageAlt: 'Large BBQ catering setup with full spread'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="menu" className="section bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">Our Catering Packages</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer customizable packages for events of all sizes. Each package includes premium smoked meats
            and delicious homemade sides that will impress your guests.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {packages.map((pkg, index) => (
            <motion.div 
              key={pkg.id}
              variants={itemVariants}
              className={`rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl ${
                pkg.featured ? 'border-2 border-ph-gold transform hover:-translate-y-2' : 'border border-gray-200 hover:-translate-y-1'
              }`}
              style={{ transformOrigin: 'center bottom' }}
            >
              <div className="relative h-48 overflow-hidden group">
                <EnhancedImage
                  src={pkg.image}
                  alt={pkg.imageAlt}
                  fill
                  priority={pkg.featured}
                  fallback={pkg.imageFallback}
                  aspectRatio="video"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                {pkg.featured && (
                  <div className="absolute top-4 right-4 bg-ph-gold text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-ph-purple">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <svg className="h-5 w-5 text-ph-gold mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className="mt-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="#consultation" 
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg ${
                      pkg.featured 
                        ? 'bg-ph-purple text-white hover:bg-ph-dark' 
                        : 'bg-ph-gold text-white hover:bg-yellow-600'
                    }`}
                  >
                    Book Consultation
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 mb-4">Need a custom package? We can create a menu that perfectly fits your event.</p>
          <Link 
            href="#consultation" 
            className="btn btn-primary inline-block shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Request Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;