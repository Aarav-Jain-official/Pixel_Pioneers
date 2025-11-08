import React, { useState } from 'react';
import {
  MessageCircle,
  BookOpen,
  Calendar,
  FileText,
  Users,
  Search,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Zap,
  Video,
  Download,
  Star,
  ArrowRight,
  Bot,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const StudentSupportPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! I\'m your AI Support Assistant. How can I help you today?' }
  ]);

  const supportCategories = [
    { id: 'all', name: 'All Support', icon: HelpCircle, color: 'purple' },
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'blue' },
    { id: 'technical', name: 'Technical', icon: Zap, color: 'yellow' },
    { id: 'financial', name: 'Financial', icon: FileText, color: 'green' },
    { id: 'career', name: 'Career', icon: TrendingUp, color: 'pink' }
  ];

  const quickActions = [
    { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with support', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, title: 'Call Us', desc: '1-800-STUDENT', color: 'from-green-500 to-emerald-500' },
    { icon: Calendar, title: 'Book Appointment', desc: 'Schedule a meeting', color: 'from-purple-500 to-pink-500' },
    { icon: Video, title: 'Video Call', desc: 'Face-to-face support', color: 'from-orange-500 to-red-500' }
  ];

  const faqs = [
    {
      category: 'academic',
      question: 'How do I access my course materials?',
      answer: 'Log into your student portal, navigate to "My Courses," and select the course you want to access. All materials, assignments, and announcements will be available there.'
    },
    {
      category: 'academic',
      question: 'Can I change my course schedule?',
      answer: 'Yes! You can modify your schedule during the add/drop period (first two weeks of semester). Go to Registration > Schedule Changes in your portal.'
    },
    {
      category: 'technical',
      question: 'I forgot my password. What should I do?',
      answer: 'Click "Forgot Password" on the login page. Enter your student email, and we\'ll send you a password reset link within 5 minutes.'
    },
    {
      category: 'technical',
      question: 'Which browsers are supported?',
      answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, keep your browser updated.'
    },
    {
      category: 'financial',
      question: 'When is tuition due?',
      answer: 'Tuition payment is due by the first day of each semester. Payment plans are available through the Financial Services office.'
    },
    {
      category: 'financial',
      question: 'How do I apply for scholarships?',
      answer: 'Visit the Financial Aid portal to browse available scholarships. Applications typically open in January for the following academic year.'
    },
    {
      category: 'career',
      question: 'How can I find internships?',
      answer: 'Our Career Services portal lists hundreds of internship opportunities. You can also schedule a one-on-one session with a career counselor.'
    },
    {
      category: 'career',
      question: 'Do you offer resume reviews?',
      answer: 'Absolutely! Book a free resume review session with our Career Services team. Appointments are available Monday-Friday.'
    }
  ];

  const supportTeam = [
    { name: 'Dr. Emily Chen', role: 'Academic Advisor', image: 'image:168', rating: 4.9, available: true },
    { name: 'Mark Johnson', role: 'Tech Support Lead', image: 'image:164', rating: 4.8, available: true },
    { name: 'Sarah Williams', role: 'Financial Aid', image: 'image:168', rating: 5.0, available: false },
    { name: 'David Brown', role: 'Career Counselor', image: 'image:164', rating: 4.7, available: true }
  ];

  const recentTickets = [
    { id: 1, title: 'Unable to access online exam', category: 'Technical', status: 'In Progress', priority: 'High', date: '2 hours ago' },
    { id: 2, title: 'Scholarship application help', category: 'Financial', status: 'Resolved', priority: 'Medium', date: '1 day ago' },
    { id: 3, title: 'Course registration issue', category: 'Academic', status: 'Open', priority: 'High', date: '3 hours ago' }
  ];

  const resources = [
    { title: 'Student Handbook', icon: BookOpen, downloads: '2.4K', link: '#' },
    { title: 'IT Setup Guide', icon: Zap, downloads: '1.8K', link: '#' },
    { title: 'Financial Aid Forms', icon: FileText, downloads: '3.1K', link: '#' },
    { title: 'Career Resources', icon: TrendingUp, downloads: '1.5K', link: '#' }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, 
        { id: chatMessages.length + 1, type: 'user', text: chatMessage },
        { id: chatMessages.length + 2, type: 'bot', text: 'I understand your concern. Let me help you with that. Our support team will respond within 5 minutes.' }
      ]);
      setChatMessage('');
    }
  };

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const getCategoryColor = (category) => {
    const cat = supportCategories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Student Support</h1>
                <p className="text-xs text-gray-400">We're here to help 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">AI-Powered Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              How can we
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> help you today?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get instant answers, connect with advisors, or explore our knowledge base
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help... (e.g., 'reset password', 'course registration')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} mb-3`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - FAQs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {supportCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                      activeCategory === cat.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* FAQs */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                {filteredFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getCategoryColor(faq.category)}-500/20 text-${getCategoryColor(faq.category)}-400`}>
                        {faq.category}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Helpful Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.link}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <resource.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold">{resource.title}</div>
                          <div className="text-xs text-gray-400">{resource.downloads} downloads</div>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Live Chat & Support Team */}
            <div className="space-y-6">
              {/* AI Chat */}
              <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">AI Assistant</div>
                    <div className="text-xs opacity-90">Always here to help</div>
                  </div>
                </div>

                <div className="p-4 h-96 overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-gray-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Support Team */}
              <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Support Team</h3>
                <div className="space-y-3">
                  {supportTeam.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        {member.available && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{member.name}</div>
                        <div className="text-xs text-gray-400">{member.role}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{member.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Tickets */}
              <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Your Recent Tickets</h3>
                <div className="space-y-3">
                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                          ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {ticket.status}
                        </span>
                        <span className="text-xs text-gray-400">{ticket.date}</span>
                      </div>
                      <div className="font-semibold text-sm">{ticket.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{ticket.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '24/7', label: 'Support Available' },
              { number: '<5min', label: 'Avg Response Time' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '50K+', label: 'Students Helped' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-4">Still need help?</h2>
          <p className="text-gray-300 mb-8">Our support team is ready to assist you with any questions or concerns</p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold text-lg transition flex items-center gap-2 mx-auto">
            Contact Support Team
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default StudentSupportPage;