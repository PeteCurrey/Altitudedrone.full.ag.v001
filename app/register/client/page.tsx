"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, Building, Phone, ArrowRight, Loader2 } from "lucide-react";

export default function ClientRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true");
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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <span className="font-syne font-bold text-2xl tracking-widest text-accent">ALTITUDE</span>
            <span className="font-mono-dm text-[0.7rem] text-muted tracking-widest mt-2">UK</span>
          </Link>
          <h2 className="text-xl font-syne font-bold text-white uppercase tracking-wider">Client Registration</h2>
        </div>

        <div className="glass p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider ml-1">Contact Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input pl-12"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider ml-1">Company Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="input pl-12"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input pl-12"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider ml-1">Phone Number</label>
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

            <div className="space-y-2">
              <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider ml-1">Password</label>
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

            {error && (
              <div className="text-danger text-xs font-medium text-center bg-danger/10 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-accent text-brand font-syne font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-accent/90 disabled:opacity-50 mt-6"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Register Company <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-muted text-sm font-inter mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-accent font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
