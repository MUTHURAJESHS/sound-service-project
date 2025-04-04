import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logorm.png';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);
  const [showExplore, setShowExplore] = useState(false);
  const particlesRef = useRef([]);

  // Initialize particles
  useEffect(() => {
    particlesRef.current = Array(120).fill().map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 60 + 240}, 70%, 70%)`,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      z: Math.random() * 200 - 100
    }));

    const canvas = backgroundRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Animation function
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particlesRef.current.forEach(particle => {
        // Calculate distance from mouse for interaction
        const dx = particle.x - mousePosition.x * window.innerWidth;
        const dy = particle.y - mousePosition.y * window.innerHeight;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Particle movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse influence - particles move away from mouse
        if (distance < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - distance) / 1000;
          particle.x += Math.cos(angle) * force * 5;
          particle.y += Math.sin(angle) * force * 5;
        }
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        const perspective = 300 / (300 + particle.z);
        const size = particle.size * perspective;
        const x = particle.x;
        const y = particle.y;
        const opacity = perspective * 0.8;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla');
        ctx.fill();
        
        // Draw connections between nearby particles
        particlesRef.current.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(180, 210, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    // Handle window resize
    const handleResize = () => {
      const canvas = backgroundRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
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
      {/* Canvas Background */}
      <canvas 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
      />

      {/* Logo - Only shown on Home page */}
      <div className="absolute top-6 left-6 z-50">
        <img
          src={logoImage}
          alt="SoundWave Logo"
          className="h-20 w-auto cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/')}
        />
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
    </div>
  );
};

export default Home;