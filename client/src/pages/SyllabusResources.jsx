import React, { useState } from 'react';
import { BookOpen, Play, FileText, Award, Code, Bookmark, Search, Grid3X3, List, ChevronDown, CheckCircle2, Clock, Users, Star } from 'lucide-react';

const SyllabusResourcesHub = () => {
  const [syllabusInput, setSyllabusInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedTopics, setParsedTopics] = useState([]);
  const [currentView, setCurrentView] = useState('input'); // input, resources
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, video, docs, course, practice
  const [completedResources, setCompletedResources] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);

  // Sample resource database
  const resourceDatabase = {
    'HTML & CSS Fundamentals': {
      videos: [
        { id: 'v1', title: 'HTML & CSS Full Course - Beginner to Pro', channel: 'SuperSimpleDev', duration: '6:31:19', views: '2.4M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=G3e-cpL7ofc' },
        { id: 'v2', title: 'CSS Flexbox and Grid Tutorial', channel: 'freeCodeCamp.org', duration: '2:45:30', views: '1.8M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=EiNiSFIPIQE' },
        { id: 'v3', title: 'Build a Responsive Website', channel: 'Traversy Media', duration: '1:45:22', views: '950K', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=p0bGHP-PXD4' },
      ],
      docs: [
        { id: 'd1', title: 'MDN Web Docs - HTML', type: 'Official Docs', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML', description: 'Comprehensive HTML documentation' },
        { id: 'd2', title: 'CSS-Tricks Complete Guide', type: 'Tutorial', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', description: 'Flexbox and Grid guides' },
        { id: 'd3', title: 'W3Schools HTML Tutorial', type: 'Interactive', link: 'https://www.w3schools.com/html/', description: 'Hands-on HTML learning' },
      ],
      courses: [
        { id: 'c1', title: 'The Complete Web Developer Bootcamp', platform: 'Udemy', instructor: 'Angela Yu', rating: '4.7', students: '985K', price: '$84.99', link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/' },
      ],
      practice: [
        { id: 'p1', title: 'CodePen', type: 'Interactive Sandbox', link: 'https://codepen.io/', description: 'Frontend playground' },
      ],
    },
    'JavaScript Basics': {
      videos: [
        { id: 'v4', title: 'JavaScript Full Course for Beginners', channel: 'Programming with Mosh', duration: '1:48:12', views: '3.2M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
        { id: 'v5', title: 'JavaScript ES6 Tutorial', channel: 'The Net Ninja', duration: '2:15:30', views: '1.5M', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc' },
        { id: 'v6', title: 'Async JavaScript Deep Dive', channel: 'Web Dev Simplified', duration: '45:30', views: '780K', difficulty: 'Advanced', link: 'https://www.youtube.com/watch?v=ZYb_ZU8LNxs' },
      ],
      docs: [
        { id: 'd4', title: 'MDN JavaScript Guide', type: 'Official Docs', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'Complete JavaScript reference' },
        { id: 'd5', title: 'JavaScript.info', type: 'Tutorial', link: 'https://javascript.info/', description: 'Modern JavaScript tutorial' },
        { id: 'd6', title: 'Eloquent JavaScript', type: 'Book', link: 'https://eloquentjavascript.net/', description: 'Free online JavaScript book' },
      ],
      courses: [
        { id: 'c2', title: 'Modern JavaScript From The Beginning', platform: 'Udemy', instructor: 'Brad Traversy', rating: '4.8', students: '620K', price: '$84.99', link: 'https://www.udemy.com/course/modern-javascript-from-the-beginning/' },
      ],
      practice: [
        { id: 'p2', title: 'LeetCode', type: 'Coding Challenges', link: 'https://leetcode.com/', description: 'Practice coding problems' },
        { id: 'p3', title: 'HackerRank', type: 'Coding Practice', link: 'https://www.hackerrank.com/', description: 'Programming challenges' },
      ],
    },
    'React.js Framework': {
      videos: [
        { id: 'v7', title: 'React Course - Beginner Tutorial', channel: 'freeCodeCamp.org', duration: '11:55:27', views: '5.1M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
        { id: 'v8', title: 'React Hooks Tutorial', channel: 'Codevolution', duration: '2:30:45', views: '1.2M', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=cF2lQ_gZeA8' },
        { id: 'v9', title: 'Advanced React Patterns', channel: 'Jack Herrington', duration: '1:05:20', views: '450K', difficulty: 'Advanced', link: 'https://www.youtube.com/watch?v=3XaXKiXtNjw' },
      ],
      docs: [
        { id: 'd7', title: 'React Official Documentation', type: 'Official Docs', link: 'https://react.dev/', description: 'React 19 documentation' },
        { id: 'd8', title: 'React Tutorial for Beginners', type: 'Interactive', link: 'https://scrimba.com/learn/learnreact', description: 'Interactive React course' },
        { id: 'd9', title: 'React Patterns', type: 'Guide', link: 'https://reactpatterns.com/', description: 'Common React patterns' },
      ],
      courses: [
        { id: 'c3', title: 'Modern React with Redux', platform: 'Udemy', instructor: 'Stephen Grider', rating: '4.6', students: '540K', price: '$89.99', link: 'https://www.udemy.com/course/react-redux/' },
        { id: 'c4', title: 'React - The Complete Guide', platform: 'Udemy', instructor: 'Maximilian Schwarzmüller', rating: '4.8', students: '780K', price: '$94.99', link: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/' },
      ],
      practice: [
        { id: 'p4', title: 'CodePen', type: 'Interactive Sandbox', link: 'https://codepen.io/', description: 'Frontend playground' },
      ],
    },
    'Python Programming': {
      videos: [
        { id: 'v10', title: 'Python for Beginners - Full Course', channel: 'Programming with Mosh', duration: '6:14:07', views: '28M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' },
        { id: 'v11', title: 'Python OOP Tutorial', channel: 'Corey Schafer', duration: '1:09:15', views: '2.1M', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=ZDa-Z5_ywYg' },
        { id: 'v12', title: 'Advanced Python Concepts', channel: 'Real Python', duration: '45:20', views: '320K', difficulty: 'Advanced', link: 'https://www.youtube.com/watch?v=cKPlPJapXA4' },
      ],
      docs: [
        { id: 'd10', title: 'Python Official Documentation', type: 'Official Docs', link: 'https://docs.python.org/3/', description: 'Python 3 documentation' },
        { id: 'd11', title: 'Real Python Tutorials', type: 'Tutorial', link: 'https://realpython.com/', description: 'In-depth Python tutorials' },
      ],
      courses: [
        { id: 'c5', title: 'Python for Data Science', platform: 'Udemy', instructor: 'Jose Portilla', rating: '4.6', students: '750K', price: '$94.99', link: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/' },
      ],
      practice: [
        { id: 'p5', title: 'HackerRank', type: 'Coding Practice', link: 'https://www.hackerrank.com/', description: 'Programming challenges' },
        { id: 'p6', title: 'LeetCode', type: 'Coding Challenges', link: 'https://leetcode.com/', description: 'Practice coding problems' },
      ],
    },
  };

  // Parse syllabus text into topics
  const parseSyllabus = (text) => {
    if (!text.trim()) return [];
    
    const lines = text.split('\n').filter(line => line.trim());
    const topics = [];
    
    lines.forEach(line => {
      const cleaned = line.trim();
      // Remove numbers, bullets, and special characters
      if (cleaned.match(/^[\d\-\*•]/)) {
        const topicName = cleaned.replace(/^[\d\-\*•\.]+\s*/, '').trim();
        if (topicName.length > 0) {
          topics.push(topicName);
        }
      } else if (cleaned.length > 3 && !cleaned.includes(':')) {
        topics.push(cleaned);
      }
    });
    
    return topics;
  };

  const handleGenerateResources = async (e) => {
    e.preventDefault();
    if (!syllabusInput.trim()) return;

    setIsLoading(true);
    // Simulate API call with loading animation
    setTimeout(() => {
      const topics = parseSyllabus(syllabusInput);
      setParsedTopics(topics);
      setCurrentView('resources');
      setSelectedTopic(topics[0]);
      setIsLoading(false);
    }, 2000);
  };

  const handleUseSample = (sampleText) => {
    setSyllabusInput(sampleText);
  };

  const toggleCompleted = (resourceId) => {
    if (completedResources.includes(resourceId)) {
      setCompletedResources(completedResources.filter(id => id !== resourceId));
    } else {
      setCompletedResources([...completedResources, resourceId]);
    }
  };

  const toggleBookmark = (resourceId) => {
    if (bookmarkedResources.includes(resourceId)) {
      setBookmarkedResources(bookmarkedResources.filter(id => id !== resourceId));
    } else {
      setBookmarkedResources([...bookmarkedResources, resourceId]);
    }
  };

  const getResourcesForTopic = (topic) => {
    return resourceDatabase[topic] || { videos: [], docs: [], courses: [], practice: [] };
  };

  const getAllResources = () => {
    if (!selectedTopic) return [];
    const resources = getResourcesForTopic(selectedTopic);
    const all = [
      ...resources.videos.map(r => ({ ...r, type: 'video' })),
      ...resources.docs.map(r => ({ ...r, type: 'docs' })),
      ...resources.courses.map(r => ({ ...r, type: 'course' })),
      ...resources.practice.map(r => ({ ...r, type: 'practice' })),
    ];

    return all.filter(r => 
      (filterType === 'all' || r.type === filterType) &&
      (r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       r.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const progressPercentage = completedResources.length > 0 
    ? Math.round((completedResources.length / (parsedTopics.length * 5)) * 100)
    : 0;

  // INPUT SECTION
  if (currentView === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-3 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Learning Hub
                </h1>
              </div>
              <p className="text-gray-300 text-lg">Transform your syllabus into a curated learning journey</p>
            </div>

            {/* Main Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleGenerateResources} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Paste Your Syllabus
                  </label>
                  <textarea
                    value={syllabusInput}
                    onChange={(e) => setSyllabusInput(e.target.value)}
                    placeholder="1. HTML & CSS Fundamentals&#10;2. JavaScript Basics&#10;3. React.js Framework&#10;4. Python Programming&#10;&#10;Or paste your full syllabus here..."
                    className="w-full h-48 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 resize-none"
                  />
                  <div className="mt-2 text-xs text-gray-400">
                    {syllabusInput.length} characters
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin">⚙️</div>
                      Generating Resources...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Generate Learning Resources
                    </>
                  )}
                </button>
              </form>

              {/* Sample Syllabi */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Try a sample syllabus:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleUseSample('1. HTML & CSS Fundamentals\n2. JavaScript Basics\n3. React.js Framework\n4. Node.js and Express\n5. MongoDB Database\n6. RESTful APIs\n7. Authentication & Security\n8. Deployment and DevOps')}
                    className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500 transition"
                  >
                    <div className="font-semibold text-blue-400 text-sm">Full Stack Web Dev</div>
                    <div className="text-xs text-gray-400 mt-1">8 comprehensive topics</div>
                  </button>
                  <button
                    onClick={() => handleUseSample('Module 1: Python Programming\nModule 2: Data Analysis with Pandas\nModule 3: Data Visualization\nModule 4: Statistical Analysis\nModule 5: Machine Learning Basics\nModule 6: Deep Learning Introduction')}
                    className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500 transition"
                  >
                    <div className="font-semibold text-purple-400 text-sm">Data Science Python</div>
                    <div className="text-xs text-gray-400 mt-1">6 in-depth modules</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESOURCES SECTION
  if (currentView === 'resources') {
    const resources = getResourcesForTopic(selectedTopic);
    const filteredResources = getAllResources();
    const completionStats = {
      videos: resources.videos.length,
      docs: resources.docs.length,
      courses: resources.courses.length,
      practice: resources.practice.length,
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Sidebar Navigation */}
        <div className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-white/10 flex-col overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <button
              onClick={() => {
                setCurrentView('input');
                setSyllabusInput('');
                setParsedTopics([]);
              }}
              className="text-sm text-purple-400 hover:text-purple-300 transition flex items-center gap-2 mb-4"
            >
              ← New Syllabus
            </button>
            <h2 className="text-xl font-bold text-white">Topics</h2>
            <p className="text-xs text-gray-400 mt-1">{parsedTopics.length} topics found</p>
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {parsedTopics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  selectedTopic === topic
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className="font-medium text-sm truncate">{topic}</div>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="p-6 border-t border-white/10">
            <div className="text-xs text-gray-400 mb-2">Overall Progress</div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-sm font-semibold text-purple-400">{progressPercentage}% Complete</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:ml-72">
          {/* Top Bar */}
          <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 p-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">{selectedTopic}</h2>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="all">All Resources</option>
                <option value="video">Videos</option>
                <option value="docs">Documentation</option>
                <option value="course">Courses</option>
                <option value="practice">Practice</option>
              </select>
            </div>

            {/* Resource Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Videos', count: completionStats.videos, icon: Play, color: 'from-red-500 to-pink-600' },
                { label: 'Docs', count: completionStats.docs, icon: FileText, color: 'from-blue-500 to-cyan-600' },
                { label: 'Courses', count: completionStats.courses, icon: Award, color: 'from-purple-500 to-indigo-600' },
                { label: 'Practice', count: completionStats.practice, icon: Code, color: 'from-green-500 to-emerald-600' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br {stat.color} p-4 rounded-lg">
                  <stat.icon className="w-6 h-6 text-white mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.count}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Resources Grid/List */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">No resources found matching your criteria</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredResources.map((resource) => {
                  const isCompleted = completedResources.includes(resource.id);
                  const isBookmarked = bookmarkedResources.includes(resource.id);

                  if (resource.type === 'video') {
                    return (
                      <div
                        key={resource.id}
                        className={`backdrop-blur-xl bg-white/5 border border-white/10 hover:border-red-500/50 rounded-xl overflow-hidden transition ${viewMode === 'list' ? 'flex' : ''}`}
                      >
                        <div className={`${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-40'} bg-gradient-to-br from-red-500 to-pink-600 relative`}>
                          <div className="w-full h-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-semibold text-white mb-1 line-clamp-2">{resource.title}</h3>
                          <p className="text-xs text-gray-400 mb-2">{resource.channel}</p>
                          <div className="text-xs text-gray-400 space-y-1 mb-3 flex-1">
                            <div>Duration: {resource.duration}</div>
                            <div>Views: {resource.views}</div>
                            <div><span className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ${
                              resource.difficulty === 'Beginner' ? 'bg-green-600' :
                              resource.difficulty === 'Intermediate' ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}>{resource.difficulty}</span></div>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition text-center"
                            >
                              Watch
                            </a>
                            <button
                              onClick={() => toggleCompleted(resource.id)}
                              className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${isCompleted ? 'bg-green-600 text-white' : 'bg-white/5 text-gray-300'}`}
                            >
                              {isCompleted ? '✓' : '○'}
                            </button>
                            <button
                              onClick={() => toggleBookmark(resource.id)}
                              className="p-2"
                            >
                              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-purple-500 text-purple-500' : 'text-gray-400'}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (resource.type === 'docs') {
                    return (
                      <div
                        key={resource.id}
                        className={`backdrop-blur-xl bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-xl p-6 transition ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-400">{resource.type}</span>
                          </div>
                          <h3 className="font-semibold text-white mb-1">{resource.title}</h3>
                          <p className="text-sm text-gray-400">{resource.description}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
                          >
                            Read
                          </a>
                          <button
                            onClick={() => toggleBookmark(resource.id)}
                            className="p-2"
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarkedResources.includes(resource.id) ? 'fill-purple-500 text-purple-500' : 'text-gray-400'}`} />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (resource.type === 'course') {
                    return (
                      <div
                        key={resource.id}
                        className={`backdrop-blur-xl bg-white/5 border border-white/10 hover:border-purple-500/50 rounded-xl p-6 transition`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-5 h-5 text-purple-400" />
                          <span className="text-xs font-semibold text-purple-400">{resource.platform}</span>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">by {resource.instructor}</p>
                        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            {resource.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {resource.students}
                          </div>
                        </div>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition text-center block"
                        >
                          {resource.price === 'Free to audit' ? 'Audit Free' : 'Enroll'}
                        </a>
                      </div>
                    );
                  }

                  if (resource.type === 'practice') {
                    return (
                      <div
                        key={resource.id}
                        className={`backdrop-blur-xl bg-white/5 border border-white/10 hover:border-green-500/50 rounded-xl p-6 transition`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-5 h-5 text-green-400" />
                          <span className="text-xs font-semibold text-green-400">{resource.type}</span>
                        </div>
                        <h3 className="font-semibold text-white mb-1">{resource.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">{resource.description}</p>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition text-center block"
                        >
                          Practice Now
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default SyllabusResourcesHub;