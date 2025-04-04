import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FunctionPage = () => {
  const { functionType } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Function data mapping
  const functionData = {
    marriage: {
      title: 'Wedding Sound Services',
      description: 'Make your special day unforgettable with our premium sound services. From ceremony to reception, we ensure crystal clear audio that captures every beautiful moment.',
      features: [
        'Ceremony sound system with wireless microphones',
        'Reception PA systems with subwoofers for dancing',
        'Specialized equipment for speeches and toasts',
        'Background music systems for cocktail hour',
        'Professional sound engineers on-site',
        'Backup systems for peace of mind'
      ],
      color: 'from-pink-500 to-red-500',
      icon: '💍'
    },
    housewarming: {
      title: 'House Warming Audio Solutions',
      description: 'Welcome guests to your new home with the perfect ambiance. Our house warming sound services create the ideal atmosphere for celebrating your new space.',
      features: [
        'Multi-room audio distribution',
        'Outdoor speaker systems',
        'Wireless control via smartphone',
        'Background music curation',
        'Temporary installation with no damage',
        'Consultation for permanent home audio systems'
      ],
      color: 'from-green-500 to-teal-500',
      icon: '🏠'
    },
    birthday: {
      title: 'Birthday Celebration Sound',
      description: 'From kids parties to milestone celebrations, our birthday sound services bring the energy and clarity you need for a memorable celebration.',
      features: [
        'Age-appropriate sound levels',
        'Themed music playlists',
        'Microphones for speeches and toasts',
        'Dance floor sound system',
        'Karaoke system options',
        'DJ equipment rental'
      ],
      color: 'from-yellow-500 to-orange-500',
      icon: '🎂'
    },
    temple: {
      title: 'Temple Festival Sound Solutions',
      description: 'Enhance spiritual experiences with respectful and clear audio for temple festivals and religious ceremonies of all sizes.',
      features: [
        'Wide coverage systems for outdoor ceremonies',
        'Discreet speaker placement respecting sacred spaces',
        'Specialized microphones for traditional instruments',
        'Battery backup for uninterrupted service',
        'Experience with various cultural requirements',
        'Consultation with religious leaders for proper setup'
      ],
      color: 'from-red-500 to-purple-500',
      icon: '🏮'
    },
    school: {
      title: 'School Function Audio Systems',
      description: 'From graduations to performances, our sound systems ensure every student shines with clear, reliable audio for academic events.',
      features: [
        'Auditorium sound optimization',
        'Outdoor ceremony systems',
        'Multiple wireless microphones for performances',
        'Recording capabilities for keepsake memories',
        'Easy operation for staff and students',
        'Consultation for permanent school systems'
      ],
      color: 'from-blue-500 to-indigo-500',
      icon: '🎓'
    }
  };

  // Get current function data or redirect to home if invalid
  const currentFunction = functionData[functionType];
  
  useEffect(() => {
    if (!currentFunction) {
      navigate('/');
    }
    
    // Animation for content elements
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-in');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('show');
        }, 100 * index);
      });
    }
  }, [currentFunction, navigate, functionType]);

  if (!currentFunction) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div ref={containerRef} className="container mx-auto px-4 py-16">
        {/* Navigation Header - Logo Removed */}
        <div className="flex justify-end items-center mb-8">
          {/* Back button - positioned on the right */}
          <div className="flex-shrink-0 animate-in opacity-0 transition-opacity duration-500">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-lg text-purple-300 transition-colors hover:text-purple-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
        
        {/* Hero section */}
        <div className="mb-16 flex flex-col items-center text-center animate-in opacity-0 transition-opacity duration-500">
          <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${currentFunction.color} text-5xl shadow-lg`}>
            {currentFunction.icon}
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{currentFunction.title}</h1>
          <p className="max-w-2xl text-xl text-purple-200">{currentFunction.description}</p>
        </div>
        
        {/* Features */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-white animate-in opacity-0 transition-opacity duration-500">Our Services Include</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentFunction.features.map((feature, index) => (
              <div 
                key={index}
                className="flex rounded-lg bg-gray-800/50 p-6 backdrop-blur animate-in opacity-0 transition-all duration-500"
              >
                <div className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${currentFunction.color}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg text-white">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 p-8 text-center shadow-xl animate-in opacity-0 transition-opacity duration-500">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to elevate your {currentFunction.title.toLowerCase()}?</h2>
          <p className="mb-6 text-xl text-purple-200">Contact us today for a custom quote tailored to your specific needs.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <button className="rounded-full bg-white px-8 py-3 font-semibold text-purple-900 transition-all hover:bg-purple-100">
              Get a Quote
            </button>
            <button className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Add styles for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default FunctionPage;