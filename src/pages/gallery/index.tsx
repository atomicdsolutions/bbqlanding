import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  imageSrc: string;
  width: number;
  height: number;
}

type GalleryCategory = 'signature-dishes' | 'events' | 'behind-scenes' | 'catering-setup';

const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  
  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'signature-dishes', label: 'Signature Dishes' },
    { id: 'events', label: 'Events' },
    { id: 'behind-scenes', label: 'Behind the Scenes' },
    { id: 'catering-setup', label: 'Catering Setup' }
  ];

  const galleryItems: GalleryItem[] = [
    // Signature Dishes
    {
      id: 'brisket-platter',
      title: 'Signature Brisket Platter',
      category: 'signature-dishes',
      description: 'Our award-winning brisket with perfect bark and smoke ring, served with classic sides.',
      imageSrc: '/images/gallery/signature-dishes/brisket-platter.jpg',
      width: 1200,
      height: 800
    },
    {
      id: 'ribs-closeup',
      title: 'St. Louis Style Ribs',
      category: 'signature-dishes',
      description: 'Perfectly smoked ribs with our signature purple haze rub.',
      imageSrc: '/images/gallery/signature-dishes/ribs-closeup.jpg',
      width: 1200,
      height: 800
    },
    // Events
    {
      id: 'corporate-event-1',
      title: 'Corporate Lunch Event',
      category: 'events',
      description: 'Serving 200+ employees at a tech company lunch event.',
      imageSrc: '/images/gallery/events/corporate-lunch.jpg',
      width: 1200,
      height: 800
    },
    {
      id: 'wedding-setup',
      title: 'Wedding Reception Setup',
      category: 'events',
      description: 'Elegant buffet setup for a 150-person wedding reception.',
      imageSrc: '/images/gallery/events/wedding-setup.jpg',
      width: 1200,
      height: 800
    },
    // Behind the Scenes
    {
      id: 'smoking-process',
      title: 'The Smoking Process',
      category: 'behind-scenes',
      description: 'Early morning prep with our custom smokers.',
      imageSrc: '/images/gallery/behind-scenes/smoking-process.jpg',
      width: 1200,
      height: 800
    },
    {
      id: 'prep-kitchen',
      title: 'Prep Kitchen',
      category: 'behind-scenes',
      description: 'Our team preparing sides and sauces from scratch.',
      imageSrc: '/images/gallery/behind-scenes/prep-kitchen.jpg',
      width: 1200,
      height: 800
    },
    // Catering Setup
    {
      id: 'buffet-setup',
      title: 'Premium Buffet Setup',
      category: 'catering-setup',
      description: 'Professional buffet presentation with chafing dishes and garnishes.',
      imageSrc: '/images/gallery/catering-setup/buffet-setup.jpg',
      width: 1200,
      height: 800
    },
    {
      id: 'carving-station',
      title: 'Carving Station',
      category: 'catering-setup',
      description: 'Live carving station featuring our signature brisket.',
      imageSrc: '/images/gallery/catering-setup/carving-station.jpg',
      width: 1200,
      height: 800
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <Head>
        <title>Photo Gallery | Purple Haze BBQ</title>
        <meta 
          name="description" 
          content="Browse our gallery of premium BBQ catering services, signature dishes, and events in the DMV area." 
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ph-dark to-ph-purple text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/gallery/texture-overlay.png')] opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Gallery
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Take a visual journey through our premium BBQ catering services —
              from signature dishes to memorable events.
            </motion.p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id as typeof activeFilter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeFilter === category.id 
                    ? 'bg-ph-purple text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map(item => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative aspect-[4/3]">
                  <Image 
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Image Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
              >
                <motion.div 
                  className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={selectedImage.imageSrc}
                      alt={selectedImage.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-ph-purple mb-2">{selectedImage.title}</h3>
                    <p className="text-gray-600">{selectedImage.description}</p>
                  </div>
                  <button 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedImage(null)}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 p-8 bg-ph-light rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-ph-purple">Ready to Create Your Event?</h2>
            <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
              Let us bring our award-winning BBQ and professional service to your next event.
              From intimate gatherings to large celebrations, we'll make it unforgettable.
            </p>
            <a 
              href="/#consultation" 
              className="btn btn-primary py-3 px-8 text-lg inline-block"
            >
              Book a Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;