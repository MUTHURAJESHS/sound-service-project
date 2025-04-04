import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Import your firebase auth configuration

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  
  // Form field focus state for enhanced animations
  const [focusedField, setFocusedField] = useState(null);
  
  const handleFocus = (field) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', general: '' };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error message when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({ email: '', password: '', general: '' });
      
      try {
        // Actual Firebase authentication instead of simulation
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        console.log('Login successful');
        setLoginSuccess(true);
        
        // Redirect after success animation completes
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
        
      } catch (error) {
        console.error('Login failed:', error);
        
        // Handle different authentication errors
        switch (error.code) {
          case 'auth/user-not-found':
            setErrors({
              ...errors,
              general: 'No account found with this email. Please sign up.'
            });
            break;
          case 'auth/wrong-password':
            setErrors({
              ...errors,
              general: 'Invalid password. Please try again.'
            });
            break;
          case 'auth/invalid-email':
            setErrors({
              ...errors,
              email: 'Invalid email format'
            });
            break;
          case 'auth/too-many-requests':
            setErrors({
              ...errors,
              general: 'Too many failed attempts. Please try again later.'
            });
            break;
          case 'auth/network-request-failed':
            setErrors({
              ...errors,
              general: 'Network error. Please check your connection.'
            });
            break;
          default:
            setErrors({
              ...errors,
              general: 'Invalid email or password. Please try again.'
            });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-fuchsia-800 via-violet-900 to-indigo-900 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-20 blur-xl"
            style={{ 
              width: `${Math.random() * 200 + 50}px`, 
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
            }}
          />
        ))}
        
        {/* Animated rings */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-pink-500 opacity-10"
            style={{ 
              width: `${(i + 1) * 20}%`, 
              height: `${(i + 1) * 20}%`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.5}s`,
              animation: 'pulse 8s infinite ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Login Form */}
      <div className={`relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-gray-900/50 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-500 ${loginSuccess ? 'scale-105' : ''}`}>
        <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-50 blur-2xl"></div>
        
        {loginSuccess ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-center text-2xl font-bold text-white">Login Successful!</h2>
            <p className="mt-2 text-center text-gray-300">Redirecting to your dashboard...</p>
          </div>
        ) : (
          <>
            <h2 className="relative mb-2 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              Welcome Back
            </h2>
            
            <p className="mb-6 text-center text-purple-200 opacity-80">
              Sign in to access your account
            </p>
            
            {errors.general && (
              <div className="mb-4 rounded-lg bg-red-500/20 p-3 text-sm text-red-200">
                <p>{errors.general}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-pink-200">
                  Email
                </label>
                <div className={`relative mt-1 transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg border ${errors.email ? 'border-red-500 bg-red-500/10' : 'border-gray-600 bg-gray-800/90'} p-3 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50`}
                    placeholder="you@example.com"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-pink-200">
                    Password
                  </label>
                  <a href="/forgot-password" className="text-xs font-medium text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </a>
                </div>
                <div className={`relative mt-1 transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    className={`block w-full rounded-lg border ${errors.password ? 'border-red-500 bg-red-500/10' : 'border-gray-600 bg-gray-800/90'} p-3 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50`}
                    placeholder="••••••••"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-200">
                  Remember me
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 py-3 font-bold text-white transition-all hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 group"
                >
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </span>
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900/60 px-2 text-purple-300">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-lg border border-gray-600 bg-gray-800/90 py-2 px-4 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all hover:scale-105"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-lg border border-gray-600 bg-gray-800/90 py-2 px-4 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all hover:scale-105"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-lg border border-gray-600 bg-gray-800/90 py-2 px-4 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-all hover:scale-105"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
              </div>
              
              <div className="text-center text-sm text-purple-300">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-pink-400 hover:text-pink-300">
                  Sign up
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
      
      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.05; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default Login;