import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logorm.png';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);
  const [showExplore, setShowExplore] = useState(false);

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

  // Navigation handlers
  const handleSignUpClick = () => navigate('/signup');
  const handleExploreClick = () => setShowExplore(prev => !prev);
  const navigateToFunction = (functionType) => navigate(`/functions/${functionType}`);

  // Function categories
  const functionTypes = [
    { id: 'marriage', name: 'Marriage', icon: '💍', description: 'Perfect soundscapes for your special day', color: 'from-pink-500 to-red-500' },
    { id: 'housewarming', name: 'House Warming', icon: '🏠', description: 'Welcome home with elegant audio solutions', color: 'from-green-500 to-teal-500' },
    { id: 'birthday', name: 'Birthday Function', icon: '🎂', description: 'Celebrate another year with perfect sound', color: 'from-yellow-500 to-orange-500' },
    { id: 'temple', name: 'Temple Festival', icon: '🏮', description: 'Spiritual audio experiences for sacred events', color: 'from-red-500 to-purple-500' },
    { id: 'school', name: 'School Function', icon: '🎓', description: 'Academic events with crystal clear sound', color: 'from-blue-500 to-indigo-500' }
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      {/* Logo - Only shown on Home page */}
      <div className="absolute top-6 left-6 z-50">
        <img
          src={logoImage}
          alt="SoundWave Logo"
          className="h-20 w-auto cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/')}
        />
      </div>

      {/* New 3D Sound Equalizer Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        <div className="absolute inset-0 grid grid-cols-12 gap-2 p-4">
          {[...Array(48)].map((_, i) => {
            const col = i % 12;
            const row = Math.floor(i / 12);
            const distanceFromMouse = Math.sqrt(
              Math.pow((col / 12) - mousePosition.x, 2) + 
              Math.pow((row / 4) - mousePosition.y, 2)
            );
            const height = Math.max(10, 100 - (distanceFromMouse * 200));
            
            return (
              <div
                key={`bar-${i}`}
                className="bg-gradient-to-t from-purple-500 to-cyan-400 opacity-60 rounded-t"
                style={{
                  height: `${height}px`,
                  transform: `translateZ(${height / 2}px)`,
                  animation: `soundPulse ${1.5 + Math.random() * 1}s infinite ease-in-out ${Math.random() * 0.5}s`,
                  transition: 'height 0.2s ease-out, transform 0.2s ease-out'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {!showExplore ? (
          <>
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white md:text-8xl">
              <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Sundaram sounds
              </span>
            </h1>
            <p className="mb-8 max-w-lg text-xl text-purple-200">
              Experience music in a whole new dimension
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleExploreClick}
                className="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
              >
                Explore
              </button>
              <button
                onClick={handleSignUpClick}
                className="rounded-full border-2 border-purple-400 px-8 py-3 font-semibold text-purple-400 transition-all hover:border-purple-300 hover:text-purple-300"
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-full max-w-6xl flex-col items-center">
            <div className="mb-8 flex w-full items-center justify-between">
              {/* <h2 className="text-3xl font-bold text-white">Explore Functions</h2> */}
              <button
                onClick={handleExploreClick}
                className="rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-gray-700"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg> */}
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
                  <div className="mt-4 flex items-center text-purple-400 transition-colors group-hover:text-purple-300">
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

      <style jsx>{`
        @keyframes soundPulse {
          0%, 100% { 
            height: 20px;
            transform: translateZ(10px);
            opacity: 0.4;
          }
          50% { 
            height: 80px;
            transform: translateZ(40px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;