"use client";

import { useState } from "react";
import { Wand2, Sparkles, Loader2, Check } from "lucide-react";

interface StepProps {
  data: any;
  update: (data: any) => void;
}

export default function StepAIAssistant({ data, update }: StepProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState(data.goals || "");

  const generateBrief = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulating Claude API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockBrief = `MISSION OBJECTIVES:
1. Capture 360-degree high-res stills of the roof structure.
2. Provide cinematic 4K video of the surrounding landscape for marketing.
3. Identify potential drainage issues or debris in gutters.

FLIGHT PARAMETERS:
- Recommended Altitude: 30m - 50m AGL
- Pattern: Orbit + Grid
- Equipment: Mavic 3 Enterprise or equivalent`;

    update({ goals: prompt, aiBrief: mockBrief });
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-syne font-bold text-white flex items-center gap-3">
          AI Briefing Assistant <Sparkles className="text-accent" size={24} />
        </h2>
        <p className="text-muted text-sm font-inter">Describe your goals in plain English. Claude will generate a professional pilot brief for you.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-inter font-bold text-muted uppercase tracking-wider">What are your goals for this mission?</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. I need to inspect the gutters of a 5-story building and also get some nice shots of the facade for our website..."
            className="input min-h-[120px] py-4"
          />
        </div>

        <button
          onClick={generateBrief}
          disabled={isGenerating || !prompt}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-brand font-syne font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Generating Professional Brief...
            </>
          ) : (
            <>
              <Wand2 size={20} /> Generate Pilot Brief with Claude
            </>
          )}
        </button>

        {data.aiBrief && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-widest">Generated Brief Preview</h3>
              <div className="flex items-center gap-2 text-success text-[0.65rem] font-bold uppercase tracking-wider">
                <Check size={14} /> Ready for Pilot
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 font-mono-dm text-xs text-white/80 leading-relaxed whitespace-pre-wrap">
              {data.aiBrief}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
