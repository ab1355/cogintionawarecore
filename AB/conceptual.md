import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  Briefcase, 
  Music, 
  Rocket, 
  GraduationCap, 
  Layout, 
  Users,
  Database,
  Link as LinkIcon,
  Activity,
  Zap
} from 'lucide-react';

const App = () => {
  const [activeMode, setActiveMode] = useState('Executive'); // Executive, Technical, Creative
  const [hoveredAgent, setHoveredAgent] = useState(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const modes = {
    Executive: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/50', icon: Briefcase, desc: 'Strategic Oversight & ROI Optimization' },
    Technical: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/50', icon: Cpu, desc: 'Infrastructure & System Architecture' },
    Creative: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/50', icon: Music, desc: 'Content Generation & Experience Design' }
  };

  const agents = [
    { id: 'mimi', name: 'CEO Mimi', role: 'Strategic Leadership', icon: ShieldCheck, angle: 0 },
    { id: 'zara', name: 'CTO Zara', role: 'Technical Architecture', icon: Cpu, angle: 72 },
    { id: 'maya', name: 'CFO Maya', role: 'Financial Optimization', icon: BarChart3, angle: 144 },
    { id: 'sage', name: 'CLO Sage', role: 'Legal & Governance', icon: ShieldCheck, angle: 216 },
    { id: 'eduardo', name: 'CAO Eduardo', role: 'Admin Excellence', icon: Users, angle: 288 }
  ];

  const ventures = [
    { name: 'LyricLines', icon: Music, desc: 'AI Creative Content' },
    { name: 'Vision2Results', icon: Rocket, desc: 'Strategic Consulting' },
    { name: 'ModuMind', icon: Layout, desc: 'Agent OS Core' },
    { name: 'Ikidedventures', icon: GraduationCap, desc: 'Edutainment' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-8 overflow-hidden flex flex-col items-center justify-center relative">
      {/* Background Starfield Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animation: `pulse ${2 + Math.random() * 4}s infinite`
            }}
          />
        ))}
      </div>

      {/* Header Info */}
      <div className="z-10 text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          371-OS Universe
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          World's first cognitive-aware autonomous agent operating system.
        </p>
      </div>

      {/* Main Orrery Area */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        
        {/* Outer Ring: Ventures */}
        <div className="absolute inset-0 border border-slate-800 rounded-full animate-[spin_60s_linear_infinite]" />
        {ventures.map((v, i) => (
          <div 
            key={v.name}
            className="absolute w-12 h-12 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:border-blue-400 group cursor-help"
            style={{
              transform: `rotate(${i * 90}deg) translateY(-280px) rotate(-${i * 90}deg)`
            }}
          >
            <v.icon size={20} className="text-slate-400 group-hover:text-blue-400" />
            <div className="absolute top-14 opacity-0 group-hover:opacity-100 bg-slate-800 p-2 rounded text-xs whitespace-nowrap border border-slate-700 pointer-events-none transition-opacity">
              <strong>{v.name}</strong>: {v.desc}
            </div>
          </div>
        ))}

        {/* Middle Ring: C-Suite Agents */}
        <div className="absolute w-[400px] h-[400px] border border-slate-800 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        {agents.map((agent) => (
          <div 
            key={agent.id}
            onMouseEnter={() => setHoveredAgent(agent)}
            onMouseLeave={() => setHoveredAgent(null)}
            className="absolute w-16 h-16 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] z-20"
            style={{
              transform: `rotate(${agent.angle}deg) translateY(-200px) rotate(-${agent.angle}deg)`
            }}
          >
            <agent.icon size={24} className="text-emerald-400 mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-300">{agent.name.split(' ')[1]}</span>
          </div>
        ))}

        {/* Inner Core: Cognitive Interface */}
        <div className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center p-6 text-center transition-all duration-700 z-30 border-2 ${modes[activeMode].border} ${modes[activeMode].bg} shadow-2xl`}>
          <Brain 
            size={48} 
            className={`${modes[activeMode].color} mb-2 transition-all ${pulse ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}`} 
          />
          <div className={`text-xs font-bold uppercase tracking-widest ${modes[activeMode].color} mb-1`}>
            Mode: {activeMode}
          </div>
          <p className="text-[10px] text-slate-300 leading-tight">
            {modes[activeMode].desc}
          </p>
          
          {/* Mode Toggles */}
          <div className="absolute -bottom-16 flex gap-2">
            {Object.keys(modes).map(m => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${activeMode === m ? modes[m].bg + ' ' + modes[m].border + ' ' + modes[m].color : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Infrastructure Layer Labels (Bottom) */}
        <div className="absolute -bottom-32 w-full flex justify-between px-10">
          <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <Zap size={18} className="text-yellow-400" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Cloud Infra</div>
              <div className="text-sm font-mono text-slate-300">Akash Network (97.6% Cost Reduc)</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <LinkIcon size={18} className="text-blue-400" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">Coordination</div>
              <div className="text-sm font-mono text-slate-300">Blockchain DAO Governance</div>
            </div>
          </div>
        </div>

        {/* Agent Info Tooltip (Floating) */}
        {hoveredAgent && (
          <div className="absolute top-0 right-[-240px] w-56 bg-slate-900 border border-emerald-400/50 p-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-left-4">
            <h3 className="text-emerald-400 font-bold mb-1 flex items-center gap-2">
              <hoveredAgent.icon size={16} />
              {hoveredAgent.name}
            </h3>
            <p className="text-xs text-slate-300 font-bold mb-2">{hoveredAgent.role}</p>
            <div className="space-y-1">
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[85%]" />
              </div>
              <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase">
                <span>Optimization</span>
                <span>85%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Connection Lines (Conceptual) */}
      <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-10">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <circle cx="50%" cy="50%" r="100" stroke="url(#line-grad)" fill="none" strokeWidth="1" strokeDasharray="5,5" />
        <circle cx="50%" cy="50%" r="200" stroke="url(#line-grad)" fill="none" strokeWidth="1" strokeDasharray="10,5" />
      </svg>
      
      {/* Wallet Economics Footnote */}
      <div className="mt-40 text-center opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1"><Activity size={10} /> Internal Wallet: 0x371...DAO</span>
          <span className="flex items-center gap-1"><Database size={10} /> Runtime: Bun (v1.2.18)</span>
        </div>
      </div>
    </div>
  );
};

export default App;