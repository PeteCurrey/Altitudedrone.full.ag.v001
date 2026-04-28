"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden bg-brand">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-syne font-bold text-2xl tracking-widest text-accent">ALTITUDE</span>
            <span className="font-mono-dm text-[0.7rem] text-muted tracking-widest mt-2">UK</span>
          </div>
          <p className="text-muted font-inter text-sm">Drone Network Platform</p>
        </div>

        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-syne font-bold mb-6 text-white text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-12"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-inter font-medium text-muted uppercase tracking-wider">
                  Password
                </label>
                <Link href="#" className="text-[0.7rem] text-accent hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Log In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-muted text-sm font-inter">
              Don't have an account?
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <Link href="/register/client" className="text-xs font-syne font-bold text-accent hover:underline uppercase tracking-wider">
                Client Signup
              </Link>
              <div className="w-1 h-1 rounded-full bg-muted" />
              <Link href="/register/pilot" className="text-xs font-syne font-bold text-accent hover:underline uppercase tracking-wider">
                Pilot Signup
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
