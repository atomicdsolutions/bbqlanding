import React from 'react';
import Image from 'next/image';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Chef Marcus Johnson",
      title: "Founder & Pitmaster",
      bio: "With over 15 years of experience, Chef Marcus combines traditional Southern BBQ techniques with innovative flavors. His passion for BBQ was inspired by his grandfather's recipes from North Carolina.",
      image: "/images/mockups/team/chef-marcus.svg"
    },
    {
      name: "Chef Aisha Williams",
      title: "Executive Chef & Flavor Specialist",
      bio: "Chef Aisha perfected her craft at culinary school before dedicating herself to BBQ. She's the creator of our signature purple haze rub and brings creative flair to our side dishes.",
      image: "/images/mockups/team/chef-aisha.svg"
    },
    {
      name: "David Thompson",
      title: "Catering Manager & Event Specialist",
      bio: "David ensures every event runs smoothly from initial consultation to final cleanup. His background in hospitality management helps create seamless catering experiences for our clients.",
      image: "/images/mockups/team/david.svg"
    }
  ];

  return (
    <section className="section bg-ph-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate people behind Purple Haze BBQ bring years of expertise and a love for authentic 
            barbecue to every event we cater.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:border-ph-gold">
              <div className="h-64 relative">
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ph-purple">{member.name}</h3>
                <p className="text-ph-gold font-medium mb-3">{member.title}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-lg shadow text-center">
          <h3 className="text-2xl font-bold mb-4 text-ph-purple">Want to Meet Our Team?</h3>
          <p className="mb-0 text-gray-600">
            Our pitmasters and chefs are available for consultation to create the perfect menu for your event.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;