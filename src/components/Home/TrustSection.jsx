import React from 'react';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';

const TrustSection = () => {
  const logos = ["TECHFLOW", "QUANTUM", "NEXUS", "VELOCITY", "APEX", "SYNERGY", "PRISM", "ORBIT", "FLUX", "MATRIX"];
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full bg-white py-24 border-b border-slate-100 overflow-hidden">
      <div className="w-full px-6 lg:px-16">
        
        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-2">
          
          {/* LEFT: Text is now more horizontal to fill the width naturally */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#31b8c6]"></div>
              <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">Market Leadership</span>
            </div>
            
            {/* Reduced line breaks so the text stretches horizontally */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              TRUSTED BY THE <span className="text-slate-300">WORLD'S BEST</span> <br className="hidden lg:block" />
              ENGINEERING <span className="text-[#31b8c6]">TEAMS globally.</span>
            </h2>
            
            {/* <p className="mt-6 text-slate-500 font-medium max-w-xl">
              Powering the infrastructure of next-generation startups and established enterprises with unshakeable reliability.
            </p> */}
          </div>

          {/* RIGHT: Badges stay compact but aligned to the end */}
          <div className="lg:flex flex-1 gap-3 min-w-fit">
            {[
              { icon: <ShieldCheck size={20} />, text: "SOC2 Type II Certified" },
              { icon: <Lock size={20} />, text: "GDPR Data Protection" },
              { icon: <CheckCircle size={20} />, text: "ISO 27001 Infrastructure" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-4 lg:p-8  p-4   bg-slate-50 rounded-2xl border border-gray-200 min-w-[380px] mt-4">
                <span className="text-[#31b8c6]">{badge.icon}</span>
                <span className=" font-black text-slate-700 uppercase tracking-tight">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee remains as the full-width visual anchor */}
        <div className="relative w-full pt-10">
          <div className="flex whitespace-nowrap animate-marquee-slow opacity-30">
            {repeatedLogos.map((logo, index) => (
              <div key={index} className="flex items-center px-16">
                <span className="text-5xl md:text-7xl font-black text-slate-200 uppercase tracking-tighter">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: fit-content;
          animation: marquee-slow 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustSection;