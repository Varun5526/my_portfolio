import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  Code, 
  Database, 
  Brain, 
  BarChart, 
  Server, 
  Terminal, 
  Globe, 
  Users, 
  MessageSquare, 
  Lightbulb, 
  Zap, 
  Clock, 
  Award, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Send, 
  X, 
  Loader, 
  MessageCircle, 
  Rocket, 
  Heart, 
  Bookmark, 
  Moon, 
  Sun, 
  Menu, 
  User, 
  Briefcase,
  Bot, 
  FileSpreadsheet,
  WifiOff,
  ArrowUp,
  CheckCircle,
  AlertCircle,
  FileText,
  Quote,
  Star,
  TrendingUp
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// --- Local "Brain" for Offline Mode ---
const generateOfflineResponse = (query, context) => {
  const lowerQuery = query.toLowerCase();

  // 1. Skills
  if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || lowerQuery.includes('stack')) {
    return `I am proficient in ${context.skills.slice(0, 4).join(', ')}, and ${context.skills[4]}. My core strengths are Data Analytics, Python, and SQL.`;
  }
  
  // 2. Projects
  if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('work')) {
    const projectNames = context.projects.map(p => p.title).join(', ');
    return `I've worked on several exciting projects like: ${projectNames}. My featured project is the RAG Chatbot using LangChain.`;
  }

  // 3. Experience / Internships
  if (lowerQuery.includes('experience') || lowerQuery.includes('intern') || lowerQuery.includes('job') || lowerQuery.includes('company')) {
    const experiences = context.experience.map(e => `${e.title} at ${e.company}`).join(' and ');
    return `I have professional experience as a ${experiences}.`;
  }

  // 4. Certifications
  if (lowerQuery.includes('certif') || lowerQuery.includes('course')) {
    return `I hold certifications in ${context.certifications[0]}, ${context.certifications[1]}, and specifically Power BI Data Modelling.`;
  }

  // 5. Contact
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
    return "You can reach me via email at varunbala2809@gmail.com or call me at +91-8838193946.";
  }

  // 6. Education
  if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('college')) {
    return "I am currently pursuing my B.Tech in AI & Data Science at Rajalakshmi Institute of Technology with a CGPA of 8.0.";
  }

  // 7. Excel/Power BI specific
  if (lowerQuery.includes('excel') || lowerQuery.includes('power bi')) {
    return "Yes! I have strong proficiency in Excel and Power BI, including Data Modelling certifications and internship experience using these tools.";
  }

  // Default Fallback
  return "I'm currently in offline mode. I can tell you about my Skills, Projects, Experience, or how to Contact me. What would you like to know?";
};

// --- Gemini API Setup ---
const apiKey = ""; 

const callGemini = async (prompt, systemInstruction, contextData) => {
  // Check for offline status or missing API key
  if (!navigator.onLine || !apiKey) {
    console.log("Operating in Offline Mode");
    await new Promise(resolve => setTimeout(resolve, 600)); 
    return generateOfflineResponse(prompt, contextData);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );
    if (!response.ok) throw new Error('API call failed');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error (Falling back to offline mode):", error);
    return generateOfflineResponse(prompt, contextData);
  }
};

// --- Visual Effect Components ---

const MatrixRain = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Optimize column count for mobile devices
    const isMobile = window.innerWidth < 768;
    const columnWidth = isMobile ? 30 : 20;
    const columns = Math.floor(canvas.width / columnWidth);
    const drops = Array(columns).fill(1);
    const chars = "01ABCDEF";

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0'; 
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'; 
        ctx.fillText(text, i * columnWidth, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    let lastTime = 0;
    // Slower frame rate on mobile for better performance
    const frameDelay = isMobile ? 50 : 33;
    const animate = (time) => {
      if (time - lastTime > frameDelay) {
        draw();
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);

    return () => { 
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas); 
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20" />;
};

const ConnectingParticles = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 50; 
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.5)'; 
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - dist / 150)})`; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

// --- Helper Components ---

const TiltCard = ({ children, className = "", isDark = true, onClick }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  const baseClasses = isDark 
    ? "bg-[#0a0a16] border-[#1f1f3a] bg-opacity-90 text-gray-300" 
    : "bg-white border-gray-200 bg-opacity-80 text-gray-700 shadow-lg";

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
      className={`rounded-2xl backdrop-blur-sm transition-all duration-300 ${baseClasses} ${className}`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        boxShadow: isHovered ? (isDark ? '0 10px 30px -10px rgba(6, 182, 212, 0.3)' : '0 10px 30px -10px rgba(6, 182, 212, 0.2)') : 'none',
        borderColor: isHovered ? 'rgba(6, 182, 212, 0.5)' : (isDark ? '#1f1f3a' : '#e5e7eb')
      }}
    >
      {children}
    </div>
  );
};

const RevealOnScroll = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
};

const SectionTitle = ({ title, subtitle, isDark }) => (
  <RevealOnScroll className="text-center mb-12">
    <h2 className={`text-3xl md:text-5xl font-bold mb-4 inline-block relative tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
        {title}
      </span>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
    </h2>
    {subtitle && <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
  </RevealOnScroll>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border border-transparent ${className}`}>
    {children}
  </span>
);

const ProjectModal = ({ project, onClose, isDark }) => {
  if (!project) return null;
  const Icon = project.icon;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className={`w-full max-w-2xl border rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200'}`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-gray-900'}`}
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-4 mb-6">
           <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0`}>
              <Icon className="h-8 w-8 text-white" />
           </div>
           <div>
             <div className="flex items-center gap-2 mb-1">
                <Badge className={`border-none text-cyan-600 ${isDark ? 'bg-white/10' : 'bg-cyan-50'}`}>{project.category}</Badge>
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><Zap size={12}/> {project.metrics}</span>
             </div>
             <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
           </div>
        </div>
        
        <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2">
           <div>
             <h4 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Overview</h4>
             <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{project.fullDescription || project.description}</p>
           </div>
           
           <div>
             <h4 className={`text-sm font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Technologies</h4>
             <div className="flex flex-wrap gap-2">
               {project.tech.map((t, i) => (
                 <Badge key={i} className={`border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>{t}</Badge>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- AI Components ---

const ChatWidget = ({ contextData, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Varun's assistant. Ask me anything about his skills, projects, or experience! ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const suggestions = [
    "What are Varun's top skills?",
    "Tell me about the RAG Chatbot project.",
    "Does Varun know Excel and Power BI?",
    "Describe his experience at Future Interns.",
    "How can I contact Varun?"
  ];

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const systemPrompt = `You are the AI representation of Varun S. Answer as if you are him.
    Context: ${JSON.stringify(contextData)}
    
    Role: You are a helpful RAG Assistant for Varun's portfolio.
    Tone: Professional, enthusiastic, and concise.
    Knowledge Base: Use the provided JSON data as your ground truth.
    Refusals: If a question is completely unrelated to Varun or his skills, politely redirect to his portfolio topics.`;

    const reply = await callGemini(text, systemPrompt, contextData);
    setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    setIsTyping(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all duration-200 animate-bounce"
      >
        {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white" />}
      </button>

      {isOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col max-h-[500px] animate-in slide-in-from-right duration-300 ${isDark ? 'bg-[#0f172a]/95 border-cyan-500/30' : 'bg-white/95 border-gray-200'}`}>
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-white" />
                <h3 className="font-bold text-white text-sm">Varun's Assistant</h3>
            </div>
            {!isOnline && (
                <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full" title="Offline Mode Enabled">
                    <WifiOff size={12} className="text-gray-300" />
                    <span className="text-[10px] text-gray-300 font-medium">Offline</span>
                </div>
            )}
          </div>
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
            {messages.length === 1 && (
               <p className={`text-xs text-center mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ask me anything about Varun!</p>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-none' : (isDark ? 'bg-[#1e293b] text-gray-200 rounded-bl-none' : 'bg-white text-gray-700 border border-gray-200 shadow-sm rounded-bl-none')}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-col gap-2 mt-2">
                {suggestions.map((q, i) => (
                  <button key={i} onClick={() => handleSend(q)} className={`text-xs p-2 rounded-lg transition-all hover:scale-105 text-left border ${isDark ? 'bg-primary/10 text-foreground border-primary/30 hover:bg-primary/20' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            {isTyping && (
                 <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span className="text-xs">Thinking...</span>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={`p-3 border-t flex gap-2 rounded-b-2xl ${isDark ? 'border-gray-800 bg-[#0f172a]' : 'border-gray-200 bg-white'}`}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..." 
              className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none border ${isDark ? 'bg-[#1e293b] border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'}`}
            />
            <button onClick={() => handleSend()} disabled={!input.trim()} className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-2 rounded-full hover:scale-105 active:scale-95 transition-transform"><Send size={16} /></button>
          </div>
        </div>
      )}
    </>
  );
};

// --- Data ---

const skillsData = [
  { icon: BarChart, title: "Data Analytics", projects: "3+", certs: "2", exp: "1 Year", level: 100, color: { bg: "bg-blue-500", text: "text-blue-400", bar: "bg-blue-500", grad: "from-cyan-500 to-blue-500" } },
  { icon: Database, title: "SQL", projects: "4+", certs: "1", exp: "2 Years", level: 100, color: { bg: "bg-pink-500", text: "text-pink-400", bar: "bg-pink-500", grad: "from-purple-500 to-pink-500" } },
  { icon: Terminal, title: "Python", projects: "5+", certs: "2", exp: "2 Years", level: 100, color: { bg: "bg-green-500", text: "text-green-400", bar: "bg-green-500", grad: "from-emerald-500 to-teal-500" } },
  { icon: FileSpreadsheet, title: "Excel", projects: "5+", certs: "2", exp: "2 Years", level: 100, color: { bg: "bg-green-600", text: "text-green-500", bar: "bg-green-600", grad: "from-green-600 to-emerald-600" } }, 
  { icon: Server, title: "MongoDB", projects: "2+", certs: "1", exp: "1 Year", level: 100, color: { bg: "bg-green-400", text: "text-green-400", bar: "bg-green-400", grad: "from-green-500 to-emerald-500" } },
  { icon: BarChart, title: "Power BI", projects: "2+", certs: "1", exp: "Intern", level: 100, color: { bg: "bg-yellow-500", text: "text-yellow-400", bar: "bg-yellow-500", grad: "from-yellow-500 to-orange-500" } },
  { icon: BarChart, title: "Tableau", projects: "2+", certs: "1", exp: "1 Year", level: 100, color: { bg: "bg-purple-500", text: "text-purple-400", bar: "bg-purple-500", grad: "from-blue-500 to-indigo-500" } },
  { icon: Brain, title: "Machine Learning", projects: "3+", certs: "2", exp: "1 Year", level: 100, color: { bg: "bg-pink-500", text: "text-pink-400", bar: "bg-pink-500", grad: "from-pink-500 to-purple-500" } },
];

const radarData = [
  { subject: 'Data Analytics', A: 100 }, { subject: 'SQL', A: 100 }, { subject: 'Python', A: 100 }, { subject: 'Excel', A: 100 }, 
  { subject: 'MongoDB', A: 100 }, { subject: 'Power BI', A: 100 }, { subject: 'Tableau', A: 100 }, { subject: 'Machine Learning', A: 100 },
];

const projectsData = [
  {
    title: "RAG Chatbot with LangChain & OpenAI",
    category: "Generative AI",
    description: "Built a Retrieval-Augmented Generation (RAG) chatbot capable of answering questions from custom PDF documents.",
    fullDescription: "This project demonstrates the implementation of a RAG pipeline using LangChain and OpenAI's GPT models. The system ingests PDF documents, chunks and embeds the text using vector embeddings, and stores them in a vector database (e.g., Pinecone or ChromaDB). When a user asks a question, the system retrieves the most relevant context chunks and feeds them to the LLM to generate accurate, context-aware answers. Key features include document parsing, efficient similarity search, and prompt engineering for concise responses.",
    tech: ["Python", "LangChain", "OpenAI API", "Vector DB", "Streamlit"],
    color: "from-orange-500 to-red-500",
    icon: Bot,
    metrics: "Context-Aware • Custom Knowledge Base",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Stock Price Prediction",
    category: "Deep Learning",
    description: "Developed a sophisticated Stock Price Prediction model using Multi-Branch LSTM architecture with TensorFlow/Keras for highly accurate time-series forecasting, achieving remarkably low RMSE scores.",
    fullDescription: "This project implements a Multi-Branch LSTM neural network architecture that processes multiple time-series features simultaneously to predict stock prices. The model was trained on historical stock data and achieved exceptional accuracy with minimal error rates.",
    tech: ["Python", "TensorFlow", "Keras", "LSTM", "Time-Series Analysis"],
    color: "from-cyan-500 to-blue-500",
    icon: Brain,
    metrics: "Low RMSE • High Accuracy",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Football Player Analytics Dashboard",
    category: "Data Analytics",
    description: "Built an interactive Football Player Analytics Dashboard using Streamlit and Plotly, providing comprehensive club-level insights with dynamic visualizations and real-time data filtering.",
    fullDescription: "A comprehensive data analytics platform that allows users to explore football player statistics, compare performance metrics, and generate insights through interactive visualizations. Features include dynamic filtering, real-time updates, and customizable dashboards.",
    tech: ["Python", "Streamlit", "Plotly", "Data Visualization", "Analytics"],
    color: "from-purple-500 to-pink-500",
    icon: BarChart,
    metrics: "Interactive • Real-time Insights",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Multi-Client TCP Chat Application",
    category: "Networking",
    description: "Implemented a robust Multi-Client TCP Chat Application in Java using multi-threading for real-time communication, supporting concurrent connections and message broadcasting.",
    fullDescription: "A scalable chat application built with Java that supports multiple concurrent users through efficient multi-threading. The system handles message broadcasting, user authentication, and maintains stable connections across all clients.",
    tech: ["Java", "TCP/IP", "Multi-threading", "Networking", "Real-time Systems"],
    color: "from-emerald-500 to-teal-500",
    icon: MessageSquare,
    metrics: "Multi-threaded • Scalable",
    demoLink: "#",
    githubLink: "#"
  },
  {
    title: "Business Intelligence Dashboard",
    category: "Business Intelligence",
    description: "Designed and developed an interactive Power BI dashboard featuring advanced time-series analysis, DAX-powered KPIs, and compelling data storytelling to transform raw business data into actionable insights.",
    fullDescription: "A comprehensive business intelligence solution built in Power BI that showcases end-to-end data analytics capabilities. The project involved: Data Transformation - Cleaned and transformed multiple Excel/CSV datasets using Power Query, handling missing values, data types, and creating calculated columns. Time Series Analysis - Implemented trending analysis with date hierarchies, YoY/MoM comparisons, and forecasting visualizations. DAX Mastery - Created complex measures and calculated columns for KPIs including running totals, moving averages, and percentage changes. Visual Storytelling - Designed an intuitive dashboard layout with interactive filters, drill-throughs, and dynamic tooltips for effective business communication. Performance Optimization - Implemented efficient data models with proper relationships and optimized DAX formulas for fast query performance. The dashboard provides stakeholders with real-time insights through interactive charts, trend analysis, and key performance indicators, enabling data-driven decision making.",
    tech: ["Power BI", "DAX", "Power Query", "Excel/CSV Integration", "Time Series Analysis", "Data Modeling"],
    color: "from-yellow-500 to-orange-500",
    icon: BarChart,
    metrics: "10+ KPIs • Interactive Visuals",
    downloadFile: "/MY_1ST_PROJECT.pbix",
    demoLink: "#"
  },
  {
    title: "E-Commerce Sales Insights Dashboard",
    category: "Business Intelligence",
    description: "Developed a comprehensive E-Commerce Sales Analytics dashboard integrating MySQL database with Power BI to deliver real-time sales insights, customer behavior analysis, and revenue tracking.",
    fullDescription: "An end-to-end business intelligence solution that connects MySQL database to Power BI for dynamic e-commerce analytics. The project encompasses: Database Integration - Established direct connectivity between MySQL and Power BI using native connectors, ensuring real-time data synchronization and automated refresh schedules. SQL Query Optimization - Wrote efficient SQL queries to extract, filter, and aggregate large-scale e-commerce transaction data, implementing joins across multiple tables for comprehensive analysis. Sales Analytics - Created detailed sales performance metrics including revenue trends, product category analysis, regional sales distribution, and customer segmentation insights. Interactive Dashboards - Designed user-friendly visualizations featuring sales funnels, conversion rates, top-performing products, and seasonal trend analysis with drill-down capabilities. KPI Monitoring - Implemented key performance indicators such as Average Order Value (AOV), Customer Lifetime Value (CLV), cart abandonment rates, and repeat purchase ratios. The dashboard empowers business stakeholders with actionable insights to optimize inventory, marketing strategies, and customer engagement initiatives.",
    tech: ["MySQL", "Power BI", "SQL", "Data Integration", "Sales Analytics", "ETL"],
    color: "from-indigo-500 to-purple-500",
    icon: Database,
    metrics: "Real-time Data • Sales KPIs",
    demoLink: "#"
  }
];

const experienceData = [
  {
    title: "Data Science & Analytics Intern",
    company: "Future Interns",
    duration: "Nov 2025 - Dec 2025",
    description: [
      "Selected for the Fellowship Program, focusing on comprehensive skill development.",
      "Engaged in orientation sessions to align with industry standards and practices.",
      "Applied data science concepts in a practical, real-world environment.",
      "Contributed to analytics projects, enhancing problem-solving capabilities."
    ],
    tech: ["Data Science", "Analytics", "Python", "Predictive Modeling"],
    color: "border-l-4 border-cyan-500"
  },
  {
    title: "AI Intern",
    company: "HERE AND NOW AI - Artificial Intelligence Research Institute",
    duration: "Oct 2025 - Nov 2025",
    description: [
      "Selected for the Internship Program at an AI Research Institute.",
      "Responsibilities aligned with the role of an AI Intern, focusing on cutting-edge technologies.",
      "Participated in an educational internship based in Chennai.",
      "Gained exposure to artificial intelligence research and development processes."
    ],
    tech: ["Artificial Intelligence", "Deep Learning", "Neural Networks", "Research"],
    color: "border-l-4 border-purple-500"
  }
];

const certificationsData = [
  "Data Analytics and Data Visualization Job Simulation",
  "MongoDB for Students",
  "Swift Programming",
  "Building With Artificial Intelligence",
  "Data Science & Analytics",
  "Data Visualization Basics",
  "Gen AI Job Simulation",
  "Power BI Data Modelling"
];

const softSkills = [
  { name: "Communication", icon: MessageSquare },
  { name: "Teamwork", icon: Users },
  { name: "Problem Solving", icon: Lightbulb },
  { name: "Adaptability", icon: Zap },
  { name: "Leadership", icon: User },
  { name: "Time Management", icon: Clock },
];

const testimonialsData = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Professor, AI Department",
    company: "Rajalakshmi Institute of Technology",
    image: "👨‍🏫",
    text: "Varun demonstrates exceptional analytical skills and a deep understanding of AI concepts. His projects showcase practical application of theoretical knowledge.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Team Lead",
    company: "Future Interns",
    image: "👩‍💼",
    text: "Outstanding intern with strong data science fundamentals. Varun's ability to translate complex data into actionable insights is impressive.",
    rating: 5
  },
  {
    name: "Amit Patel",
    role: "Senior Data Analyst",
    company: "HERE AND NOW AI",
    image: "👨‍💻",
    text: "Varun's technical proficiency in Python and machine learning, combined with his problem-solving approach, makes him a valuable asset to any team.",
    rating: 5
  }
];

const PORTFOLIO_CONTEXT = {
  skills: skillsData.map(s => s.title),
  projects: projectsData,
  experience: experienceData,
  certifications: certificationsData,
  summary: "B.Tech AI & Data Science Student at Rajalakshmi Institute of Technology with a CGPA of 8.0."
};

// --- Main App ---

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = ["Data Analyst", "Data Engineer", "Data Scientist", "ML Engineer", "AI Engineer", "AI Researcher", "Business Analyst", "Problem Solver"];

  useEffect(() => {
    let loopNum = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer;

    const handleType = () => {
      const currentRole = roles[loopNum % roles.length];
      const fullText = currentRole;
      
      setTypingText(prevText => {
        if (!isDeleting && prevText === fullText) {
          setTimeout(() => { isDeleting = true; }, 2000);
          return prevText;
        }
        if (isDeleting && prevText === '') {
          isDeleting = false;
          loopNum++;
          return '';
        }
        return isDeleting ? fullText.substring(0, prevText.length - 1) : fullText.substring(0, prevText.length + 1);
      });

      typingSpeed = isDeleting ? 50 : 100;
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, 100);
    return () => clearTimeout(timer);
  }, []);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Use FormData to send form without page reload
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('message', formData.message);
      formPayload.append('_subject', `New Portfolio Contact from ${formData.name}`);
      formPayload.append('_replyto', formData.email); // Enable reply-to sender
      formPayload.append('_captcha', 'false');
      formPayload.append('_template', 'table');
      formPayload.append('_autoresponse', 'Thanks for reaching out! I received your message and will reply soon.');
      formPayload.append('_honey', ''); // Honeypot anti-spam field

      const response = await fetch('https://formsubmit.co/varunbala2809@gmail.com', {
        method: 'POST',
        body: formPayload,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please email me directly at varunbala2809@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadResume = () => {
    // Download the updated resume PDF (clean filename)
    const link = document.createElement('a');
    link.href = '/Varun_Resume.pdf';
    link.download = 'Varun_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-cyan-400 text-xl font-bold animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-700 ${isDark ? 'bg-[#030014] text-gray-300' : 'bg-gray-50 text-gray-900'}`}>
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MatrixRain />
        <ConnectingParticles />
        {isDark && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014] pointer-events-none"></div>}
      </div>

      <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b transition-colors duration-500 ${isDark ? 'bg-[#030014]/70 border-white/10' : 'bg-white/70 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
           <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text flex items-center gap-2">
            <Terminal size={24} className="text-cyan-500" />
            Varun S
           </div>
           <div className="hidden md:flex gap-8 text-sm font-medium">
             {['About', 'Education', 'Experience', 'Skills', 'Projects', 'Contact'].map(item => (
               <button 
                 key={item} 
                 onClick={() => scrollToSection(item.toLowerCase())} 
                 className={`hover:text-cyan-400 transition-colors ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
               >
                 {item}
               </button>
             ))}
             <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-200/20">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
           </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 overflow-hidden">
        {/* Enhanced gradient background with particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
        <ConnectingParticles />
        <div className="absolute top-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-500 pointer-events-none"></div>

        <div className="text-center z-10 max-w-4xl animate-in fade-in zoom-in-95 duration-1000" style={{perspective: '1000px'}}>
          <div className={`inline-block px-4 py-2 rounded-full border text-xs tracking-widest uppercase mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.5)] animate-pulse transform hover:scale-110 transition-all duration-300 ${isDark ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' : 'border-cyan-600/20 bg-cyan-100 text-cyan-700'}`} style={{animation: 'float 3s ease-in-out infinite'}}>
            Data & AI Professional
          </div>
          <h1 className={`text-7xl md:text-9xl font-bold mb-6 tracking-tighter animate-in slide-in-from-bottom-10 duration-700 transform hover:scale-105 transition-transform ${isDark ? 'text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]' : 'text-gray-900'}`} style={{textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 50px rgba(6,182,212,0.4)', transform: 'translateZ(50px)'}}>
            Varun <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" style={{textShadow: '0 0 40px rgba(6,182,212,0.9)'}}>S</span>
          </h1>
          <div className={`text-2xl md:text-4xl font-light mb-8 flex justify-center items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            I am a <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{typingText}</span>
            <span className="animate-pulse text-cyan-400">|</span>
          </div>
          <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>B.Tech AI & Data Science Student | <span className="text-cyan-500 font-bold">CGPA 8.0</span> | Chennai, India</p>
          
          <div className="flex gap-4 justify-center mb-12">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-[0_20px_50px_rgba(6,182,212,0.4)] transition-all duration-300" style={{transform: 'translateZ(20px)', boxShadow: '0 10px 40px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.2)'}}>Get In Touch</button>
            <button onClick={() => scrollToSection('projects')} className={`px-8 py-3 rounded-full border font-bold transition-all backdrop-blur-md hover:scale-105 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] ${isDark ? 'border-cyan-500/30 bg-[#0f172a]/50 text-white hover:bg-cyan-500/10' : 'border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100'}`} style={{transform: 'translateZ(20px)'}}>View Projects</button>
          </div>

          <div className="flex gap-6 justify-center mb-16" style={{perspective: '1000px'}}>
             <a href="mailto:varunbala2809@gmail.com" className={`p-3 border rounded-full transition-all hover:scale-110 hover:shadow-[0_15px_40px_rgba(6,182,212,0.4)] hover:-translate-y-2 ${isDark ? 'bg-[#0a0a16]/80 border-gray-800 hover:border-cyan-500 text-cyan-400' : 'bg-white border-gray-200 text-cyan-600'}`} style={{transform: 'rotateX(10deg)', transformStyle: 'preserve-3d'}}><Mail size={24} /></a>
             <a href="tel:+918838193946" className={`p-3 border rounded-full transition-all hover:scale-110 hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)] hover:-translate-y-2 ${isDark ? 'bg-[#0a0a16]/80 border-gray-800 hover:border-purple-500 text-purple-400' : 'bg-white border-gray-200 text-purple-600'}`} style={{transform: 'rotateX(10deg)', transformStyle: 'preserve-3d'}}><Phone size={24} /></a>
             <a href="https://www.linkedin.com/in/varun-s-226513305" target="_blank" rel="noopener noreferrer" className={`p-3 border rounded-full transition-all hover:scale-110 hover:shadow-[0_15px_40px_rgba(59,130,246,0.4)] hover:-translate-y-2 ${isDark ? 'bg-[#0a0a16]/80 border-gray-800 hover:border-blue-500 text-blue-400' : 'bg-white border-gray-200 text-blue-600'}`} style={{transform: 'rotateX(10deg)', transformStyle: 'preserve-3d'}}><Linkedin size={24} /></a>
          </div>

          <TiltCard isDark={isDark} className={`grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-8 rounded-2xl ${isDark ? 'border-white/5 bg-white/5' : 'border-gray-200 bg-white/60'}`}>
             <div className="flex flex-col items-center p-4"><MapPin size={20} className="text-cyan-500 mb-2" /><span className="text-sm opacity-70">Chennai, India</span></div>
             <div className="flex flex-col items-center p-4"><Calendar size={20} className="text-purple-500 mb-2" /><span className="text-sm opacity-70">Born May 5, 2006</span></div>
             <div className="flex flex-col items-center p-4"><Award size={20} className="text-pink-500 mb-2" /><span className="text-sm opacity-70">8+ Certifications</span></div>
             <div className="flex flex-col items-center p-4"><Globe size={20} className="text-green-500 mb-2" /><span className="text-sm opacity-70">3 Languages</span></div>
          </TiltCard>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="About Me" isDark={isDark} />
          <div className="grid md:grid-cols-2 gap-8">
            <TiltCard isDark={isDark} className={`border-l-4 border-l-cyan-500 h-full p-8 ${isDark ? 'bg-[#0a0a16]/90' : 'bg-white/90 shadow-xl'}`}>
              <h3 className="text-2xl font-bold text-cyan-500 mb-4">Professional Summary</h3>
              <p className="leading-relaxed mb-4">I'm an aspiring Artificial Intelligence and Data Science professional with a strong foundation in probability, statistics, and mathematics. Currently pursuing my B.Tech in AI & Data Science at Rajalakshmi Institute of Technology with a CGPA of 8.0.</p>
              <p className="leading-relaxed mb-6">Proficient in MongoDB, Excel, and Python, I have a passion for solving complex problems through data-driven approaches. My expertise spans data analytics, machine learning, and software development.</p>
              
              <button onClick={downloadResume} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-[0_20px_50px_rgba(6,182,212,0.5)] transition-all duration-300 group">
                <FileText size={22} className="group-hover:rotate-12 transition-transform" />
                <span>Download Resume</span>
              </button>
            </TiltCard>
            
            <div className="flex flex-col gap-6">
               <TiltCard isDark={isDark} className={`border-l-4 border-l-purple-500 p-8 ${isDark ? 'bg-[#0a0a16]/90' : 'bg-white/90 shadow-xl'}`}>
                <h3 className="text-2xl font-bold text-purple-500 mb-6">Languages</h3>
                <div className="space-y-6">
                  {[
                    { lang: "English", level: "Fluent", color: "bg-cyan-500" },
                    { lang: "Tamil", level: "Fluent", color: "bg-purple-500" },
                    { lang: "Hindi", level: "Read/Write", color: "bg-pink-500", width: "70%" }
                  ].map((l, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2"><span className={isDark ? 'text-white' : 'text-gray-900'}>{l.lang}</span><span className="text-xs opacity-70">{l.level}</span></div>
                      <div className={`h-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}><div className={`h-full rounded-full ${l.color}`} style={{ width: l.width || '100%' }}></div></div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-20 relative ${isDark ? 'bg-[#050515]/50' : 'bg-gray-100/50'}`}>
         <div className="max-w-4xl mx-auto px-6">
           <SectionTitle title="Education" subtitle="Academic excellence and continuous learning" isDark={isDark} />
           
           <div className="relative mt-10">
             <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>

             <RevealOnScroll className="relative mb-12 md:flex justify-between items-center group">
                <div className="md:w-5/12 mb-4 md:mb-0 md:text-right order-1 pr-8 pl-16 md:pl-0">
                   <TiltCard isDark={isDark} className={`p-6 border-l-4 border-l-cyan-500 ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                     <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Bachelor of Technology (B.Tech)</h3>
                     <p className="text-cyan-500 text-sm mb-1">Artificial Intelligence & Data Science</p>
                     <p className="text-sm opacity-70">Rajalakshmi Institute of Technology, Chennai</p>
                     <div className="flex gap-2 mt-3 md:justify-end"><Badge className="bg-cyan-500/20 text-cyan-600">CGPA: 8.0</Badge><span className="text-xs self-center opacity-70">2023 - Present</span></div>
                   </TiltCard>
                </div>
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-cyan-500 rounded-full z-10 flex items-center justify-center ${isDark ? 'bg-[#030014]' : 'bg-white'}`}><div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div></div>
                <div className="md:w-5/12 order-2"></div>
             </RevealOnScroll>

             <RevealOnScroll className="relative mb-12 md:flex justify-between items-center group">
                <div className="md:w-5/12 order-1"></div>
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-purple-500 rounded-full z-10 flex items-center justify-center ${isDark ? 'bg-[#030014]' : 'bg-white'}`}><div className="w-2 h-2 bg-purple-500 rounded-full"></div></div>
                <div className="md:w-5/12 mb-4 md:mb-0 order-2 pl-16 md:pl-8 text-left">
                   <TiltCard isDark={isDark} className={`p-6 border-l-4 border-l-purple-500 ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                     <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Higher Secondary (Class XII)</h3>
                     <p className="text-purple-500 text-sm mb-1">Tamil Nadu State Board</p>
                     <div className="flex gap-2 mt-3"><Badge className="bg-purple-500/20 text-purple-600">89%</Badge><span className="text-xs self-center opacity-70">2023</span></div>
                   </TiltCard>
                </div>
             </RevealOnScroll>

             <RevealOnScroll className="relative md:flex justify-between items-center group">
                <div className="md:w-5/12 mb-4 md:mb-0 md:text-right order-1 pr-8 pl-16 md:pl-0">
                   <TiltCard isDark={isDark} className={`p-6 border-l-4 border-l-green-500 ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                     <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Secondary (Class X)</h3>
                     <p className="text-green-500 text-sm mb-1">Tamil Nadu State Board</p>
                     <div className="flex gap-2 mt-3 md:justify-end"><Badge className="bg-green-500/20 text-green-600">80%</Badge><span className="text-xs self-center opacity-70">2021</span></div>
                   </TiltCard>
                </div>
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-green-500 rounded-full z-10 flex items-center justify-center ${isDark ? 'bg-[#030014]' : 'bg-white'}`}><div className="w-2 h-2 bg-green-500 rounded-full"></div></div>
                <div className="md:w-5/12 order-2"></div>
             </RevealOnScroll>
           </div>
         </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Experience" subtitle="My professional journey" isDark={isDark} />
          <div className="space-y-8 relative pl-8 border-l-2 border-gray-700/50 ml-4 md:ml-0 md:border-l-0 md:pl-0">
             <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>

             {experienceData.map((exp, idx) => (
               <RevealOnScroll key={idx} className={`relative md:flex justify-between items-center group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-[45%] mb-8 md:mb-0">
                     <TiltCard isDark={isDark} className={`p-6 ${exp.color} ${isDark ? 'bg-[#0a0a16]' : 'bg-white'}`}>
                       <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.title}</h3>
                       <p className="text-cyan-500 font-medium text-sm mb-1">{exp.company}</p>
                       <p className="text-xs text-muted-foreground mb-4">{exp.duration}</p>
                       <ul className="list-disc pl-4 space-y-2 text-sm opacity-80 mb-4">
                         {exp.description.map((item, i) => (
                           <li key={i}>{item}</li>
                         ))}
                       </ul>
                       <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t, i) => (
                                <Badge key={i} className={`text-[10px] border ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                                    {t}
                                </Badge>
                            ))}
                       </div>
                     </TiltCard>
                  </div>
                  <div className={`absolute left-[-37px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 ${isDark ? 'bg-gray-900 border-cyan-500' : 'bg-white border-cyan-500'} z-10`}></div>
                  <div className="md:w-[45%]"></div>
               </RevealOnScroll>
             ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Technical Skills" subtitle="Powered by continuous learning and hands-on experience" isDark={isDark} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {skillsData.map((skill, idx) => (
              <RevealOnScroll key={idx} className="h-full">
                <TiltCard isDark={isDark} className={`relative overflow-hidden h-full p-6 border ${isDark ? 'bg-[#0a0a16] border-[#1f1f3a]' : 'bg-white border-gray-200 shadow-lg'}`}>
                  <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br ${skill.color.grad} opacity-10 rounded-full blur-xl`}></div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className={`p-3 rounded-xl bg-opacity-10 ${skill.color.bg} ${skill.color.text} border border-white/5`}>
                       <skill.icon size={24} />
                    </div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{skill.title}</h3>
                  </div>
                  <div className={`w-full h-2 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <div className={`h-full rounded-full bg-gradient-to-r ${skill.color.grad}`} style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     <Badge className={isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}>{skill.projects} Proj</Badge>
                     <Badge className={isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}>{skill.certs} Certs</Badge>
                     <Badge className={isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}>{skill.exp}</Badge>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

          <div className="h-[400px] w-full max-w-3xl mx-auto mb-20 relative">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke={isDark ? "#1e293b" : "#e2e8f0"} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <SectionTitle title="Soft Skills" isDark={isDark} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {softSkills.map((s, i) => (
               <TiltCard key={i} isDark={isDark} className={`flex flex-col items-center justify-center gap-3 p-6 hover:border-cyan-500/50 ${isDark ? 'bg-[#0a0a16]' : 'bg-white shadow-md'}`}>
                 <div className={`p-3 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}><s.icon className="text-cyan-500" size={24} /></div>
                 <span className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{s.name}</span>
               </TiltCard>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className={`py-20 px-6 relative ${isDark ? 'bg-[#050515]/50' : 'bg-gray-100/50'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Featured Projects" subtitle="Showcasing my work in deep learning, data analytics, and software development" isDark={isDark} />

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projectsData.map((project, idx) => (
              <RevealOnScroll key={idx}>
                <TiltCard isDark={isDark} className={`flex flex-col h-full border-t-4 border-t-transparent hover:border-t-cyan-500 overflow-hidden group p-0 ${isDark ? 'bg-[#0a0a16]' : 'bg-white shadow-xl'}`}>
                  <div className={`h-48 w-full bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                     <project.icon size={56} className="text-white/90 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold tracking-wider text-cyan-500 uppercase px-2 py-1 bg-cyan-500/10 rounded">{project.category}</span>
                     </div>
                     <h3 className={`text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                     <div className="flex items-center gap-2 text-sm text-cyan-600 mb-4">
                        <Zap size={14} /> <span>{project.metrics}</span>
                     </div>
                     <p className={`text-sm mb-6 flex-grow leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                     <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t, i) => <span key={i} className={`px-2 py-1 text-xs rounded border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>{t}</span>)}
                     </div>
                     <button 
                        onClick={() => setSelectedProject(project)}
                        className={`w-full py-2.5 rounded-lg border font-medium transition-colors flex items-center justify-center gap-2 ${isDark ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white' : 'border-cyan-600 text-cyan-700 hover:bg-cyan-50'}`}
                      >
                       View Details <ExternalLink size={16} />
                     </button>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Certifications" subtitle="Committed to continuous professional development" isDark={isDark} />
          <div className="grid md:grid-cols-2 gap-4">
            {certificationsData.map((cert, idx) => (
              <RevealOnScroll key={idx}>
                <TiltCard isDark={isDark} className={`flex items-center gap-4 p-5 hover:border-cyan-500/30 group transition-all ${isDark ? 'bg-[#0a0a16]' : 'bg-white shadow-md'}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform">
                    <Award size={24} />
                  </div>
                  <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{cert}</span>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me */}
      <section className={`py-20 px-6 bg-gradient-to-b ${isDark ? 'from-[#030014] to-[#0a0a25]' : 'from-gray-50 to-white'}`}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Why Hire Me?" subtitle="What makes me stand out as your next team member" isDark={isDark} />
          <div className="grid md:grid-cols-2 gap-6">
            <TiltCard isDark={isDark} className={`flex gap-5 p-6 border-none ${isDark ? 'bg-[#0c0c24]' : 'bg-white shadow-lg'}`}>
              <div className="p-3 bg-cyan-500/10 rounded-xl h-fit"><Brain className="text-cyan-500" size={32} /></div>
              <div><h3 className="text-xl font-bold text-cyan-500 mb-2">Strong Analytical Mind</h3><p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>I excel at transforming complex data into actionable insights. My projects demonstrate my ability to tackle challenging problems with ML and deep learning solutions.</p></div>
            </TiltCard>
            <TiltCard isDark={isDark} className={`flex gap-5 p-6 border-none ${isDark ? 'bg-[#0c0c24]' : 'bg-white shadow-lg'}`}>
              <div className="p-3 bg-purple-500/10 rounded-xl h-fit"><Rocket className="text-purple-500" size={32} /></div>
              <div><h3 className="text-xl font-bold text-purple-500 mb-2">Quick Learner & Adaptable</h3><p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>From mastering new technologies to adapting to different project requirements, I thrive in dynamic environments and embrace challenges as opportunities to grow.</p></div>
            </TiltCard>
            <TiltCard isDark={isDark} className={`flex gap-5 p-6 border-none ${isDark ? 'bg-[#0c0c24]' : 'bg-white shadow-lg'}`}>
              <div className="p-3 bg-green-500/10 rounded-xl h-fit"><Users className="text-green-500" size={32} /></div>
              <div><h3 className="text-xl font-bold text-green-500 mb-2">Team Player</h3><p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Collaboration is key to success. I communicate effectively, share knowledge willingly, and contribute positively to team dynamics.</p></div>
            </TiltCard>
            <TiltCard isDark={isDark} className={`flex gap-5 p-6 border-none ${isDark ? 'bg-[#0c0c24]' : 'bg-white shadow-lg'}`}>
              <div className="p-3 bg-red-500/10 rounded-xl h-fit"><Heart className="text-red-500" size={32} /></div>
              <div><h3 className="text-xl font-bold text-red-500 mb-2">Passionate About Impact</h3><p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>I don't just write code or analyze data—I create solutions that solve real problems and drive meaningful outcomes for businesses and users.</p></div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 relative ${isDark ? 'bg-[#020617]' : 'bg-gray-50'}`}>
        {isDark && <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>}
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle title="Let's Connect" subtitle="I'm always open to discussing new opportunities, projects, or collaborations" isDark={isDark} />
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:varunbala2809@gmail.com" className={`p-8 rounded-2xl border flex flex-col items-center gap-4 hover:border-cyan-500 transition-all group ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-lg'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-colors ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}><Mail size={28} /></div>
              <div><h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</h4><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>varunbala2809@gmail.com</p></div>
            </a>
            <a href="tel:+918838193946" className={`p-8 rounded-2xl border flex flex-col items-center gap-4 hover:border-pink-500 transition-all group ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-lg'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors ${isDark ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}><Phone size={28} /></div>
              <div><h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Phone</h4><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+91-8838193946</p></div>
            </a>
            <a href="https://www.linkedin.com/in/varun-s-226513305" target="_blank" rel="noopener noreferrer" className={`p-8 rounded-2xl border flex flex-col items-center gap-4 hover:border-blue-500 transition-all group ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-lg'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}><Linkedin size={28} /></div>
              <div><h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>LinkedIn</h4><p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>View Profile</p></div>
            </a>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl border mb-12 ${isDark ? 'bg-[#0a0a16] border-gray-800' : 'bg-white border-gray-200 shadow-xl'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send Me a Message</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none ${isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>

              {formStatus.message && (
                <div className={`flex items-center gap-3 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  {formStatus.type === 'success' ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <AlertCircle size={20} className="text-red-500" />
                  )}
                  <p className={formStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}>
                    {formStatus.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl hover:shadow-cyan-500/50'}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className={`mt-20 grid grid-cols-3 gap-4 border-t pt-10 ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
             <div className="text-center">
               <h5 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Current Status</h5>
               <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>B.Tech AI & Data Science</p>
               <p className="text-cyan-500 text-xs">CGPA: 8.0</p>
             </div>
             <div className={`text-center border-l border-r ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
               <h5 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Location</h5>
               <div className={`flex items-center justify-center gap-1 font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}><MapPin size={14} className="text-cyan-500" /> Chennai, India</div>
             </div>
             <div className="text-center">
               <h5 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Availability</h5>
               <p className="text-green-500 font-bold text-sm flex items-center justify-center gap-2"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span> Open to Opportunities</p>
             </div>
          </div>
        </div>
        <footer className={`mt-20 text-center border-t pt-8 ${isDark ? 'border-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <p className="text-gray-500 text-sm">© 2025 Varun S. Built with passion for data and technology.</p>
        </footer>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} isDark={isDark} />
      <ChatWidget contextData={PORTFOLIO_CONTEXT} isDark={isDark} />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 left-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${isDark ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/50'}`}
          aria-label="Back to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </div>
  );
}
