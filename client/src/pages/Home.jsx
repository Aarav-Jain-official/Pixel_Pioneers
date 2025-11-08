import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {
  Play,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Star,
  Award,
  Clock,
  Globe,
  Target,
  ChevronRight
} from 'lucide-react';

const SanaLabsLandingPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Adaptive content that evolves with your learning journey',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Personalized Paths',
      description: 'Custom learning experiences tailored to your goals',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analytics',
      description: 'Track progress and measure learning outcomes instantly',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with peers and mentors in live sessions',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Learners' },
    { number: '95%', label: 'Completion Rate' },
    { number: '500+', label: 'Expert Instructors' },
    { number: '50+', label: 'Countries Reached' }
  ];

  const instructors = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI & Machine Learning',
      image: 'image:136',
      rating: 4.9,
      students: '125K'
    },
    {
      name: 'Prof. James Rodriguez',
      role: 'Data Science',
      image: 'image:132',
      rating: 4.8,
      students: '98K'
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Cloud Computing',
      image: 'image:140',
      rating: 4.9,
      students: '110K'
    },
    {
      name: 'Marcus Thompson',
      role: 'Cybersecurity',
      image: 'image:135',
      rating: 4.7,
      students: '87K'
    }
  ];

  const testimonials = [
    {
      quote: "The AI-driven personalization has completely transformed how our team learns. We've seen a 3x increase in course completion rates.",
      author: "Sarah Mitchell",
      role: "L&D Director, TechCorp",
      company: "Fortune 500"
    },
    {
      quote: "From onboarding to upskilling, this platform has become our single source of truth for organizational learning.",
      author: "David Kim",
      role: "VP of Engineering",
      company: "StartupXYZ"
    },
    {
      quote: "The real-time analytics give us unprecedented insight into learning effectiveness. It's not just content, it's intelligence.",
      author: "Maria Garcia",
      role: "Chief Learning Officer",
      company: "Global Enterprise"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">LearnAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#instructors" className="text-gray-300 hover:text-white transition">Instructors</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <button onClick={() => navigate('/register')}  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">AI-Powered Learning Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Learn smarter,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  not harder
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Transform your workforce with AI-driven learning experiences. 
                Personalized content, real-time analytics, and expert instructors 
                all in one intelligent platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={() => navigate('/register')} className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              <button
  onClick={() => navigate('/login')}
  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2"
>
  <Play className="w-5 h-5" />
  Already a user! Sign In
</button>

              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free 14-day trial
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  No credit card required
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://pplx-res.cloudinary.com/image/upload/v1755412007/pplx_project_search_images/63adf12e547729b2cca3ae67c3e1e24080b268dd.png"
                  alt="AI-powered learning"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Everything you need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> succeed</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for modern learners and organizations that demand results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                  <ChevronRight className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-32 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://pplx-res.cloudinary.com/image/upload/v1755004901/pplx_project_search_images/3a6c4a24f9e237da6ebe95d796c3f2db902d038e.png"
                  alt="Platform interface"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                A platform that
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> grows with you</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Our intelligent dashboard adapts to your learning style, tracks your progress, 
                and recommends the perfect next step in your journey.
              </p>
              
              <div className="space-y-4">
                {[
                  'Real-time progress tracking',
                  'Personalized learning paths',
                  'Interactive assessments',
                  'Certificate of completion'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="instructors" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Learn from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> industry experts</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              World-class instructors with decades of real-world experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <div className="w-full h-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-purple-400" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                <p className="text-purple-400 text-sm mb-3">{instructor.role}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div>{instructor.students} students</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Learning */}
      <section className="py-32 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Learn together,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> achieve more</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join live sessions, collaborate on projects, and connect with a global 
                community of learners and mentors.
              </p>
              
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-lg transition flex items-center gap-2">
                Explore Community
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://pplx-res.cloudinary.com/image/upload/v1759153628/pplx_project_search_images/847b839fb72446201c482570219953f85c59ec15.png"
                alt="Collaborative learning"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Trusted by
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> leading teams</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-purple-400">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Ready to transform
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              your learning?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Join 10 million+ learners who are already growing their skills
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            
            <button onClick={() => navigate('/register')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-lg transition shadow-lg shadow-purple-500/50">
              Start Free Trial
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              14-day free trial
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Full access
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Enterprise</div>
                <div>Integrations</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About</div>
                <div>Careers</div>
                <div>Blog</div>
                <div>Press</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Documentation</div>
                <div>Help Center</div>
                <div>Community</div>
                <div>API</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Privacy</div>
                <div>Terms</div>
                <div>Security</div>
                <div>Cookies</div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-bold">LearnAI</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 LearnAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SanaLabsLandingPage;