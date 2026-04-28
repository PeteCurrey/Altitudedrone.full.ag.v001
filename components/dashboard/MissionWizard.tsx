"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Wand2, MapPin, ClipboardList, Package, Send } from "lucide-react";
import StepBasics from "./steps/StepBasics";
import StepLocation from "./steps/StepLocation";
import StepRequirements from "./steps/StepRequirements";
import StepAIAssistant from "./steps/StepAIAssistant";
import StepReview from "./steps/StepReview";

const STEPS = [
  { id: "basics", label: "Basics", icon: ClipboardList },
  { id: "location", label: "Location", icon: MapPin },
  { id: "requirements", label: "Requirements", icon: Package },
  { id: "ai", label: "AI Briefing", icon: Wand2 },
  { id: "review", label: "Review", icon: Check },
];

export default function MissionWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    category: "Real Estate",
    date: "",
    location: {
      address: "",
      postcode: "",
      coords: null as [number, number] | null,
    },
    deliverables: [] as string[],
    goals: "",
    aiBrief: "",
  });

  // Persist form data to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("altitude_mission_draft");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load draft");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("altitude_mission_draft", JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepBasics data={formData} update={(d) => setFormData({ ...formData, ...d })} />;
      case 1: return <StepLocation data={formData} update={(d) => setFormData({ ...formData, ...d })} />;
      case 2: return <StepRequirements data={formData} update={(d) => setFormData({ ...formData, ...d })} />;
      case 3: return <StepAIAssistant data={formData} update={(d) => setFormData({ ...formData, ...d })} />;
      case 4: return <StepReview data={formData} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative mb-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0" />
          {STEPS.map((step, i) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  i <= currentStep ? "bg-accent text-brand" : "bg-surface-dark border border-white/10 text-muted"
                }`}
              >
                <step.icon size={18} />
              </div>
              <span className={`text-[0.65rem] font-syne font-bold uppercase tracking-widest ${i <= currentStep ? "text-accent" : "text-muted"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content Wrapper */}
      <div className="card p-8 md:p-12 min-h-[500px] flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Actions */}
        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors disabled:opacity-0"
          >
            <ChevronLeft size={20} /> <span className="font-syne font-bold uppercase tracking-wider text-sm">Back</span>
          </button>

          {currentStep === STEPS.length - 1 ? (
            <button className="bg-accent text-brand font-syne font-bold px-10 py-4 rounded-xl flex items-center gap-2 transition-all hover:bg-accent/90 hover:scale-105">
              Submit Mission Brief <Send size={18} />
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="bg-white/5 border border-white/10 text-white font-syne font-bold px-10 py-4 rounded-xl flex items-center gap-2 transition-all hover:bg-white/10"
            >
              Next Step <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
