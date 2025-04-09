import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logorm.png';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);
  const [showExplore, setShowExplore] = useState(false);
  const [cubes, setCubes] = useState(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 500 - 250,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      rotateZ: Math.random() * 360,
      size: Math.random() * 40 + 20,
      speed: Math.random() * 0.5 + 0.2,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`
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

  // Animate 3D cubes
  useEffect(() => {
    const interval = setInterval(() => {
      setCubes(prev => prev.map(cube => ({
        ...cube,
        z: cube.z + cube.speed,
        rotateX: (cube.rotateX + 0.2) % 360,
        rotateY: (cube.rotateY + 0.3) % 360,
        rotateZ: (cube.rotateZ + 0.1) % 360,
        ...(cube.z > 300 ? {
          z: -250,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 40 + 20,
          speed: Math.random() * 0.5 + 0.2,
          color: `hsl(${Math.random() * 360}, 80%, 70%)`
        } : {})
      })));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Navigation handlers
  const handleSignUpClick = () => navigate('/signup');
  const handleExploreClick = () => setShowExplore(prev => !prev);
  const navigateToFunction = (functionType) => navigate(`/functions/${functionType}`);
  
  // Contact link handler
  const handleContactClick = () => navigate('/contact');
  
  // Instagram link handler
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
    <div className="relative h-screen w-full overflow-hidden">
      {/* COLORFUL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Vibrant animated gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
          style={{
            backgroundSize: '400% 400%',
            animation: 'colorfulFlow 15s ease infinite'
          }}
        />
        
        {/* Bubbles overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={`bubble-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-md"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 20 + 20}s linear infinite`,
                animationDelay: `${Math.random() * -20}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
        
        {/* 3D perspective container */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 overflow-hidden"
          style={{ 
            perspective: '1000px',
            perspectiveOrigin: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`
          }}
        >
          {/* 3D Cubes */}
          {cubes.map((cube, i) => (
            <div
              key={`cube-${i}`}
              className="absolute"
              style={{
                left: `${cube.x}%`,
                top: `${cube.y}%`,
                width: `${cube.size}px`,
                height: `${cube.size}px`,
                transform: `translateZ(${cube.z}px) rotateX(${cube.rotateX}deg) rotateY(${cube.rotateY}deg) rotateZ(${cube.rotateZ}deg)`,
                transformStyle: 'preserve-3d',
                opacity: Math.min(1, Math.max(0, (300 - Math.abs(cube.z)) / 300)),
                transition: 'opacity 0.3s ease'
              }}
            >
              {/* Cube faces */}
              {[
                { transform: 'translateZ(calc(var(--size) / 2))', background: cube.color },
                { transform: 'translateZ(calc(var(--size) / -2)) rotateY(180deg)', background: cube.color },
                { transform: 'rotateY(90deg) translateZ(calc(var(--size) / 2))', background: cube.color },
                { transform: 'rotateY(-90deg) translateZ(calc(var(--size) / 2))', background: cube.color },
                { transform: 'rotateX(90deg) translateZ(calc(var(--size) / 2))', background: cube.color },
                { transform: 'rotateX(-90deg) translateZ(calc(var(--size) / 2))', background: cube.color }
              ].map((face, faceIndex) => (
                <div
                  key={`face-${faceIndex}`}
                  className="absolute inset-0 border border-white/30 backdrop-blur-sm"
                  style={{
                    '--size': `${cube.size}px`,
                    transform: face.transform,
                    background: `linear-gradient(45deg, ${face.background}90, ${face.background}40)`,
                    backfaceVisibility: 'hidden'
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Glowing particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 3 + 1}px rgba(255, 255, 255, 0.8)`,
                animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * -5}s`
              }}
            />
          ))}
        </div>

        {/* Wave effect overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute top-0">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#4ecdc4" />
                <stop offset="100%" stopColor="#8a2be2" />
              </linearGradient>
            </defs>
            <path 
              d="" 
              fill="none" 
              stroke="url(#wave-gradient)" 
              strokeWidth="2"
              style={{
                animation: 'wavePath 20s linear infinite'
              }}
              id="wavePath"
            />
          </svg>
        </div>
      </div>

      {/* Global layout for header (logo and icons) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between p-6">
        {/* Logo */}
        <div>
          <img
            src={logoImage}
            alt="SoundWave Logo"
            className="h-20 w-auto cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Contact and Instagram Icons */}
        <div className="flex space-x-4">
          {/* Contact Icon */}
          <button 
            onClick={handleContactClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 hover:shadow-lg hover:shadow-white/20"
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
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {!showExplore ? (
          <>
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white md:text-8xl">
              <span className="block bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">
                Sundaram sounds
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-xl text-white">
              Experience music in a whole new dimension
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleExploreClick}
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
              >
                Explore
              </button>
              <button
                onClick={handleSignUpClick}
                className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all backdrop-blur-sm hover:bg-white/10"
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
                className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 backdrop-blur-sm"
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
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"
                >
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${func.color} text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {func.icon}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{func.name}</h3>
                  <p className="text-white/80">{func.description}</p>
                  <div className="mt-4 flex items-center text-cyan-300 transition-colors group-hover:text-cyan-200">
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
          @keyframes colorfulFlow {
            0% { background-position: 0% 50% }
            25% { background-position: 50% 100% }
            50% { background-position: 100% 50% }
            75% { background-position: 50% 0% }
            100% { background-position: 0% 50% }
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0) rotate(0deg); }
            25% { transform: translateY(-20px) translateX(20px) rotate(5deg); }
            50% { transform: translateY(0) translateX(40px) rotate(0deg); }
            75% { transform: translateY(20px) translateX(20px) rotate(-5deg); }
            100% { transform: translateY(0) translateX(0) rotate(0deg); }
          }
          
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes wavePath {
            0% {
              d: path('M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,500 L0,500 Z');
            }
            50% {
              d: path('M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,500 L0,500 Z');
            }
            100% {
              d: path('M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,500 L0,500 Z');
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;