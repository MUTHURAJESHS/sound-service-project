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
      {/* Logo */}
      <div className="absolute top-6 left-6 z-50">
        <img
          src={logoImage}
          alt="SoundWave Logo"
          className="h-20 w-auto cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/')}
        />
      </div>

      {/* 3D DJ Background */}
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

        {/* Sound waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
            >
              <svg viewBox="0 0 1440 320" className="w-full h-full">
                <path
                  fill="rgba(139, 92, 246, 0.5)"
                  d={`M0,${160 + (i % 3) * 30} C320,${80 + (i % 4) * 40} 720,${240 - (i % 5) * 20} 1440,${120 + (i % 3) * 50} V320 H0 Z`}
                  style={{
                    animation: `waveMove ${3 + i % 5}s infinite ease-in-out ${i * 0.2}s`
                  }}
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Animated laser lights */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({length: 12}).map((_, i) => {
            const hue = (i * 30) % 360;
            
            return (
              <div
                key={`light-beam-${i}`}
                className="absolute top-0 left-1/2 origin-bottom"
                style={{
                  height: '140%',
                  width: '3px',
                  opacity: 0.7,
                  transform: `rotate(${(i * 30)}deg)`,
                  background: `linear-gradient(to bottom, hsla(${hue}, 100%, 60%, 0) 0%, hsla(${hue}, 100%, 60%, 1) 100%)`,
                  boxShadow: `0 0 20px 2px hsla(${hue}, 100%, 60%, 0.5)`,
                  animation: `laserSpin ${8 + i % 5}s infinite linear`
                }}
              />
            );
          })}
        </div>

        {/* Equalizer bars in back */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-1 opacity-50">
          {Array.from({length: 20}).map((_, i) => (
            <div
              key={`eq-bar-${i}`}
              className="w-2 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t-sm"
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

      <style>
        {`
          @keyframes eqDance {
            0% { height: 10px; }
            100% { height: 80px; }
          }
          
          @keyframes waveMove {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }
          
          @keyframes laserSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;