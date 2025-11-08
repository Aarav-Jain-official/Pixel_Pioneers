import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:8000/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    if (message) {
      setMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting registration with URL:', `${API_BASE_URL}/v1/users/register`);

      const response = await fetch(`${API_BASE_URL}/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      console.log('Registration response status:', response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error(`Server returned ${response.status}: ${response.statusText}. Expected JSON but got HTML.`);
      }

      const data = await response.json();
      console.log('Registration response data:', data);

      if (response.ok && data.success) {
        setMessage('Registration successful! Welcome aboard!');

        // Store JWT token if provided
        if (data.data?.token || data.data?.accessToken) {
          const token = data.data.token || data.data.accessToken;
          localStorage.setItem('authToken', token);

          // Store user info if available
          if (data.data?.user) {
            localStorage.setItem('userInfo', JSON.stringify(data.data.user));
          }
        }

        // Reset form - Fixed: use correct field names
        setForm({
          fullName: '',
          email: '',
          password: ''
        });

        // Redirect after successful registration
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } else {
        const errorMessage = data.message || 'Registration failed. Please try again.';

        if (response.status === 400) {
          if (data.errors && Array.isArray(data.errors)) {
            setMessage(data.errors.join(', '));
          } else if (data.message && data.message.includes('already exists')) {
            setMessage('An account with this email already exists. Please try logging in or use a different email.');
          } else {
            setMessage(errorMessage);
          }
        } else if (response.status === 409) {
          setMessage('An account with this email already exists. Please try logging in.');
        } else if (response.status === 500) {
          setMessage('Server error. Please try again later.');
        } else {
          setMessage(errorMessage);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Live Financial Wallpaper Background */}

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Floating Financial Data Points */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-data opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div className="text-xs text-blue-400 font-mono">
              {Math.random() > 0.6 ? `₹${(Math.random() * 10000).toFixed(0)}` : 
               Math.random() > 0.3 ? `${(Math.random() * 100).toFixed(1)}%` :
               `${(Math.random() * 50).toFixed(2)}K`}
            </div>
          </div>
        ))}
      </div>

      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-particle-rise opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0px',
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Glows */}
      <div className="fixed top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float-glow"></div>
      <div className="fixed bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl pointer-events-none animate-float-glow-reverse"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Main Register Card */}
      <div className="relative z-20 w-full max-w-lg mx-4">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-700/50 p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-light text-white mb-3">Join Expem</h1>
            <p className="text-gray-300 font-light">Create your financial dashboard account</p>

            {/* Live Growth Indicator */}
            <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Growing Community</span>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm ${
              message.includes('successful') 
                ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              <div className="flex items-center">
                <div className="mr-3">
                  {message.includes('successful') ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{message}</span>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm ${
                    errors.fullName 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-gray-600/50 hover:border-gray-500/50'
                  }`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm ${
                    errors.email 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-gray-600/50 hover:border-gray-500/50'
                  }`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a secure password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm pr-12 ${
                    errors.password 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-gray-600/50 hover:border-gray-500/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.password}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Must be at least 6 characters long
              </p>
            </div>

            {/* Password Strength Indicator */}
            {form.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Password Strength:</span>
                  <span className={`text-xs font-medium ${
                    form.password.length >= 8 ? 'text-green-400' :
                    form.password.length >= 6 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {form.password.length >= 8 ? 'Strong' :
                     form.password.length >= 6 ? 'Good' : 'Weak'}
                  </span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      form.password.length >= 8 ? 'bg-green-400 w-full' :
                      form.password.length >= 6 ? 'bg-amber-400 w-2/3' : 'bg-red-400 w-1/3'
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Terms and Privacy Notice */}
            <div className="p-4 bg-gray-800/30 border border-gray-600/30 rounded-xl">
              <p className="text-xs text-gray-400 leading-relaxed">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-green-400 hover:text-green-300 underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-green-400 hover:text-green-300 underline">Privacy Policy</a>.
                We'll keep your financial data secure and never share it without permission.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 transform ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 shadow-lg shadow-green-500/25'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-transparent mr-3"></div>
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center justify-center font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-600/50"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600/50"></div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-sm font-light">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-green-400 hover:text-green-300 font-medium transition-colors hover:underline"
              >
                Sign In
              </button>
            </p>

            {/* Additional Links */}
            <div className="flex justify-center space-x-6 mt-6 text-xs text-gray-500">
              <a href="/help" className="hover:text-gray-400 transition-colors">Help Center</a>
              <a href="/security" className="hover:text-gray-400 transition-colors">Security</a>
              <a href="/contact" className="hover:text-gray-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Financial Features Footer */}
        <div className="mt-8 text-center">
          <div className="mb-4">
            <h3 className="text-gray-300 text-sm font-medium mb-2">Join thousands tracking their wealth</h3>
          </div>
          <div className="flex justify-center space-x-8 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Live Portfolio</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Real-time Data</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span>Smart Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-data {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-25px) translateX(15px); opacity: 0.8; }
        }

        @keyframes particle-rise {
          0% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        @keyframes float-glow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(8px); }
          66% { transform: translateY(8px) translateX(-5px); }
        }

        @keyframes float-glow-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(8px) translateX(-8px); }
          66% { transform: translateY(-12px) translateX(5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }

        .animate-float-data { animation: float-data 15s ease-in-out infinite; }
        .animate-particle-rise { animation: particle-rise 15s linear infinite; }
        .animate-float-glow { animation: float-glow 12s ease-in-out infinite; }
        .animate-float-glow-reverse { animation: float-glow-reverse 14s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;