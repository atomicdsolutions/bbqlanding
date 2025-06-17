import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Purple Haze BBQ catered our company event and the food was absolutely incredible. The brisket was perfectly smoked and the sides were amazing. Everyone raved about it for weeks!",
      author: "Sarah Johnson",
      title: "Event Coordinator, Tech Solutions Inc.",
      image: "/images/testimonial-1.jpg"
    },
    {
      quote:
        "We hired Purple Haze BBQ for our wedding reception and it was the best decision ever. Our guests are still talking about how amazing the food was. Professional service and exceptional quality.",
      author: "Michael & Lisa Thompson",
      title: "Newlyweds, Arlington VA",
      image: "/images/testimonial-2.jpg"
    },
    {
      quote:
        "As someone who takes BBQ very seriously, I was impressed by the attention to detail and authentic flavors. The team was professional, punctual, and the food was outstanding.",
      author: "Robert Williams",
      title: "Birthday Celebration, Silver Spring MD",
      image: "/images/testimonial-3.jpg"
    }
  ];

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ph-purple">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from our satisfied clients throughout the DMV area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md border border-gray-100 hover:border-ph-gold transition-all">
              <svg className="h-10 w-10 text-ph-purple mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.31.084-.45.144-.82.353-1.39.819-1.7 1.397-.31.574-.41 1.22-.31 1.935.36.256.18.492.43.712.25.218.56.417.91.595.34.178.7.305 1.08.383.39.077.77.115 1.14.115.39 0 .75-.05 1.08-.15.33-.1.6-.248.82-.444.22-.196.39-.435.5-.713.11-.278.17-.58.17-.905zm9.96 0c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.31.084-.45.144-.82.353-1.39.819-1.7 1.397-.31.574-.41 1.22-.31 1.935.36.256.18.492.43.712.25.218.56.417.91.595.34.178.7.305 1.08.383.39.077.77.115 1.14.115.39 0 .75-.05 1.08-.15.33-.1.6-.248.82-.444.22-.196.39-.435.5-.713.11-.278.17-.58.17-.905z" />
              </svg>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-ph-purple rounded-lg text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to impress your guests?</h3>
          <p className="mb-6">Book your consultation today and let us create an unforgettable BBQ experience for your next event.</p>
          <a href="#consultation" className="inline-block bg-ph-gold text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;