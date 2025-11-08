import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  History, 
  BookOpen, 
  ExternalLink, 
  Lightbulb,
  TrendingUp,
  Award,
  Clock,
  Target,
  X,
  Youtube,
  BarChart3,
  Brain
} from 'lucide-react';

const YouTubeQuiz = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [currentSection, setCurrentSection] = useState('input');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  // Load history from memory on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sample quiz data
  const quizzes = {
    technology: {
      id: 'technology',
      title: 'React Fundamentals',
      questions: [
        {
          id: 1,
          topic: 'Introduction to React',
          question: 'What is React primarily used for?',
          options: ['Building user interfaces', 'Database management', 'Server configuration', 'Network security'],
          correct: 0,
        },
        {
          id: 2,
          topic: 'Introduction to React',
          question: 'Who developed React?',
          options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
          correct: 1,
        },
        {
          id: 3,
          topic: 'Core Concepts',
          question: 'What are the building blocks of React applications?',
          options: ['Functions', 'Components', 'Classes', 'Modules'],
          correct: 1,
        },
        {
          id: 4,
          topic: 'Core Concepts',
          question: 'What is JSX?',
          options: ['A database language', 'A JavaScript syntax extension', 'A CSS framework', 'A testing library'],
          correct: 1,
        },
        {
          id: 5,
          topic: 'State Management',
          question: 'Which hook is used to add state to functional components?',
          options: ['useEffect', 'useContext', 'useState', 'useReducer'],
          correct: 2,
        },
        {
          id: 6,
          topic: 'State Management',
          question: 'What does state represent in React?',
          options: ['Static data', 'Component styling', 'Dynamic data that changes over time', 'API endpoints'],
          correct: 2,
        },
        {
          id: 7,
          topic: 'Component Lifecycle',
          question: 'Which hook handles side effects in functional components?',
          options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
          correct: 1,
        },
        {
          id: 8,
          topic: 'Component Lifecycle',
          question: 'When does useEffect run by default?',
          options: ['Only once', 'Never', 'After every render', 'Before rendering'],
          correct: 2,
        },
        {
          id: 9,
          topic: 'Best Practices',
          question: 'What is the virtual DOM?',
          options: ['A real DOM element', 'A lightweight copy of the actual DOM', 'A CSS framework', 'A database'],
          correct: 1,
        },
        {
          id: 10,
          topic: 'Best Practices',
          question: 'Why should keys be used in lists?',
          options: ['For styling', 'For animations', 'To help React identify which items changed', 'For accessibility'],
          correct: 2,
        },
      ],
    },
    science: {
      id: 'science',
      title: 'Climate Change Basics',
      questions: [
        {
          id: 1,
          topic: 'Introduction',
          question: 'What is climate change?',
          options: ['Daily weather variations', 'Long-term shifts in temperatures and weather patterns', 'Seasonal changes', 'Ocean currents'],
          correct: 1,
        },
        {
          id: 2,
          topic: 'Introduction',
          question: 'What is the main greenhouse gas?',
          options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
          correct: 2,
        },
        {
          id: 3,
          topic: 'Causes',
          question: 'What human activity contributes most to climate change?',
          options: ['Walking', 'Burning fossil fuels', 'Planting trees', 'Recycling'],
          correct: 1,
        },
        {
          id: 4,
          topic: 'Causes',
          question: 'Deforestation contributes to climate change by:',
          options: ['Reducing CO2 absorption', 'Increasing rainfall', 'Cooling the planet', 'Creating more oxygen'],
          correct: 0,
        },
        {
          id: 5,
          topic: 'Effects',
          question: 'What is a major effect of climate change?',
          options: ['Stable weather patterns', 'Rising sea levels', 'Decreased temperatures', 'More forests'],
          correct: 1,
        },
        {
          id: 6,
          topic: 'Effects',
          question: 'How does climate change affect wildlife?',
          options: ['No impact', 'Helps all species', 'Disrupts habitats and migration', 'Increases populations'],
          correct: 2,
        },
        {
          id: 7,
          topic: 'Solutions',
          question: 'Which is a renewable energy source?',
          options: ['Coal', 'Solar power', 'Natural gas', 'Oil'],
          correct: 1,
        },
        {
          id: 8,
          topic: 'Solutions',
          question: 'What can individuals do to help?',
          options: ['Use more plastic', 'Reduce, reuse, recycle', 'Waste more food', 'Drive more'],
          correct: 1,
        },
        {
          id: 9,
          topic: 'Global Impact',
          question: 'Which regions are most affected by climate change?',
          options: ['Only tropical regions', 'Only polar regions', 'All regions globally', 'No regions'],
          correct: 2,
        },
        {
          id: 10,
          topic: 'Global Impact',
          question: 'What international agreement addresses climate change?',
          options: ['Geneva Convention', 'Paris Agreement', 'Treaty of Versailles', 'NATO'],
          correct: 1,
        },
      ],
    },
    history: {
      id: 'history',
      title: 'Ancient Civilizations',
      questions: [
        {
          id: 1,
          topic: 'Ancient Egypt',
          question: 'What was the primary purpose of the pyramids?',
          options: ['Hotels', 'Tombs for pharaohs', 'Warehouses', 'Schools'],
          correct: 1,
        },
        {
          id: 2,
          topic: 'Ancient Egypt',
          question: 'What river was central to Egyptian civilization?',
          options: ['Amazon', 'Mississippi', 'Nile', 'Ganges'],
          correct: 2,
        },
        {
          id: 3,
          topic: 'Ancient Rome',
          question: 'What language did the Romans speak?',
          options: ['Greek', 'Latin', 'English', 'French'],
          correct: 1,
        },
        {
          id: 4,
          topic: 'Ancient Rome',
          question: 'What was the Roman Colosseum used for?',
          options: ['Library', 'Temple', 'Entertainment and gladiator fights', 'Market'],
          correct: 2,
        },
        {
          id: 5,
          topic: 'Ancient Greece',
          question: 'Who was the king of Greek gods?',
          options: ['Apollo', 'Zeus', 'Poseidon', 'Hades'],
          correct: 1,
        },
        {
          id: 6,
          topic: 'Ancient Greece',
          question: 'Where were the ancient Olympic Games held?',
          options: ['Athens', 'Sparta', 'Olympia', 'Delphi'],
          correct: 2,
        },
        {
          id: 7,
          topic: 'Mesopotamia',
          question: 'Which civilization invented writing?',
          options: ['Egyptians', 'Romans', 'Sumerians', 'Chinese'],
          correct: 2,
        },
        {
          id: 8,
          topic: 'Mesopotamia',
          question: 'What does Mesopotamia mean?',
          options: ['Land of mountains', 'Land between rivers', 'Desert land', 'Coastal region'],
          correct: 1,
        },
        {
          id: 9,
          topic: 'Ancient China',
          question: 'What was the Great Wall of China built for?',
          options: ['Decoration', 'Defense against invasions', 'Trade route', 'Religious purposes'],
          correct: 1,
        },
        {
          id: 10,
          topic: 'Ancient China',
          question: 'What ancient Chinese invention revolutionized record-keeping?',
          options: ['Compass', 'Paper', 'Gunpowder', 'Silk'],
          correct: 1,
        },
      ],
    },
  };

  // Recommendations for each topic
  const topicRecommendations = {
    'Introduction to React': [
      { title: 'React Official Documentation', url: 'https://react.dev/learn', type: 'docs' },
      { title: 'React for Beginners - freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', type: 'video' },
      { title: 'React Fundamentals Course - Codecademy', url: 'https://www.codecademy.com/learn/react-101', type: 'course' }
    ],
    'Core Concepts': [
      { title: 'Understanding Components and Props', url: 'https://react.dev/learn/passing-props-to-a-component', type: 'docs' },
      { title: 'JSX In Depth', url: 'https://react.dev/learn/writing-markup-with-jsx', type: 'docs' },
      { title: 'React Components Tutorial', url: 'https://www.youtube.com/watch?v=Cla1WwguArA', type: 'video' }
    ],
    'State Management': [
      { title: 'State: A Components Memory', url: 'https://react.dev/learn/state-a-components-memory', type: 'docs' },
      { title: 'React State Management Tutorial', url: 'https://www.youtube.com/watch?v=35lXWvCuM8o', type: 'video' },
      { title: 'Redux Fundamentals', url: 'https://redux.js.org/tutorials/fundamentals/part-1-overview', type: 'docs' }
    ],
    'Component Lifecycle': [
      { title: 'useEffect Complete Guide', url: 'https://react.dev/reference/react/useEffect', type: 'docs' },
      { title: 'React Hooks Deep Dive', url: 'https://www.youtube.com/watch?v=cF2lQ_gZeA8', type: 'video' },
      { title: 'Lifecycle Methods Explained', url: 'https://www.freecodecamp.org/news/react-lifecycle-methods/', type: 'article' }
    ],
    'Best Practices': [
      { title: 'React Best Practices 2024', url: 'https://react.dev/learn/thinking-in-react', type: 'docs' },
      { title: 'Clean Code in React', url: 'https://www.youtube.com/watch?v=3XaXKiXtNjw', type: 'video' },
      { title: 'React Performance Optimization', url: 'https://kentcdodds.com/blog/usememo-and-usecallback', type: 'article' }
    ],
    'Introduction': [
      { title: 'Climate Change 101', url: 'https://www.nationalgeographic.com/environment/article/climate-change', type: 'article' },
      { title: 'NASA Climate Kids', url: 'https://climatekids.nasa.gov/', type: 'interactive' },
      { title: 'Climate Science Explained - Khan Academy', url: 'https://www.khanacademy.org/science/biology', type: 'course' }
    ],
    'Causes': [
      { title: 'Causes of Climate Change - EPA', url: 'https://www.epa.gov/climate-change', type: 'article' },
      { title: 'Greenhouse Gas Emissions Explained', url: 'https://www.youtube.com/watch?v=G4H1N_yXBiA', type: 'video' }
    ],
    'Effects': [
      { title: 'Climate Change Effects - NASA', url: 'https://climate.nasa.gov/effects/', type: 'article' },
      { title: 'Impact on Wildlife Documentary', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Solutions': [
      { title: 'Climate Action Solutions', url: 'https://www.un.org/en/climatechange/climate-solutions', type: 'article' },
      { title: 'Renewable Energy Guide', url: 'https://www.energy.gov/eere/renewable-energy', type: 'docs' }
    ],
    'Global Impact': [
      { title: 'IPCC Climate Reports', url: 'https://www.ipcc.ch/', type: 'docs' },
      { title: 'Paris Agreement Explained', url: 'https://unfccc.int/process-and-meetings/the-paris-agreement', type: 'article' }
    ],
    'Ancient Egypt': [
      { title: 'Ancient Egypt - Khan Academy', url: 'https://www.khanacademy.org/humanities/world-history', type: 'course' },
      { title: 'Secrets of the Pyramids', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Ancient Rome': [
      { title: 'Roman Empire History', url: 'https://www.history.com/topics/ancient-rome', type: 'article' },
      { title: 'Life in Ancient Rome', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Ancient Greece': [
      { title: 'Greek Mythology & History', url: 'https://www.britannica.com/topic/ancient-Greek-civilization', type: 'article' },
      { title: 'Ancient Greece Documentary', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Mesopotamia': [
      { title: 'Cradle of Civilization', url: 'https://www.worldhistory.org/Mesopotamia/', type: 'article' },
      { title: 'Mesopotamian Inventions', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Ancient China': [
      { title: 'Ancient China History - National Geographic', url: 'https://www.nationalgeographic.com/', type: 'article' },
      { title: 'Great Wall of China Documentary', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ]
  };

  const extractVideoId = (url) => {
    let id;
    if (url.includes('youtube.com/watch?v=')) {
      id = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      id = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      id = url.split('embed/')[1].split('?')[0];
    }
    return id;
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const id = extractVideoId(youtubeUrl);
    if (id) {
      setVideoId(id);
      setCurrentSection('video');
      const randomQuiz = Object.values(quizzes)[Math.floor(Math.random() * Object.keys(quizzes).length)];
      setSelectedQuiz(randomQuiz);
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  const startQuiz = () => {
    setCurrentSection('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentSection('results');
      saveToHistory();
    }
  };

  const saveToHistory = () => {
    const results = calculateResults();
    const historyItem = {
      id: Date.now(),
      url: youtubeUrl,
      videoId: videoId,
      title: selectedQuiz.title,
      date: new Date().toLocaleString(),
      score: results.correct,
      total: results.total,
      percentage: results.percentage,
      strongTopics: results.strongTopics,
      weakTopics: results.weakTopics,
    };

    const updatedHistory = [historyItem, ...quizHistory].slice(0, 10); // Keep last 10
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const handleRetakeQuiz = () => {
    setYoutubeUrl('');
    setVideoId('');
    setCurrentSection('input');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedQuiz(null);
  };

  const loadHistoryQuiz = (historyItem) => {
    setYoutubeUrl(historyItem.url);
    setVideoId(historyItem.videoId);
    setSelectedQuiz(quizzes[Object.keys(quizzes).find(key => quizzes[key].title === historyItem.title)]);
    setShowHistory(false);
    setCurrentSection('video');
  };

  const calculateResults = () => {
    if (!selectedQuiz) return null;

    const correctCount = userAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correct
    ).length;

    const topicPerformance = {};
    selectedQuiz.questions.forEach((q, index) => {
      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topic].total += 1;
      if (userAnswers[index] === q.correct) {
        topicPerformance[q.topic].correct += 1;
      }
    });

    const strongTopics = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct === perf.total)
      .map(([topic, _]) => topic);

    const weakTopics = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct < perf.total)
      .map(([topic, _]) => topic);

    return {
      correct: correctCount,
      total: selectedQuiz.questions.length,
      percentage: Math.round((correctCount / selectedQuiz.questions.length) * 100),
      strongTopics,
      weakTopics,
      topicPerformance,
    };
  };

  const getRecommendationsForTopic = (topic) => {
    return topicRecommendations[topic] || [];
  };

  const getIconForResourceType = (type) => {
    switch(type) {
      case 'video': return Youtube;
      case 'docs': return BookOpen;
      case 'course': return Award;
      case 'article': return BookOpen;
      case 'interactive': return Target;
      default: return ExternalLink;
    }
  };

  // History Modal
  if (showHistory) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Quiz History</h2>
            </div>
            <button
              onClick={() => setShowHistory(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {quizHistory.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg">No quiz history yet</p>
                <p className="text-gray-500 text-sm mt-2">Complete a quiz to see your history here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {quizHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition cursor-pointer"
                    onClick={() => loadHistoryQuiz(item)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {item.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${
                          item.percentage >= 80 ? 'text-green-400' :
                          item.percentage >= 60 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {item.percentage}%
                        </div>
                        <div className="text-sm text-gray-400">{item.score}/{item.total}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {item.strongTopics.length > 0 && (
                        <div>
                          <div className="text-xs text-green-400 font-semibold mb-2">Strong Topics</div>
                          <div className="space-y-1">
                            {item.strongTopics.map((topic, idx) => (
                              <div key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.weakTopics.length > 0 && (
                        <div>
                          <div className="text-xs text-red-400 font-semibold mb-2">Weak Topics</div>
                          <div className="space-y-1">
                            {item.weakTopics.map((topic, idx) => (
                              <div key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                                <AlertCircle className="w-3 h-3 text-red-500" />
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Input section
  if (currentSection === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Header with History Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition backdrop-blur-sm"
              >
                <History className="w-5 h-5" />
                History
                {quizHistory.length > 0 && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {quizHistory.length}
                  </span>
                )}
              </button>
            </div>

            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-black text-white mb-3">YouTube Quiz Master</h1>
                <p className="text-gray-300">Transform videos into interactive learning experiences</p>
              </div>
              
              <form onSubmit={handleUrlSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">YouTube URL</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50"
                >
                  <Play className="w-5 h-5" />
                  Generate Quiz
                </button>
              </form>

              <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-xs text-gray-300 mb-2 font-semibold flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  Quick Tip
                </p>
                <p className="text-xs text-gray-400">Paste any educational YouTube video link to generate an instant quiz with personalized learning recommendations!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Video section
  if (currentSection === 'video') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentSection('input')}
              className="text-white hover:text-purple-300 font-semibold flex items-center gap-2 transition"
            >
              ← Back to Input
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition"
            >
              <History className="w-5 h-5" />
              History
            </button>
          </div>
          
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-6">{selectedQuiz?.title}</h2>
            
            <div className="bg-black rounded-2xl overflow-hidden mb-6 aspect-video shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-2">Watch & Learn</p>
                  <p className="text-gray-300 text-sm">Watch the video above carefully, then test your understanding with our AI-generated quiz. You'll receive personalized recommendations based on your performance!</p>
                </div>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-lg shadow-lg shadow-purple-500/50"
            >
              <Play className="w-6 h-6" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz section
  if (currentSection === 'quiz' && selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-white text-lg">
                  Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
                  {currentQuestion.topic}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">{currentQuestion.question}</h3>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 ${
                    userAnswers[currentQuestionIndex] === index
                      ? 'border-purple-500 bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/50'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                      userAnswers[currentQuestionIndex] === index
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestionIndex] === undefined}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition duration-200 shadow-lg"
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results section
  if (currentSection === 'results' && selectedQuiz) {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-2">Quiz Complete!</h2>
              <p className="text-gray-300">Here's how you performed</p>
            </div>

            {/* Score Section */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 mb-8 text-center">
              <p className="text-gray-300 text-sm font-semibold mb-3">Your Score</p>
              <h3 className="text-6xl font-black text-white mb-3">
                {results.correct}/{results.total}
              </h3>
              <p className={`text-4xl font-bold mb-6 ${
                results.percentage >= 80 ? 'text-green-400' :
                results.percentage >= 60 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {results.percentage}%
              </p>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    results.percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    results.percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  style={{ width: `${results.percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Strong Topics */}
              {results.strongTopics.length > 0 && (
                <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <CheckCircle className="text-green-400 w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Strong Topics</h4>
                  </div>
                  <div className="space-y-3">
                    {results.strongTopics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-200 font-semibold">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weak Topics */}
              {results.weakTopics.length > 0 && (
                <div className="bg-white/5 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <TrendingUp className="text-red-400 w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Room for Growth</h4>
                  </div>
                  <div className="space-y-3">
                    {results.weakTopics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <span className="text-gray-200 font-semibold">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations Section */}
            {results.weakTopics.length > 0 && (
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">Personalized Learning Recommendations</h4>
                    <p className="text-gray-300 text-sm">Strengthen your weak areas with these curated resources</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {results.weakTopics.map((topic, idx) => {
                    const recommendations = getRecommendationsForTopic(topic);
                    return (
                      <div key={idx} className="bg-white/5 rounded-xl p-5">
                        <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                          {topic}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {recommendations.map((rec, recIdx) => {
                            const Icon = getIconForResourceType(rec.type);
                            return (
                              <a
                                key={recIdx}
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-lg transition"
                              >
                                <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
                                  <Icon className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-sm font-semibold group-hover:text-blue-400 transition truncate">
                                    {rec.title}
                                  </p>
                                  <p className="text-xs text-gray-400 capitalize">{rec.type}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition flex-shrink-0" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Topic Performance Breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <h4 className="text-xl font-bold text-white">Detailed Performance</h4>
              </div>
              <div className="space-y-3">
                {Object.entries(results.topicPerformance).map(([topic, perf], idx) => {
                  const percentage = Math.round((perf.correct / perf.total) * 100);
                  return (
                    <div key={idx} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{topic}</span>
                        <span className="text-gray-300 text-sm">{perf.correct}/{perf.total}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            percentage === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                            'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-5 h-5" />
                Try Another Video
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                <History className="w-5 h-5" />
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default YouTubeQuiz;