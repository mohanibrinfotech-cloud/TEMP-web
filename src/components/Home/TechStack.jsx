import React from 'react';
import { Layout, Server, Database, Cloud, Shield, Smartphone } from 'lucide-react';

const TechStackRefined = () => {
  const categories = [
    { name: "Frontend", tools: "React, Next.js", icon: <Layout size={24} /> },
    { name: "Backend", tools: "Node.js, NestJS", icon: <Server size={24} /> },
    { name: "Database", tools: "PostgreSQL, Mongo", icon: <Database size={24} /> },
    { name: "Cloud", tools: "AWS, Azure", icon: <Cloud size={24} /> },
    { name: "DevOps", tools: "Docker, CI/CD", icon: <Shield size={24} /> },
    { name: "Mobile", tools: "React Native", icon: <Smartphone size={24} /> }
  ];

  return (
    <section className="w-full bg-white py-24 border-b border-slate-100">
      <div className="w-full px-6 lg:px-16">
        
        {/* --- IMPROVED HEADING --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#31b8c6]"></div>
              <span className="text-[#31b8c6] text-xs font-black uppercase tracking-[0.4em]">Our Stack</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
              ELITE TOOLS FOR <br /> 
              <span className="text-slate-300 ">MODERN SYSTEMS.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-bold text-base max-w-sm mb-2">
            We use industry-standard technologies to ensure your product is scalable and future-proof.
          </p>
        </div>

        {/* --- REFINED 6-COLUMN GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-[#31b8c6]/30 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group cursor-default"
            >
              {/* Larger Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:bg-[#31b8c6] group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                {item.icon}
              </div>

              {/* Larger, Bolder Text */}
              <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">
                {item.name}
              </h3>
              
              <p className="text-sm font-bold text-[#31b8c6] leading-tight">
                {item.tools}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Support Line */}
        <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-30 grayscale contrast-125">
           <span className="font-black text-xl tracking-tighter">TYPESCRIPT</span>
           <span className="font-black text-xl tracking-tighter">KUBERNETES</span>
           <span className="font-black text-xl tracking-tighter">NESTJS</span>
           <span className="font-black text-xl tracking-tighter">TERRAFORM</span>
        </div>

      </div>
    </section>
  );
};

export default TechStackRefined;