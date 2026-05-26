import React from 'react';
import { ArrowRight, MinusCircle, CheckCircle2, ChevronRight } from 'lucide-react';

const ProblemSolution = () => {
  const comparisonData = [
    {
      problem: "Manual processes are slowing down your engineers and causing human errors.",
      solution: "Automated CI/CD pipelines and AI-driven workflows that deployment 10x faster.",
    },
    {
      problem: "Fragmented systems and legacy tech make it impossible to sync data across teams.",
      solution: "A unified API-first architecture that connects all your tools into one single source of truth.",
    },
    {
      problem: "Your current infrastructure crashes or slows down every time your traffic spikes.",
      solution: "Auto-scaling cloud infrastructure that handles growth effortlessly without manual intervention.",
    }
  ];

  return (
    <section className="w-full bg-white py-24 border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        
        {/* Simple Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-[#31b8c6] text-sm font-black uppercase tracking-widest mb-4">The Digital Shift</p>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
            We fix the tech problems <br /> 
            that hold your business back.
          </h2>
        </div>

        {/* Comparison Header Labels */}
        <div className="hidden lg:grid grid-cols-2 gap-12 mb-8 px-8">
          <div className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm flex items-center gap-2">
            <MinusCircle size={16} /> Current Challenges
          </div>
          <div className="text-[#31b8c6] font-black uppercase tracking-[0.2em] text-sm flex items-center gap-2">
            <CheckCircle2 size={16} /> Our Solution
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-4">
          {comparisonData.map((item, index) => (
            <div 
              key={index} 
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 bg-slate-50 hover:bg-white rounded-[2rem] p-2 lg:p-4 border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              {/* Problem Side */}
              <div className="p-8 lg:p-10 bg-slate-100/50 rounded-2xl lg:rounded-[1.5rem] flex items-center">
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed italic">
                  "{item.problem}"
                </p>
              </div>

              {/* Solution Side */}
              <div className="p-8 lg:p-10 flex items-center justify-between group-hover:bg-[#31b8c6]/5 rounded-[1.5rem] transition-colors">
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                    {item.solution}
                  </p>
                </div>
                <div className="hidden md:flex w-12 h-12 rounded-full bg-[#31b8c6] items-center justify-center text-white ml-6">
                  <ArrowRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Reassurance Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-8 justify-between p-8 bg-slate-900 rounded-[2rem]">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#31b8c6]/20 flex items-center justify-center text-[#31b8c6]">
                <CheckCircle2 size={32} />
            </div>
            <div>
                <h4 className="text-white text-xl font-bold">Stop managing complexity.</h4>
                <p className="text-slate-400">Join 500+ teams that automated their growth.</p>
            </div>
          </div>
          <button className="w-full md:w-auto px-10 py-5 bg-[#31b8c6] text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-[#28a7b4] transition-all group">
            Get a Free Tech Audit 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;