import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: (
        <svg className="h-12 w-12 text-ph-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'Authenticity',
      description: 'We honor traditional BBQ techniques while adding our own unique touch with signature rubs and sauces.',
    },
    {
      icon: (
        <svg className="h-12 w-12 text-ph-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quality',
      description: 'We source only the finest ingredients and meats, preparing everything with care and attention to detail.',
    },
    {
      icon: (
        <svg className="h-12 w-12 text-ph-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community',
      description: 'We believe food brings people together and we take pride in being part of our customers\' special moments.',
    },
    {
      icon: (
        <svg className="h-12 w-12 text-ph-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We constantly experiment with new flavors and techniques while respecting BBQ traditions.',
    },
  ];

  const timeline = [
    {
      year: '2017',
      title: 'Humble Beginnings',
      description: 'Purple Haze BBQ started as a weekend pop-up at local farmers markets, where Chef Marcus Johnson shared his family BBQ recipes.'
    },
    {
      year: '2018',
      title: 'First Food Truck',
      description: 'After growing popularity, we launched our first food truck, bringing our signature BBQ to events across the DMV area.'
    },
    {
      year: '2019',
      title: 'Catering Launch',
      description: 'We expanded into full-service catering, focusing on private events and corporate functions.'
    },
    {
      year: '2020',
      title: 'Community Support',
      description: 'During challenging times, we pivoted to provide meals for essential workers and community support programs.'
    },
    {
      year: '2021',
      title: 'Award-Winning BBQ',
      description: 'Our signature purple haze rub won recognition at the Mid-Atlantic BBQ Championship.'
    },
    {
      year: '2023',
      title: 'Full-Service Catering',
      description: 'We grew into a full-service catering company with a dedicated team of chefs and event specialists.'
    },
    {
      year: '2024',
      title: 'Today',
      description: 'Purple Haze BBQ continues to grow while maintaining our commitment to quality, community, and authentic BBQ experiences.'
    }
  ];

  return (
    <Layout>
      <Head>
        <title>About Us | Purple Haze BBQ</title>
        <meta 
          name="description" 
          content="Learn about Purple Haze BBQ, our story, our team, and our commitment to authentic, premium barbecue catering in the DMV area."
        />
      </Head>

      <section className="relative bg-ph-dark text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-ph-dark to-transparent opacity-90"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              The journey that brought Purple Haze BBQ from a family tradition to the premier 
              BBQ catering service in the DMV area.
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
      </section>

      {/* Company intro */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ph-purple">Who We Are</h2>
              <p className="text-lg mb-4 text-gray-700">
                Purple Haze BBQ was founded by Chef Marcus Johnson, whose passion for barbecue was ignited 
                during childhood summers spent with his grandfather in North Carolina.
              </p>
              <p className="text-lg mb-4 text-gray-700">
                What began as a family tradition has evolved into a premium catering service that 
                combines authentic Southern BBQ techniques with creative, modern flavors.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Our name "Purple Haze" comes from our signature purple-hued spice rub that creates 
                an unforgettable flavor profile and distinctive smoke ring on our slow-cooked meats.
              </p>
              <p className="text-lg font-medium text-ph-purple">
                Today, we're proud to be a Black-owned business serving the DMV area with a team of 
                passionate food lovers dedicated to creating memorable dining experiences.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-ph-purple to-ph-dark opacity-40"></div>
              <Image
                src="/images/mockups/team/chef-marcus.svg"
                alt="Chef Marcus Johnson, founder of Purple Haze BBQ"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-lg font-bold">Chef Marcus Johnson</p>
                <p className="text-white text-sm">Founder & Executive Pitmaster</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do — from food preparation to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-ph-purple">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming the DMV's premier BBQ catering service.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-ph-gold opacity-30"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-ph-gold border-4 border-white"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="inline-block px-3 py-1 rounded-full bg-ph-light text-ph-purple font-medium mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-ph-purple mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  
                  <div className="w-2/12"></div> {/* Spacer */}
                  
                  <div className="w-5/12"></div> {/* Empty space for the other side */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="section bg-ph-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-ph-gold to-ph-purple opacity-20"></div>
              <Image
                src="/images/mockups/family-gathering.svg"
                alt="Purple Haze BBQ community event"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ph-purple">Community Involvement</h2>
              <p className="text-lg mb-4 text-gray-700">
                At Purple Haze BBQ, we believe in giving back to the community that has supported us from day one.
              </p>
              <p className="text-lg mb-4 text-gray-700">
                We regularly participate in local food drives, donate meals to shelters, and provide catering 
                services at reduced rates for community events and nonprofit fundraisers.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Our team also volunteers with youth mentorship programs, teaching cooking skills and 
                entrepreneurship to the next generation of culinary talent.
              </p>
              <p className="text-lg font-medium text-ph-purple">
                We're committed to making a positive impact in the DMV area beyond just serving great food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-ph-purple rounded-lg p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Let's Create Something Special</h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Ready to experience Purple Haze BBQ at your next event? From intimate gatherings to large 
              celebrations, we'll work with you to create a custom menu that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/menu" className="btn btn-secondary py-3 px-8 text-lg">
                View Our Menu
              </Link>
              <Link href="/#consultation" className="btn bg-white text-ph-purple hover:bg-gray-100 py-3 px-8 text-lg">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;