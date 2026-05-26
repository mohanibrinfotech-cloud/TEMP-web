import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestUpdatesSection() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        setError(false);

        const { data } = await axios.get("/api/github");
        const result = await axios.post("/api/summarize", {
          commits: data.commits,
        });

        setSummary(result.data.summary);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Parses text lines into clean objects with semantic tag indicators
  const getParsedUpdates = () => {
    if (!summary) return [];
    return summary
      .split(/\n+/)
      .map(line => line.replace(/^-\s*|^\*\s*|^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0)
      .map(line => {
        let type = { label: "Update", bg: "bg-slate-100 text-slate-700 border-slate-200" };
        const lowerLine = line.toLowerCase();
        
        if (lowerLine.includes("fix") || lowerLine.includes("bug")) {
          type = { label: "Fix", bg: "bg-rose-50 border-rose-100 text-rose-700" };
        } else if (lowerLine.includes("add") || lowerLine.includes("feat") || lowerLine.includes("create")) {
          type = { label: "Feat", bg: "bg-emerald-50 border-emerald-100 text-emerald-700" };
        } else if (lowerLine.includes("ui") || lowerLine.includes("style") || lowerLine.includes("css")) {
          type = { label: "UI", bg: "bg-indigo-50 border-indigo-100 text-indigo-700" };
        } else if (lowerLine.includes("docs") || lowerLine.includes("readme")) {
          type = { label: "Docs", bg: "bg-amber-50 border-amber-100 text-amber-700" };
        }

        return { text: line, type };
      });
  };

  const updates = getParsedUpdates();

  return (
    <section className="w-full bg-slate-50 border-t border-b border-slate-200/70 py-16 sm:py-24 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-Width Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Section Title & Context Info (Spans 4 of 12 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-indigo-700 uppercase">
              Live Build Feed
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Latest GitHub Updates
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Tracking core project adjustments in real-time. This dynamic timeline hooks directly into the repository version logs to compile change streams automatically.
            </p>

            {/* Meta tags stack */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs">
                Branch: <span className="text-slate-900 font-bold ml-1">master</span>
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs">
                Status: <span className="text-emerald-600 font-bold ml-1">Synced</span>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Expansive Changelog Stream Dashboard (Spans 8 of 12 columns) */}
          <div className="lg:col-span-8 w-full">
            <div className="w-full rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
              
              {/* Box Top Header Bar */}
              <div className="px-6 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">Repository Operations Log</span>
                <div className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
              </div>

              {/* Feed Execution Container */}
              <div className="p-6">
                {loading ? (
                  /* HIGH-FIDELITY FULL-WIDTH SKELETON LOADER */
                  <div className="space-y-5 animate-pulse">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="flex gap-x-4 items-center p-3 border-b border-slate-50 last:border-none">
                        <div className="h-5 w-14 bg-slate-200 rounded-md shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-200 rounded w-11/12"></div>
                          <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-sm font-semibold text-rose-500">Failed to fetch recent changes</p>
                    <p className="text-xs text-slate-400 mt-1">Check database hooks or environment connection keys.</p>
                  </div>
                ) : updates.length === 0 ? (
                  <div className="text-center py-12 text-sm text-slate-500">
                    No recent commits tracked on this repository index.
                  </div>
                ) : (
                  /* FULL-WIDTH DATA LOG STREAM */
                  <div className="divide-y divide-slate-100 -mx-2">
                    {updates.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex gap-x-4 items-start p-4 hover:bg-slate-50/70 rounded-xl transition-all duration-150 group"
                      >
                        {/* Status Label Box */}
                        <span className={`inline-flex shrink-0 items-center justify-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border w-14 text-center ${item.type.bg}`}>
                          {item.type.label}
                        </span>
                        
                        {/* Dynamic Clean String Context */}
                        <p className="text-sm text-slate-600 leading-relaxed font-medium group-hover:text-slate-900 transition-colors pt-0.5 flex-1">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Box Bottom Information Summary Strip */}
              {!loading && !error && updates.length > 0 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-x-1.5">
                    <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Automated Integration Active</span>
                  </div>
                  <span>{updates.length} items parsed</span>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}