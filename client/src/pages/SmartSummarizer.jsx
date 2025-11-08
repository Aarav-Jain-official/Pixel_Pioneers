import React, { useState } from 'react';
import { FileText, Youtube, Link, Sparkles, Copy, Download, BookOpen, Clock, ChevronRight, Check, Zap, List, Brain, Newspaper, Lightbulb, AlertCircle } from 'lucide-react';

const SmartSummarizer = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState('youtube'); // youtube, doc
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [summaryType, setSummaryType] = useState('key-points'); // key-points, tldr, detailed, headline
  const [copied, setCopied] = useState(false);

  // Sample summaries for demo
  const sampleSummaries = {
    youtube: {
      title: "React Hooks Explained - Complete Tutorial",
      duration: "28:45",
      channel: "Web Dev Simplified",
      thumbnail: "yt-thumb",
      summaries: {
        'key-points': {
          points: [
            "React Hooks were introduced in React 16.8 to allow functional components to use state and lifecycle features",
            "useState hook enables state management in functional components with simple syntax",
            "useEffect hook handles side effects and replaces lifecycle methods like componentDidMount and componentDidUpdate",
            "Custom hooks allow you to extract and reuse stateful logic across multiple components",
            "Rules of Hooks: only call at top level and only from React functions",
            "useContext hook simplifies consuming context without nested components",
            "useReducer is useful for complex state logic that involves multiple sub-values",
            "Performance optimization hooks like useMemo and useCallback prevent unnecessary re-renders"
          ],
          type: 'Key Points'
        },
        'tldr': {
          text: "React Hooks revolutionized React development by enabling functional components to use state and lifecycle features. The most important hooks are useState for state management and useEffect for side effects. Following the Rules of Hooks ensures proper functionality. Custom hooks allow reusable logic across components.",
          type: 'TL;DR'
        },
        'detailed': {
          sections: [
            {
              title: "Introduction to React Hooks",
              content: "React Hooks were introduced in version 16.8 as a groundbreaking feature that changed how developers write React components. Before hooks, only class components could have state and lifecycle methods. Hooks enable functional components to have these capabilities, leading to cleaner and more maintainable code.",
              timestamp: "0:00 - 3:45"
            },
            {
              title: "Understanding useState",
              content: "The useState hook is the most fundamental hook for managing state in functional components. It returns an array with two elements: the current state value and a function to update it. The syntax is simple and intuitive, making state management accessible without the complexity of class components.",
              timestamp: "3:46 - 8:20"
            },
            {
              title: "Working with useEffect",
              content: "useEffect is the hook for handling side effects in functional components. It serves as a replacement for componentDidMount, componentDidUpdate, and componentWillUnmount. You can control when effects run by specifying dependencies in the dependency array, optimizing performance and preventing infinite loops.",
              timestamp: "8:21 - 15:30"
            },
            {
              title: "Advanced Hooks and Custom Hooks",
              content: "Beyond the basic hooks, React provides useContext for consuming context, useReducer for complex state management, and performance optimization hooks like useMemo and useCallback. Custom hooks allow developers to extract component logic into reusable functions, promoting code reuse and separation of concerns.",
              timestamp: "15:31 - 24:10"
            },
            {
              title: "Best Practices and Common Pitfalls",
              content: "Following the Rules of Hooks is crucial: always call hooks at the top level and only from React functions. Common mistakes include incorrect dependency arrays in useEffect, causing stale closures or infinite loops. Understanding these patterns helps developers write robust React applications.",
              timestamp: "24:11 - 28:45"
            }
          ],
          type: 'Detailed Summary'
        },
        'headline': {
          text: "React Hooks Transform Functional Components with State Management and Lifecycle Features",
          type: 'Headline'
        }
      },
      keyTerms: ["React Hooks", "useState", "useEffect", "Functional Components", "Custom Hooks", "useContext"],
      estimatedReadTime: "5 min",
      complexity: "Intermediate"
    },
    doc: {
      title: "Introduction to Machine Learning - Research Paper",
      pages: 24,
      author: "Dr. Andrew Ng",
      source: "Stanford University",
      summaries: {
        'key-points': {
          points: [
            "Machine learning is a subset of artificial intelligence that enables systems to learn from data without explicit programming",
            "Three main types: supervised learning (labeled data), unsupervised learning (unlabeled data), and reinforcement learning (reward-based)",
            "Supervised learning algorithms include linear regression, logistic regression, decision trees, and neural networks",
            "Feature engineering and selection are critical steps that significantly impact model performance",
            "Training data should be split into training, validation, and test sets to evaluate model generalization",
            "Overfitting occurs when models perform well on training data but poorly on new data; regularization techniques help prevent this",
            "Common evaluation metrics include accuracy, precision, recall, F1-score for classification, and RMSE, MAE for regression",
            "Deep learning, a subset of machine learning using neural networks with multiple layers, has achieved breakthrough results in computer vision and NLP"
          ],
          type: 'Key Points'
        },
        'tldr': {
          text: "Machine learning enables computers to learn from data through three approaches: supervised, unsupervised, and reinforcement learning. Success depends on quality data, proper feature engineering, and avoiding overfitting. Deep learning has emerged as the most powerful approach for complex problems like image recognition and language processing.",
          type: 'TL;DR'
        },
        'detailed': {
          sections: [
            {
              title: "Foundations of Machine Learning",
              content: "Machine learning represents a paradigm shift in programming, where instead of explicitly coding rules, we train models to discover patterns in data. This approach has proven exceptionally powerful for tasks that are difficult to program explicitly, such as image recognition, natural language understanding, and complex decision-making.",
              page: "Pages 1-4"
            },
            {
              title: "Types of Machine Learning",
              content: "The field divides into three primary categories. Supervised learning uses labeled examples to learn mappings from inputs to outputs. Unsupervised learning finds hidden patterns in unlabeled data through clustering and dimensionality reduction. Reinforcement learning trains agents through trial and error using rewards and penalties.",
              page: "Pages 5-8"
            },
            {
              title: "Algorithm Selection and Implementation",
              content: "Choosing the right algorithm depends on the problem type, data characteristics, and computational resources. Linear models offer interpretability and efficiency for simpler relationships. Tree-based methods handle non-linear patterns well. Neural networks excel at complex hierarchical feature learning but require more data and computation.",
              page: "Pages 9-14"
            },
            {
              title: "Model Evaluation and Validation",
              content: "Proper evaluation methodology is crucial for building reliable models. Cross-validation provides robust performance estimates. The bias-variance tradeoff helps understand model behavior. Regularization techniques like L1 and L2 prevent overfitting. Careful metric selection ensures alignment with business objectives.",
              page: "Pages 15-20"
            },
            {
              title: "Future Directions and Applications",
              content: "Recent advances in deep learning have dramatically expanded machine learning capabilities. Transfer learning enables leveraging pre-trained models for new tasks. Explainable AI addresses the black-box nature of complex models. Automated machine learning (AutoML) democratizes access to sophisticated techniques.",
              page: "Pages 21-24"
            }
          ],
          type: 'Detailed Summary'
        },
        'headline': {
          text: "Machine Learning Revolutionizes Computing Through Data-Driven Pattern Recognition and Automated Decision Making",
          type: 'Headline'
        }
      },
      keyTerms: ["Supervised Learning", "Neural Networks", "Overfitting", "Feature Engineering", "Deep Learning", "Regularization"],
      estimatedReadTime: "8 min",
      complexity: "Advanced"
    }
  };

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    // Simulate API processing
    setTimeout(() => {
      setSummary(sampleSummaries[inputType]);
      setIsLoading(false);
    }, 2500);
  };

  const handleCopy = () => {
    const currentSummary = summary.summaries[summaryType];
    let textToCopy = '';

    if (summaryType === 'key-points') {
      textToCopy = currentSummary.points.join('\n• ');
    } else if (summaryType === 'tldr' || summaryType === 'headline') {
      textToCopy = currentSummary.text;
    } else if (summaryType === 'detailed') {
      textToCopy = currentSummary.sections.map(s => `${s.title}\n${s.content}`).join('\n\n');
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputUrl('');
    setSummary(null);
    setSummaryType('key-points');
  };

  const getSummaryIcon = (type) => {
    switch(type) {
      case 'key-points': return List;
      case 'tldr': return Zap;
      case 'detailed': return BookOpen;
      case 'headline': return Newspaper;
      default: return Brain;
    }
  };

  // INPUT VIEW
  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-3xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-4 rounded-2xl shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
                  SmartSummarize
                </h1>
              </div>
              <p className="text-gray-200 text-xl mb-2">AI-Powered Content Summarization</p>
              <p className="text-gray-400">Transform lengthy videos and documents into digestible insights</p>
            </div>

            {/* Main Card */}
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Type Selector */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => setInputType('youtube')}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all ${
                    inputType === 'youtube'
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Youtube className="w-5 h-5" />
                  YouTube Video
                </button>
                <button
                  onClick={() => setInputType('doc')}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all ${
                    inputType === 'doc'
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Document
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSummarize} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    {inputType === 'youtube' ? 'YouTube URL' : 'Document URL or Upload'}
                  </label>
                  <div className="relative">
                    <Link className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder={
                        inputType === 'youtube'
                          ? 'https://www.youtube.com/watch?v=...'
                          : 'https://example.com/document.pdf'
                      }
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center gap-3 text-lg shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin">⚙️</div>
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      Generate Summary
                    </>
                  )}
                </button>
              </form>

              {/* Sample Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Try a sample {inputType === 'youtube' ? 'video' : 'document'}:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inputType === 'youtube' ? (
                    <>
                      <button
                        onClick={() => setInputUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <Youtube className="w-5 h-5 text-red-500" />
                          <div className="flex-1">
                            <div className="font-semibold text-red-400 text-sm">React Hooks Tutorial</div>
                            <div className="text-xs text-gray-400">28:45 • Web Dev Simplified</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setInputUrl('https://www.youtube.com/watch?v=example2')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <Youtube className="w-5 h-5 text-red-500" />
                          <div className="flex-1">
                            <div className="font-semibold text-red-400 text-sm">Python Machine Learning</div>
                            <div className="text-xs text-gray-400">45:20 • freeCodeCamp</div>
                          </div>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setInputUrl('https://arxiv.org/pdf/example.pdf')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div className="flex-1">
                            <div className="font-semibold text-blue-400 text-sm">ML Research Paper</div>
                            <div className="text-xs text-gray-400">24 pages • Stanford</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setInputUrl('https://example.com/whitepaper.pdf')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div className="flex-1">
                            <div className="font-semibold text-blue-400 text-sm">AI Whitepaper</div>
                            <div className="text-xs text-gray-400">18 pages • OpenAI</div>
                          </div>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Get summaries in seconds' },
                { icon: Brain, title: 'AI-Powered', desc: 'Advanced NLP algorithms' },
                { icon: Lightbulb, title: 'Smart Insights', desc: 'Extract key information' },
              ].map((feature, idx) => (
                <div key={idx} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <feature.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUMMARY VIEW
  const currentSummary = summary.summaries[summaryType];
  const Icon = getSummaryIcon(summaryType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-2"
          >
            ← New Summary
          </button>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-white text-xl">SmartSummarize</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Content Info */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${
              inputType === 'youtube' ? 'from-red-500 to-pink-600' : 'from-blue-500 to-cyan-600'
            } flex items-center justify-center flex-shrink-0`}>
              {inputType === 'youtube' ? (
                <Youtube className="w-12 h-12 text-white" />
              ) : (
                <FileText className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{summary.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {inputType === 'youtube' ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {summary.duration}
                    </div>
                    <div>{summary.channel}</div>
                  </>
                ) : (
                  <>
                    <div>{summary.pages} pages</div>
                    <div>By {summary.author}</div>
                    <div>{summary.source}</div>
                  </>
                )}
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {summary.estimatedReadTime} read
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  summary.complexity === 'Beginner' ? 'bg-green-600' :
                  summary.complexity === 'Intermediate' ? 'bg-yellow-600' :
                  'bg-red-600'
                }`}>
                  {summary.complexity}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Type Selector */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Summary Type</h3>
              <div className="space-y-2">
                {[
                  { id: 'key-points', label: 'Key Points', icon: List },
                  { id: 'tldr', label: 'TL;DR', icon: Zap },
                  { id: 'detailed', label: 'Detailed', icon: BookOpen },
                  { id: 'headline', label: 'Headline', icon: Newspaper },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSummaryType(type.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      summaryType === type.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <type.icon className="w-5 h-5" />
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Terms */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase">Key Terms</h3>
              <div className="flex flex-wrap gap-2">
                {summary.keyTerms.map((term, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-full text-xs font-semibold"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Summary Content */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">{currentSummary.type}</h2>
              </div>

              {/* Key Points */}
              {summaryType === 'key-points' && (
                <div className="space-y-4">
                  {currentSummary.points.map((point, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed flex-1">{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TL;DR / Headline */}
              {(summaryType === 'tldr' || summaryType === 'headline') && (
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                  <p className="text-lg text-gray-100 leading-relaxed">{currentSummary.text}</p>
                </div>
              )}

              {/* Detailed */}
              {summaryType === 'detailed' && (
                <div className="space-y-6">
                  {currentSummary.sections.map((section, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{section.title}</h3>
                          <p className="text-xs text-gray-400">{section.timestamp || section.page}</p>
                        </div>
                      </div>
                      <p className="text-gray-200 leading-relaxed ml-14">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSummarizer;