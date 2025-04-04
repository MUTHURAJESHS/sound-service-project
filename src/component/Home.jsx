import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logorm.png';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [showExplore, setShowExplore] = useState(false);

  // Setup 3D wave background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Wave parameters
    const waves = [
      { wavelength: 200, amplitude: 85, speed: 0.03, color: 'rgba(123, 31, 162, 0.2)' },
      { wavelength: 150, amplitude: 60, speed: 0.02, color: 'rgba(103, 58, 183, 0.2)' },
      { wavelength: 100, amplitude: 40, speed: 0.04, color: 'rgba(66, 165, 245, 0.2)' },
      { wavelength: 80, amplitude: 30, speed: 0.01, color: 'rgba(3, 169, 244, 0.2)' }
    ];

    let time = 0;
    let frameId;

    // Render waves with 3D effect
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Create a gradient for the background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a041a');
      gradient.addColorStop(1, '#170b34');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each wave layer
      waves.forEach((wave, index) => {
        ctx.fillStyle = wave.color;
        ctx.beginPath();
        
        // Add mouse influence point
        const mouseX = mousePosition.x * canvas.width;
        const mouseY = mousePosition.y * canvas.height;
        const mouseInfluence = 80;
        
        // Draw wave points
        for (let x = 0; x <= canvas.width; x += 5) {
          // Calculate distance from mouse
          const distX = x - mouseX;
          const distY = canvas.height * 0.7 - mouseY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          // Mouse influence factor (1 at mouse position, 0 far away)
          const influenceFactor = Math.max(0, 1 - distance / mouseInfluence);
          
          // Wave equation with added mouse influence
          let y = Math.sin(x / wave.wavelength + time * wave.speed) * wave.amplitude;
          y += Math.cos((x + 30) / (wave.wavelength * 0.8) + time * wave.speed * 1.5) * wave.amplitude * 0.5;
          
          // Add mouse influence
          y += influenceFactor * 30;
          
          // Position waves at different heights
          y += canvas.height * (0.5 + (index * 0.1));
          
          // Draw point
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the wave shape
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
        
        // Add some shimmer/highlights to wave tops
        if (index === 3) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          for (let x = 0; x <= canvas.width; x += 50) {
            const y = Math.sin(x / wave.wavelength + time * wave.speed) * wave.amplitude;
            const y2 = Math.cos((x + 30) / (wave.wavelength * 0.8) + time * wave.speed * 1.5) * wave.amplitude * 0.5;
            const influenceFactor = Math.max(0, 1 - Math.abs(x - mouseX) / mouseInfluence);
            
            const highlight = y + y2 + influenceFactor * 30 + canvas.height * (0.5 + (index * 0.1));
            
            ctx.moveTo(x, highlight);
            ctx.lineTo(x + 10, highlight - 5);
          }
          
          ctx.stroke();
        }
      });
      
      // Add some floating particles
      for (let i = 0; i < 20; i++) {
        const x = ((time * 30) + i * 100) % canvas.width;
        const y = canvas.height * 0.5 + Math.sin(time + i) * 50;
        const size = Math.sin(time * 2 + i) * 2 + 3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(time + i) * 0.1})`;
        ctx.fill();
      }
      
      // Add vertical "sound beams"
      for (let i = 0; i < 10; i++) {
        const x = canvas.width * (0.1 + i * 0.1);
        const height = (Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5) * canvas.height * 0.5;
        
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - height);
        gradient.addColorStop(0, 'rgba(103, 58, 183, 0)');
        gradient.addColorStop(1, 'rgba(103, 58, 183, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 5, canvas.height - height, 10, height);
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    // Clean up animation frame
    return () => {
      cancelAnimationFrame(frameId);
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
      const canvas = canvasRef.current;
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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Canvas for 3D Waves Background */}
      <canvas 
        ref={canvasRef}
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