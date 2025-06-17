import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import MenuItemCard from '@/components/common/MenuItemCard';
import { motion } from 'framer-motion';

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'proteins' | 'sides'>('all');

  const proteinItems = [
    {
      id: 'brisket',
      name: 'Signature Smoked Beef Brisket',
      description: 'Our award-winning brisket is slow-smoked for 12-14 hours with our signature purple haze rub. Each slice features a perfect bark, beautiful smoke ring, and melt-in-your-mouth tenderness.',
      imagePath: '/images/menu/proteins/brisket.jpg',
      price: '$24.99/lb',
      servingSize: 'Approx. 3-4 servings per pound',
      popular: true,
      allergens: ['none'],
      dietaryInfo: 'Gluten-free',
      prepMethod: 'Slow-smoked over oak and hickory'
    },
    {
      id: 'ribs',
      name: 'St. Louis Style Ribs',
      description: 'Meaty ribs rubbed with our special blend of spices, smoked until tender with the perfect pull. Finished with a light glaze of our signature sauce.',
      imagePath: '/images/menu/proteins/ribs.jpg',
      price: '$22.99/rack',
      servingSize: '3-4 servings per rack',
      popular: true,
      allergens: ['none'],
      dietaryInfo: 'Gluten-free',
      prepMethod: 'Smoked over cherry and hickory'
    },
    {
      id: 'pulled-pork',
      name: 'Carolina-Style Pulled Pork',
      description: 'Whole pork shoulder smoked low and slow for 10-12 hours until perfectly tender. Hand-pulled and served with our vinegar-based and traditional sauces.',
      imagePath: '/images/menu/proteins/pulled-pork.jpg',
      price: '$18.99/lb',
      servingSize: '3-4 servings per pound',
      allergens: ['none'],
      dietaryInfo: 'Gluten-free',
      prepMethod: 'Smoked over hickory'
    },
    {
      id: 'chicken',
      name: 'Smoke-Roasted Chicken',
      description: 'Brined and seasoned whole chickens, smoke-roasted to perfection with crispy skin and juicy meat. Served with Alabama white sauce.',
      imagePath: '/images/menu/proteins/chicken.jpg',
      price: '$14.99/half',
      servingSize: '2-3 servings per half',
      allergens: ['none'],
      dietaryInfo: 'Gluten-free',
      prepMethod: 'Brined 24hrs, smoke-roasted'
    },
    {
      id: 'burnt-ends',
      name: 'Kansas City Burnt Ends',
      description: 'The crown jewel of BBQ - twice-smoked brisket points cubed and glazed with our sweet and tangy sauce. Limited availability.',
      imagePath: '/images/menu/proteins/burnt-ends.jpg',
      price: '$26.99/lb',
      servingSize: '2-3 servings per pound',
      popular: true,
      allergens: ['none'],
      dietaryInfo: 'Gluten-free',
      prepMethod: 'Double-smoked and glazed'
    }
  ];

  const sideItems = [
    {
      id: 'mac-cheese',
      name: 'Purple Haze Mac & Cheese',
      description: 'Our famous three-cheese blend featuring smoked gouda, sharp cheddar, and monterey jack. Topped with a crispy herb breadcrumb crust.',
      imagePath: '/images/menu/sides/mac-cheese.jpg',
      halfPanPrice: '$35.99',
      fullPanPrice: '$65.99',
      servingSizeHalf: '15-20 servings',
      servingSizeFull: '35-45 servings',
      popular: true,
      allergens: ['dairy', 'wheat'],
      vegetarian: true
    },
    {
      id: 'collard-greens',
      name: 'Smoky Collard Greens',
      description: 'Fresh collards slow-cooked with smoked turkey, onions, and our special seasoning blend. The perfect balance of smoky and savory.',
      imagePath: '/images/menu/sides/collard-greens.jpg',
      halfPanPrice: '$29.99',
      fullPanPrice: '$54.99',
      servingSizeHalf: '15-20 servings',
      servingSizeFull: '35-45 servings',
      allergens: ['none'],
      dietaryInfo: 'Gluten-free'
    },
    {
      id: 'cornbread',
      name: 'Honey Butter Cornbread',
      description: 'Sweet and moist cornbread made with stone-ground cornmeal, finished with our signature honey butter. Served warm.',
      imagePath: '/images/menu/sides/cornbread.jpg',
      halfPanPrice: '$24.99',
      fullPanPrice: '$44.99',
      servingSizeHalf: '15-20 servings',
      servingSizeFull: '35-45 servings',
      popular: true,
      allergens: ['dairy', 'eggs'],
      vegetarian: true
    },
    {
      id: 'coleslaw',
      name: 'Creamy Purple Slaw',
      description: 'Our signature coleslaw featuring purple and green cabbage, carrots, and a creamy dressing with a hint of heat.',
      imagePath: '/images/menu/sides/coleslaw.jpg',
      halfPanPrice: '$24.99',
      fullPanPrice: '$44.99',
      servingSizeHalf: '15-20 servings',
      servingSizeFull: '35-45 servings',
      allergens: ['eggs'],
      vegetarian: true,
      dietaryInfo: 'Gluten-free'
    }
  ];

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
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? [...proteinItems, ...sideItems]
    : activeCategory === 'proteins' 
      ? proteinItems 
      : sideItems;

  return (
    <Layout>
      <Head>
        <title>Menu | Purple Haze BBQ</title>
        <meta 
          name="description" 
          content="Explore our premium BBQ menu featuring award-winning smoked meats and homemade sides. Perfect for events of all sizes in the DMV area."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ph-dark to-ph-purple text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/menu/texture-overlay.png')] opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Menu
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Award-winning BBQ featuring premium slow-smoked meats and made-from-scratch sides.
              Available for events of all sizes.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="#proteins" className="btn btn-secondary">
                View Proteins
              </Link>
              <Link href="#sides" className="btn btn-outline-white">
                View Sides
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
      </section>

      {/* Menu Section */}
      <section className="section bg-white" id="menu">
        <div className="container-custom">
          {/* Category Filters */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'proteins', label: 'Smoked Meats' },
              { id: 'sides', label: 'Signature Sides' }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as typeof activeCategory)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-ph-purple text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
              >
                <MenuItemCard 
                  item={item}
                  index={index}
                  type={proteinItems.includes(item as any) ? 'protein' : 'side'}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 p-8 bg-ph-light rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-ph-purple">Need Help Planning Your Menu?</h2>
            <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
              Our catering experts will help you create the perfect menu for your event,
              taking into account your guest count, preferences, and dietary requirements.
            </p>
            <Link 
              href="/#consultation" 
              className="btn btn-primary py-3 px-8 text-lg"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Package Information */}
      <section className="section bg-ph-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-ph-purple">Catering Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted packages or let us create a custom menu for your event.
              All packages include setup, service, and cleanup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Intimate Gathering",
                size: "10-25 guests",
                includes: ["2 Proteins", "3 Sides", "Cornbread", "Sauces & Utensils"],
                price: "Starting at $24.99/person"
              },
              {
                name: "Social Event",
                size: "25-50 guests",
                includes: ["3 Proteins", "4 Sides", "Cornbread", "Sauces & Utensils"],
                price: "Starting at $22.99/person",
                popular: true
              },
              {
                name: "Large Celebration",
                size: "50+ guests",
                includes: ["4 Proteins", "5 Sides", "Cornbread", "Sauces & Utensils"],
                price: "Starting at $20.99/person"
              }
            ].map((pkg, index) => (
              <div 
                key={index}
                className={`rounded-lg p-6 ${
                  pkg.popular 
                    ? 'bg-ph-purple text-white' 
                    : 'bg-white'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-ph-purple'}`}>
                  {pkg.name}
                </h3>
                <p className={pkg.popular ? 'text-gray-200' : 'text-gray-600'}>
                  {pkg.size}
                </p>
                <ul className={`mt-4 mb-6 space-y-2 ${pkg.popular ? 'text-gray-200' : 'text-gray-600'}`}>
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-ph-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={`font-bold ${pkg.popular ? 'text-ph-gold' : 'text-ph-purple'}`}>
                  {pkg.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;