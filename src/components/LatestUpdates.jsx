import { useEffect, useState } from "react";
import axios from "axios";

// Maps the action verbs enforced by the improved /api/summarize prompt
// to semantic tag labels and color styles.
const TAG_RULES = [
  {
    // "Shipped", "Launched", "Released", "Deployed"
    keywords: ["ship", "launch", "release", "deploy", "publish"],
    label: "Ship",
    bg: "bg-violet-50 border-violet-200 text-violet-700",
    dot: "bg-violet-400",
  },
  {
    // "Built", "Created", "Implemented", "Developed", "Integrated"
    keywords: ["built", "build", "creat", "implement", "develop", "integrat", "add", "feat"],
    label: "Feat",
    bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
    dot: "bg-emerald-400",
  },
  {
    // "Optimized", "Improved", "Reduced", "Boosted", "Cached"
    keywords: ["optim", "improv", "reduc", "boost", "speed", "cache", "perf", "load"],
    label: "Perf",
    bg: "bg-amber-50 border-amber-200 text-amber-700",
    dot: "bg-amber-400",
  },
  {
    // "Refactored", "Restructured", "Cleaned", "Simplified"
    keywords: ["refactor", "restructur", "clean", "simplif", "reorg", "migrat"],
    label: "Refactor",
    bg: "bg-sky-50 border-sky-200 text-sky-700",
    dot: "bg-sky-400",
  },
  {
    // "Fixed", "Resolved", "Patched", "Debugged"
    keywords: ["fix", "resolv", "patch", "debug", "bug", "repair", "correct"],
    label: "Fix",
    bg: "bg-rose-50 border-rose-200 text-rose-700",
    dot: "bg-rose-400",
  },
  {
    // "Designed", "Styled", "Redesigned", "UI", "Layout", "Theme"
    keywords: ["design", "style", "ui", "layout", "theme", "css", "visual", "redesign"],
    label: "UI",
    bg: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700",
    dot: "bg-fuchsia-400",
  },
  {
    // "Documented", "Wrote", "Updated README"
    keywords: ["doc", "readme", "wrote", "comment", "wiki"],
    label: "Docs",
    bg: "bg-slate-100 border-slate-200 text-slate-600",
    dot: "bg-slate-400",
  },
];

const DEFAULT_TAG = {
  label: "Update",
  bg: "bg-slate-100 border-slate-200 text-slate-600",
  dot: "bg-slate-400",
};

function classifyLine(line) {
  const lower = line.toLowerCase();
  for (const rule of TAG_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return { label: rule.label, bg: rule.bg, dot: rule.dot };
    }
  }
  return DEFAULT_TAG;
}

function getParsedUpdates(summary) {
  if (!summary) return [];
  return summary
    .split(/\n+/)
    // Strip bullet chars: •, -, *, numbered lists, and leading/trailing whitespace
    .map((line) => line.replace(/^[•\-\*]\s*|^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 10) // skip empty or trivially short lines
    .map((line) => ({ text: line, type: classifyLine(line) }));
}

export default function LatestUpdatesSection() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      setError(false);

      const { data } = await axios.get("/api/github");
      const result = await axios.post("/api/summarize", {
        commits: data.commits,
      });

      setSummary(result.data.summary);
      setLastFetched(new Date());
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const updates = getParsedUpdates(summary);

  const timeAgo = lastFetched
    ? `${Math.floor((Date.now() - lastFetched) / 60000) || "<1"} min ago`
    : null;

  return (
    <section className="w-full bg-slate-50 border-t border-b border-slate-200/70 py-16 sm:py-24 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider text-indigo-700 uppercase">
              Live Build Feed
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Latest GitHub Updates
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              AI-summarized commit activity pulled directly from the repository.
              Each entry is classified by type and condensed into clear,
              impact-focused lines.
            </p>

            {/* Meta tags */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs">
                Branch: <span className="text-slate-900 font-bold ml-1">master</span>
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs">
                Status:{" "}
                <span className={`font-bold ml-1 ${error ? "text-rose-500" : "text-emerald-600"}`}>
                  {error ? "Error" : "Synced"}
                </span>
              </span>
              {timeAgo && (
                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500 shadow-xs">
                  Updated {timeAgo}
                </span>
              )}
            </div>

            {/* Tag legend */}
            {!loading && !error && updates.length > 0 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Tag Legend
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[...new Map(updates.map((u) => [u.type.label, u.type])).values()].map(
                    (type) => (
                      <span
                        key={type.label}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${type.bg}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${type.dot}`} />
                        {type.label}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-8 w-full">
            <div className="w-full rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">

              {/* Header bar */}
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                  Repository Operations Log
                </span>
                <div className="flex items-center gap-2">
                  {/* Retry button */}
                  {error && (
                    <button
                      onClick={fetchUpdates}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Retry
                    </button>
                  )}
                  {/* Live indicator */}
                  <div className="flex h-2 w-2 relative">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        error ? "bg-rose-400" : "bg-emerald-400"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        error ? "bg-rose-500" : "bg-emerald-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Feed body */}
              <div className="p-6">
                {loading ? (
                  <div className="space-y-5 animate-pulse">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="flex gap-x-4 items-center p-3 border-b border-slate-50 last:border-none"
                      >
                        <div className="h-5 w-16 bg-slate-200 rounded-md shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-200 rounded w-11/12" />
                          <div className="h-3 bg-slate-100 rounded w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-sm font-semibold text-rose-500">
                      Failed to fetch recent changes
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Check API keys or environment connection settings.
                    </p>
                  </div>
                ) : updates.length === 0 ? (
                  <div className="text-center py-12 text-sm text-slate-500">
                    No recent commits found on this repository.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 -mx-2">
                    {updates.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-x-4 items-start p-4 hover:bg-slate-50/70 rounded-xl transition-all duration-150 group"
                      >
                        {/* Tag badge */}
                        <span
                          className={`inline-flex shrink-0 items-center justify-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border min-w-[64px] text-center ${item.type.bg}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${item.type.dot}`} />
                          {item.type.label}
                        </span>

                        {/* Commit summary text */}
                        <p className="text-sm text-slate-600 leading-relaxed font-medium group-hover:text-slate-900 transition-colors pt-0.5 flex-1">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer strip */}
              {!loading && !error && updates.length > 0 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-x-1.5">
                    <svg
                      className="h-3.5 w-3.5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>AI Summary · Automated Integration Active</span>
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