"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, MapPin, Award, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function PilotRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    postcode: "",
    caaFlyerId: "",
    caaOperatorId: "",
    dbsConsent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dbsConsent) {
      setError("You must consent to a DBS check to register as a pilot.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=pilot");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden bg-brand py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <span className="font-syne font-bold text-2xl tracking-widest text-accent">ALTITUDE</span>
            <span className="font-mono-dm text-[0.7rem] text-muted tracking-widest mt-2">UK</span>
          </Link>
          <h2 className="text-xl font-syne font-bold text-white uppercase tracking-wider text-center">Join the Pilot Network</h2>
          <p className="text-muted font-inter text-sm mt-2 text-center">Nationwide missions, full ops support, and guaranteed payout.</p>
        </div>

        <div className="glass p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-[0.2em] mb-4">Personal Details</h3>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input pl-12"
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input pl-12"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input pl-12"
                      placeholder="+44 7000 000000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={14} />
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="input pl-10"
                        placeholder="London"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Postcode</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        className="input px-4"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance & Identity */}
              <div className="space-y-4">
                <h3 className="text-xs font-syne font-bold text-accent uppercase tracking-[0.2em] mb-4">CAA Compliance</h3>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">CAA Flyer ID</label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="text"
                      required
                      value={formData.caaFlyerId}
                      onChange={(e) => setFormData({ ...formData, caaFlyerId: e.target.value })}
                      className="input pl-12"
                      placeholder="GBR-RP-XXXXXX"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">CAA Operator ID</label>
                  <div className="relative">
                    <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="text"
                      required
                      value={formData.caaOperatorId}
                      onChange={(e) => setFormData({ ...formData, caaOperatorId: e.target.value })}
                      className="input pl-12"
                      placeholder="GBR-OP-XXXXXX"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-inter font-bold text-muted uppercase tracking-wider ml-1">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input pl-12"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        checked={formData.dbsConsent}
                        onChange={(e) => setFormData({ ...formData, dbsConsent: e.target.checked })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.dbsConsent ? 'bg-accent border-accent' : 'border-white/20 group-hover:border-accent/50'}`}>
                        {formData.dbsConsent && <CheckCircle2 size={12} className="text-brand" />}
                      </div>
                    </div>
                    <span className="text-[0.7rem] leading-relaxed text-muted font-inter">
                      I consent to a basic Disclosure and Barring Service (DBS) check as part of my onboarding process.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-danger text-xs font-medium text-center bg-danger/10 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-accent text-brand font-syne font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-accent/90 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Apply to Join Network <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-muted text-sm font-inter mt-8">
            Already registered?{" "}
            <Link href="/login" className="text-accent font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
