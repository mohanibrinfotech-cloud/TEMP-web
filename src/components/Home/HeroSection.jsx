import React from "react";
import { ArrowUpRight, Zap, Shield, Globe, Cpu, Play } from "lucide-react";
import Navbar from "./Navbar";

const FullScaleHero = () => {
  return (
    <>
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-white">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
            alt="Modern bright office"
            className="w-full h-full object-cover"
          />
          {/* Light Gradient Overlay: White on left, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20"></div>
        </div>

        <div className="relative z-10 w-full px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* LEFT: Massive Text Content */}
            <div className="lg:col-span-8 lg:p-18">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#31b8c6]/10 border border-[#31b8c6]/20 text-[#31b8c6] text-xs font-bold tracking-[0.2em] uppercase mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#31b8c6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#31b8c6]"></span>
                </span>
                Digital Intelligence v4.0
              </div>

              <h1 className="text-[12vw] lg:text-[8vw] font-black text-slate-900 leading-[0.85] tracking-tighter mb-10">
                BUILDING <br />
                <span className="text-[#31b8c6]">BEYOND.</span>
              </h1>

              <div className="flex flex-col md:flex-row gap-10 items-start">
                <p className="text-xl md:text-2xl text-slate-600 max-w-md font-medium leading-snug">
                  The software architecture powering the next generation of
                  high-growth tech companies.
                </p>

                <div className="flex flex-col gap-4">
                  <button className="h-16 px-10 bg-[#31b8c6] hover:bg-slate-900 text-white text-xl font-bold rounded-2xl transition-all duration-300 flex items-center gap-4 shadow-2xl shadow-[#31b8c6]/40 group">
                    Start Project{" "}
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button className="flex items-center gap-3 text-slate-900 font-bold hover:text-[#31b8c6] transition-colors ml-2">
                    <span className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center">
                      <Play size={16} fill="currentColor" />
                    </span>
                    Watch Showreel
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Modern Floating Grid Content */}
            <div className="lg:col-span-4 relative mt-16 lg:mt-0">
              <div className="grid grid-cols-1 gap-6">
                {/* Feature Card 1 */}
                <div className="bg-white/60 backdrop-blur-xl border border-gray-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:scale-105 transition-transform duration-500">
                  <div className="w-14 h-14 bg-[#31b8c6] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#31b8c6]/30">
                    <Cpu size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Edge Computing
                  </h3>
                  <p className="text-slate-500 font-medium">
                    Ultra-low latency infrastructure for real-time data
                    processing.
                  </p>
                </div>

                {/* Feature Card 2 - Visual Link */}
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl group cursor-pointer overflow-hidden relative">
                  <div className="relative z-10">
                    <Globe className="text-[#31b8c6] mb-6" size={40} />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Global Scale
                    </h3>
                    <div className="flex items-center gap-2 text-[#31b8c6] font-bold text-sm uppercase tracking-widest">
                      Explore Nodes <ArrowUpRight size={16} />
                    </div>
                  </div>
                  {/* Decorative circle in card */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#31b8c6]/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Massive Footer Label (fills bottom empty space) */}
          <div className="mt-24 pt-8 border-t border-slate-200 flex flex-wrap justify-between items-end gap-8">
            <div className="flex gap-16">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                  Protocol
                </p>
                <p className="text-xl font-bold text-slate-900">End-to-End</p>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                  Availability
                </p>
                <p className="text-xl font-bold text-slate-900">99.99% SLI</p>
              </div>
            </div>
            <div className="text-slate-300 font-black text-6xl hidden xl:block select-none">
              2025 // EDITION
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
            Scroll
          </span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#31b8c6] to-transparent rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-move"></div>
          </div>
        </div>

        {/* Add this to your Tailwind Config or inside a <style> tag */}
        <style jsx>{`
          @keyframes scroll-move {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(200%);
            }
          }
          .animate-scroll-move {
            animation: scroll-move 2s infinite ease-in-out;
          }
        `}</style>
      </section>
    </>
  );
};

export default FullScaleHero;
