import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logorm.png';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);
  const [showExplore, setShowExplore] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [sliderHeights, setSliderHeights] = useState([50, 70, 30, 60]);
  const [ledColors, setLedColors] = useState(Array(8).fill(true));
  const [particles, setParticles] = useState(
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      velocity: Math.random() * 1 + 0.2,
      color: `hsl(${Math.random() * 60 + 220}, 100%, 70%)`
    }))
  );

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotate the turntable animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate mixer sliders
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderHeights(prev => prev.map(() => Math.floor(30 + Math.random() * 50)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate LED lights
  useEffect(() => {
    const interval = setInterval(() => {
      setLedColors(prev => prev.map(() => Math.random() > 0.5));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Animate floating particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.velocity,
        x: particle.x + Math.sin(particle.y * 0.05) * 0.2,
        ...(particle.y < -5 ? {
          y: 105,
          x: Math.random() * 100,
          size: Math.random() * 4 + 1,
          velocity: Math.random() * 1 + 0.2
        } : {})
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Navigation handlers
  const handleSignUpClick = () => navigate('/signup');
  const handleExploreClick = () => setShowExplore(prev => !prev);
  const navigateToFunction = (functionType) => navigate(`/functions/${functionType}`);
  
  // Contact link handler
  const handleContactClick = () => navigate('/contact');
  
  // Instagram link handler - updated with your preferred Instagram URL
  const handleInstagramClick = () => window.open('https://www.instagram.com/sundaram_group_of_company/', '_blank');

  // Function categories
  const functionTypes = [
    { id: 'marriage', name: 'Marriage', icon: '💍', description: 'Perfect soundscapes for your special day', color: 'from-pink-500 to-red-500' },
    { id: 'housewarming', name: 'House Warming', icon: '🏠', description: 'Welcome home with elegant audio solutions', color: 'from-green-500 to-teal-500' },
    { id: 'birthday', name: 'Birthday Function', icon: '🎂', description: 'Celebrate another year with perfect sound', color: 'from-yellow-500 to-orange-500' },
    { id: 'temple', name: 'Temple Festival', icon: '🏮', description: 'Spiritual audio experiences for sacred events', color: 'from-red-500 to-purple-500' },
    { id: 'school', name: 'School Function', icon: '🎓', description: 'Academic events with crystal clear sound', color: 'from-blue-500 to-indigo-500' }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-800 via-black to-purple-900">
      {/* Animated background patterns */}
      <div className="absolute inset-0 z-0">
        {/* Animated geometric patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute h-full w-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`grid-line-x-${i}`}
                className="absolute h-px w-full bg-cyan-400"
                style={{
                  top: `${i * 12.5}%`,
                  transform: `perspective(500px) rotateX(75deg)`,
                  opacity: 0.3,
                  boxShadow: '0 0 15px #22d3ee'
                }}
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`grid-line-y-${i}`}
                className="absolute h-full w-px bg-cyan-400"
                style={{
                  left: `${i * 10}%`,
                  transform: `perspective(500px) rotateX(75deg)`,
                  opacity: 0.3,
                  boxShadow: '0 0 15px #22d3ee'
                }}
              />
            ))}
          </div>
        </div>

        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 80%)'
          }}
        />

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              opacity: 0.7
            }}
          />
        ))}

        {/* Animated circular rings */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`ring-${i}`}
              className="absolute rounded-full border border-cyan-400"
              style={{
                top: '50%',
                left: '50%',
                width: `${(i + 1) * 20}%`,
                height: `${(i + 1) * 20}%`,
                transform: 'translate(-50%, -50%)',
                opacity: 0.5 - i * 0.1,
                animation: `ringPulse ${3 + i}s infinite ease-in-out ${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Animated circular rings (right side) */}
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`ring-right-${i}`}
              className="absolute rounded-full border border-purple-400"
              style={{
                top: '50%',
                left: '50%',
                width: `${(i + 1) * 20}%`,
                height: `${(i + 1) * 20}%`,
                transform: 'translate(-50%, -50%)',
                opacity: 0.5 - i * 0.1,
                animation: `ringPulse ${4 + i}s infinite ease-in-out ${i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Audio waveform at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg className="h-full w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,50 C80,30 140,70 200,50 C260,30 320,70 380,50 C440,30 500,70 560,50 C620,30 680,70 740,50 C800,30 860,70 920,50 C980,30 1040,70 1100,50 C1160,30 1220,70 1280,50 C1340,30 1400,70 1440,50 L1440,100 L0,100 Z"
              fill="url(#wave-gradient)"
              opacity="0.4"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
                  M0,50 C80,30 140,70 200,50 C260,30 320,70 380,50 C440,30 500,70 560,50 C620,30 680,70 740,50 C800,30 860,70 920,50 C980,30 1040,70 1100,50 C1160,30 1220,70 1280,50 C1340,30 1400,70 1440,50 L1440,100 L0,100 Z;
                  M0,50 C80,70 140,30 200,50 C260,70 320,30 380,50 C440,70 500,30 560,50 C620,70 680,30 740,50 C800,70 860,30 920,50 C980,70 1040,30 1100,50 C1160,70 1220,30 1280,50 C1340,70 1400,30 1440,50 L1440,100 L0,100 Z;
                  M0,50 C80,30 140,70 200,50 C260,30 320,70 380,50 C440,30 500,70 560,50 C620,30 680,70 740,50 C800,30 860,70 920,50 C980,30 1040,70 1100,50 C1160,30 1220,70 1280,50 C1340,30 1400,70 1440,50 L1440,100 L0,100 Z"
              />
            </path>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#8b5cf6" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4f46e5" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-50">
        <img
          src={logoImage}
          alt="SoundWave Logo"
          className="h-20 w-auto cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Contact and Instagram Icons - New Addition */}
      <div className="absolute top-6 right-6 z-50 flex space-x-4">
        {/* Contact Icon */}
        <button 
          onClick={handleContactClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
          aria-label="Contact Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2v10h14V5H4zm2 3a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z" />
          </svg>
        </button>
        
        {/* Instagram Icon */}
        <button 
          onClick={handleInstagramClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white transition-all hover:from-purple-500 hover:to-pink-400 hover:shadow-lg hover:shadow-pink-500/30"
          aria-label="Follow us on Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </button>
      </div>

      {/* 3D DJ Equipment */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 overflow-hidden"
        style={{ perspective: '1500px' }}
      >
        {/* DJ turntable */}
        <div 
          className="absolute"
          style={{
            top: '25%',
            left: '15%',
            width: '300px',
            height: '300px',
            transform: `rotateY(${20 + mousePosition.x * 20}deg) rotateX(${-10 + mousePosition.y * 20}deg) translateZ(50px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Turntable base */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl" />
          
          {/* Record */}
          <div 
            className="absolute rounded-full"
            style={{
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              background: 'linear-gradient(45deg, #111 0%, #333 100%)',
              transform: `rotateZ(${rotation}deg)`,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Record grooves */}
            {Array.from({length: 15}).map((_, i) => (
              <div 
                key={`groove-${i}`}
                className="absolute border border-gray-700 rounded-full opacity-40"
                style={{
                  top: `${(i+1) * 2.5}%`,
                  left: `${(i+1) * 2.5}%`,
                  width: `${100 - (i+1) * 5}%`,
                  height: `${100 - (i+1) * 5}%`
                }}
              />
            ))}
            
            {/* Record label */}
            <div className="absolute flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-800"
                style={{
                  top: '33.3%',
                  left: '33.3%',
                  width: '33.3%',
                  height: '33.3%'
                }}>
              <span className="text-white text-xs font-bold">Sundaram</span>
            </div>
          </div>
        </div>

        {/* DJ Mixer */}
        <div 
          className="absolute"
          style={{
            top: '40%',
            right: '15%',
            width: '400px',
            height: '200px',
            transform: `rotateY(${-20 - mousePosition.x * 20}deg) rotateX(${20 + mousePosition.y * 10}deg) translateZ(30px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-800 to-black shadow-2xl" />
          
          {/* Mixer controls */}
          <div className="absolute inset-0 p-4 grid grid-cols-4 gap-4">
            {/* Vertical sliders */}
            {sliderHeights.map((height, i) => (
              <div key={`slider-${i}`} className="flex flex-col items-center">
                <div className="w-2 h-24 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-b from-cyan-400 to-purple-600"
                    style={{ 
                      height: `${height}%`,
                      transition: 'height 0.5s ease-out'
                    }}
                  />
                </div>
                <div className="mt-2 w-8 h-8 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
              </div>
            ))}
          </div>
          
          {/* Mixer buttons and LEDs */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-around">
            {ledColors.map((isRed, i) => (
              <div 
                key={`led-${i}`} 
                className={`w-3 h-3 rounded-full shadow-lg ${isRed ? 'bg-red-500' : 'bg-green-500'}`}
                style={{
                  boxShadow: isRed ? '0 0 10px #ef4444' : '0 0 10px #22c55e'
                }}
              />
            ))}
          </div>
        </div>

        {/* Equalizer bars in back */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-1 opacity-50">
          {Array.from({length: 20}).map((_, i) => (
            <div
              key={`eq-bar-${i}`}
              className="w-2 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm"
              style={{
                height: `${20 + Math.sin(i * 0.5) * 60}px`,
                animation: `eqDance ${0.5 + i % 5 * 0.2}s infinite ease-in-out alternate ${i * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {!showExplore ? (
          <>
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white md:text-8xl">
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Sundaram sounds
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-xl text-blue-200">
              Experience music in a whole new dimension
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleExploreClick}
                className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
              >
                Explore
              </button>
              <button
                onClick={handleSignUpClick}
                className="rounded-full border-2 border-blue-400 px-8 py-3 font-semibold text-blue-400 transition-all hover:border-blue-300 hover:text-blue-300"
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-full max-w-6xl flex-col items-center">
            <div className="mb-8 flex w-full items-center justify-between">
              <button
                onClick={handleExploreClick}
                className="rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
              {functionTypes.map((func) => (
                <div
                  key={func.id}
                  onClick={() => navigateToFunction(func.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-gray-800/50 p-6 shadow-xl backdrop-blur transition-transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${func.color} text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {func.icon}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{func.name}</h3>
                  <p className="text-gray-300">{func.description}</p>
                  <div className="mt-4 flex items-center text-blue-400 transition-colors group-hover:text-blue-300">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes eqDance {
            0% { height: 10px; }
            100% { height: 80px; }
          }
          
          @keyframes ringPulse {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
            100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;