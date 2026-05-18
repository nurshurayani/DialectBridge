/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  Library, 
  Users, 
  User, 
  CheckCircle, 
  Flame, 
  Trophy, 
  Volume2, 
  MessageSquare,
  ArrowRight,
  Plus,
  ArrowUp,
  MapPin,
  X,
  PlayCircle,
  BarChart
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { LESSONS, Lesson } from "./constants";
import { Toaster, toast } from "react-hot-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { supabase, isSupabaseConfigured } from "./lib/supabase";

type Screen = "auth" | "home" | "explorer" | "lesson" | "community" | "profile" | "unconfigured";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(isSupabaseConfigured ? "auth" : "unconfigured");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [session, setSession] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Backup timeout for loading state
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 5000);

    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Auth session error:", error);
        setAuthError(error.message);
        setLoading(false);
        return;
      }
      
      setSession(session);
      if (session) {
        fetchUserData(session.user.id);
        fetchCommunityData();
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.error("Auth check failed:", err);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserData(session.user.id);
        setCurrentScreen("home");
      } else {
        setUserData(null);
        setCurrentScreen("auth");
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function fetchUserData(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        const newProfile = {
          id: userId,
          dialect: "Kadazan",
          xp: 0,
          streak: 1,
          phrases_learned: 0,
          lessons_completed: 0,
          activity: [
            { day: "Mon", count: 0 },
            { day: "Tue", count: 0 },
            { day: "Wed", count: 0 },
            { day: "Thu", count: 0 },
            { day: "Fri", count: 0 },
            { day: "Sat", count: 0 },
            { day: "Sun", count: 0 },
          ],
          achievements: [
            { id: "1", name: "First Steps", icon: "CheckCircle", description: "Joined the bridge" }
          ]
        };
        const { data: created, error: createError } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();
        
        if (createError) throw createError;
        setUserData(created);
      } else if (error) {
        throw error;
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCommunityData() {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunityPosts(data || []);
    } catch (error) {
      console.error("Failed to fetch community data:", error);
    }
  }

  const handleStartLesson = (lesson: Lesson) => {
    if (lesson.phrases.length === 0) {
      toast.error("This lesson is coming soon!");
      return;
    }
    setActiveLesson(lesson);
    setCurrentScreen("lesson");
  };

  const handleLessonComplete = async () => {
    if (!userData || !session) return;
    
    try {
      const updatedXp = (userData.xp || 0) + 50;
      const updatedLessons = (userData.lessons_completed || 0) + 1;
      const updatedPhrases = (userData.phrases_learned || 0) + 8;
      
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          xp: updatedXp, 
          lessons_completed: updatedLessons, 
          phrases_learned: updatedPhrases 
        })
        .eq('id', session.user.id)
        .select()
        .single();

      if (error) throw error;
      setUserData(data);
      toast.success("Progress Saved to Supabase! +50 XP");
      setCurrentScreen("home");
    } catch (error) {
      toast.error("Failed to save progress to cloud");
    }
  };

  const handleNewPost = async (postData: any) => {
    if (!session) return;
    
    try {
      const newPost = {
        phrase: postData.phrase,
        meaning: postData.meaning,
        dialect: postData.dialect,
        origin: postData.origin,
        note: postData.note,
        user_id: session.user.id,
        name: session.user.email?.split('@')[0] || "Sabahan Spirit",
        upvotes: 0
      };

      const { data, error } = await supabase
        .from('community_posts')
        .insert([newPost])
        .select()
        .single();

      if (error) throw error;
      setCommunityPosts([data, ...communityPosts]);
      toast.success("Phrase preserved in the community cloud!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to share phrase");
    }
  };

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-brand-warm-white p-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="text-brand-green"
        >
          <Volume2 size={60} />
        </motion.div>
        <div className="space-y-2">
          <p className="text-xl font-black text-brand-green uppercase tracking-[0.2em] leading-none">DialectBridge</p>
          <p className="text-xs font-bold text-deep-forest/40 uppercase tracking-widest animate-pulse">Syncing with Heritage Cloud...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-warm-white flex flex-col">
      <Toaster position="top-center" />
      
      {authError && (
        <div className="bg-red-500 text-white p-2 text-center text-xs font-bold">
          Auth System Error: {authError}. Check your Supabase configuration.
        </div>
      )}
      {/* Top Navigation Bar */}
      {currentScreen !== "lesson" && currentScreen !== "auth" && currentScreen !== "unconfigured" && (
        <nav className="h-16 w-full px-4 md:px-8 flex items-center justify-between border-b border-brand-green/10 bg-white z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full pattern-bg flex items-center justify-center text-white font-bold">DB</div>
            <h1 className="text-xl font-bold tracking-tight text-brand-green hidden sm:block">DialectBridge</h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-soft-green px-4 py-1.5 rounded-full">
              <span className="text-lg">🔥</span>
              <span className="font-bold text-brand-green text-sm md:text-base">{userData?.streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-semibold uppercase opacity-60 tracking-wider">Level {Math.floor((userData?.xp || 0) / 100)}</p>
                <p className="text-sm font-bold text-deep-forest">{userData?.dialect} Soul</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-brand-green overflow-hidden flex items-center justify-center bg-accent-sand transition-transform hover:scale-110">
                <User className="text-white" size={20} />
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Navigation (Desktop) */}
        {currentScreen !== "lesson" && currentScreen !== "auth" && currentScreen !== "unconfigured" && (
          <aside className="w-64 border-r border-brand-green/10 hidden md:flex flex-col py-8 px-4 bg-white/50 overflow-y-auto">
            <div className="space-y-2 mb-8">
              <SidebarLink 
                icon="🏠" 
                label="Home Hub" 
                active={currentScreen === "home"} 
                onClick={() => setCurrentScreen("home")} 
              />
              <SidebarLink 
                icon="🧭" 
                label="Lesson Explorer" 
                active={currentScreen === "explorer"} 
                onClick={() => setCurrentScreen("explorer")} 
              />
              <SidebarLink 
                icon="💬" 
                label="Community Wall" 
                active={currentScreen === "community"} 
                onClick={() => setCurrentScreen("community")} 
              />
              <SidebarLink 
                icon="👤" 
                label="My Profile" 
                active={currentScreen === "profile"} 
                onClick={() => setCurrentScreen("profile")} 
              />
            </div>

            <div className="mt-auto">
              <div className="p-5 rounded-3xl bg-accent-sand/10 border border-accent-sand/20 shadow-inner">
                <p className="text-[10px] font-bold text-accent-brown mb-2 uppercase tracking-widest leading-none">Current Dialect</p>
                <p className="font-black text-deep-forest text-lg leading-tight">{userData?.dialect}</p>
                <button className="mt-4 text-[10px] font-bold text-brand-green underline hover:text-deep-forest transition-colors uppercase tracking-widest">Change Dialect</button>
              </div>
            </div>
          </aside>
        )}

        {/* Bottom Navigation (Mobile) */}
        {currentScreen !== "lesson" && currentScreen !== "auth" && currentScreen !== "unconfigured" && (
          <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-brand-green/10 flex justify-around items-center md:hidden z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
            <NavButton icon={<Home />} active={currentScreen === "home"} onClick={() => setCurrentScreen("home")} />
            <NavButton icon={<Library />} active={currentScreen === "explorer"} onClick={() => setCurrentScreen("explorer")} />
            <NavButton icon={<Users />} active={currentScreen === "community"} onClick={() => setCurrentScreen("community")} />
            <NavButton icon={<User />} active={currentScreen === "profile"} onClick={() => setCurrentScreen("profile")} />
          </nav>
        )}

        <main className={cn(
          "flex-1 overflow-y-auto",
          currentScreen === "lesson" ? "" : "p-4 md:p-10"
        )}>
          <div className={cn(
            "mx-auto w-full h-full",
            currentScreen === "lesson" ? "" : "max-w-5xl"
          )}>
            <AnimatePresence mode="wait">
              {currentScreen === "unconfigured" && (
                <UnconfiguredScreen key="unconfigured" />
              )}
              {currentScreen === "auth" && (
                <AuthScreen key="auth" />
              )}
              {currentScreen === "home" && (
                <HomeScreen 
                  key="home" 
                  user={userData} 
                  onContinue={() => setCurrentScreen("explorer")} 
                />
              )}
              {currentScreen === "explorer" && (
                <ExplorerScreen 
                  key="explorer" 
                  onStartLesson={handleStartLesson} 
                />
              )}
              {currentScreen === "community" && (
                <CommunityScreen 
                  key="community" 
                  posts={communityPosts} 
                  onNewPost={handleNewPost}
                />
              )}
              {currentScreen === "profile" && (
                <ProfileScreen 
                  key="profile" 
                  user={userData} 
                />
              )}
              {currentScreen === "lesson" && activeLesson && (
                <LessonScreen 
                  key="lesson" 
                  lesson={activeLesson} 
                  onComplete={handleLessonComplete}
                  onExit={() => setCurrentScreen("explorer")}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Decorative Bottom Line (Global) */}
      {currentScreen !== "lesson" && currentScreen !== "unconfigured" && (
        <div className="h-2 w-full woven-border opacity-20 sticky bottom-0"></div>
      )}
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: string, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300",
        active 
          ? "bg-brand-green text-white font-bold shadow-xl shadow-brand-green/20 scale-[1.02]" 
          : "text-brand-green hover:bg-soft-green font-semibold"
      )}
    >
      <span className="text-xl">{icon}</span> {label}
    </button>
  );
}

function NavButton({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-xl transition-all duration-300",
        active ? "bg-brand-green text-white shadow-lg" : "text-brand-green/40 hover:bg-brand-green/5"
      )}
    >
      {icon}
    </button>
  );
}

function UnconfiguredScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-warm-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white p-12 rounded-[3.5rem] shadow-2xl border-4 border-accent-sand/20 text-center space-y-8"
      >
        <div className="w-24 h-24 bg-accent-sand/10 rounded-[2.5rem] flex items-center justify-center text-accent-brown mx-auto shadow-inner">
          <Library size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-brand-green tracking-tight leading-none">Database Setup Required</h2>
          <p className="text-deep-forest/60 font-bold italic text-lg">"The bridge cannot hold without its foundation."</p>
        </div>
        <div className="bg-soft-green/50 p-8 rounded-[2rem] border border-brand-green/10 text-left space-y-4">
          <p className="font-bold text-brand-green">To enable cloud synchronization and community features, update your project settings:</p>
          <ol className="list-decimal list-inside text-sm font-bold text-deep-forest/70 space-y-2">
            <li>Go to <span className="text-brand-green">Settings</span> in AI Studio</li>
            <li>Add <code className="bg-white px-2 py-1 rounded">VITE_SUPABASE_URL</code></li>
            <li>Add <code className="bg-white px-2 py-1 rounded">VITE_SUPABASE_ANON_KEY</code></li>
            <li>Refresh the application</li>
          </ol>
        </div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Connect to Supabase to save your heritage progress.</p>
      </motion.div>
    </div>
  );
}

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Welcome! Check your email for verification.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back, seeker.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-warm-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 rounded-[3.5rem] shadow-2xl border border-brand-green/10"
      >
        <header className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-black text-brand-green tracking-tight">
            {isSignUp ? "Create Descendant Account" : "Return to Roots"}
          </h2>
          <p className="text-deep-forest/50 font-medium italic">
            {isSignUp 
              ? "Join the bridge and preserve your heritage voice." 
              : "Welcome back, guardian of dialects."}
          </p>
        </header>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-2">Ancestral Email</label>
            <input 
              type="email"
              required
              placeholder="heritage@sabah.com"
              className="w-full bg-brand-warm-white p-5 rounded-3xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-2">Secret Password</label>
            <input 
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-brand-warm-white p-5 rounded-3xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-brand-green text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:brightness-110 active:scale-95 transition-all mt-4 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Volume2 size={24} /></motion.div>
            ) : (isSignUp ? "Begin Journey" : "Enter the Bridge")}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-8 text-brand-green font-black text-sm hover:underline tracking-tight"
        >
          {isSignUp ? "Already a guardian? Sign In" : "New descendant? Create Account"}
        </button>
      </motion.div>
    </div>
  );
}

// --- SCREEN COMPONENTS ---

function HomeScreen({ user, onContinue }: { user: any, onContinue: () => void, key?: string }) {
  if (!user) return <div className="h-full flex items-center justify-center text-brand-green font-bold animate-pulse">Waking the ancestors...</div>;
  const dailyPhrase = LESSONS[0].phrases[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-10"
    >
      <header className="space-y-3">
        <h2 className="text-4xl md:text-6xl font-bold italic font-cultural text-brand-green tracking-tight leading-tight">
          "Speak the language your grandparents dream in."
        </h2>
        <p className="text-deep-forest/50 text-xl font-medium">Welcome back, resilient soul. Your heritage awaits.</p>
      </header>

      {/* Daily Phrase Card */}
      <section className="relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform group-hover:scale-110 transition-transform">
          <div className="w-56 h-56 pattern-bg rotate-12 rounded-[3.5rem]"></div>
        </div>
        <div className="bg-white rounded-[3rem] p-10 md:p-14 border-2 border-brand-green shadow-2xl card-shadow relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-10">
            <div className="flex justify-between items-start">
              <span className="px-5 py-2 bg-accent-sand/20 text-accent-brown text-xs font-black rounded-full uppercase tracking-[0.2em] border border-accent-sand/10">Daily Phrase</span>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-6xl md:text-8xl font-black text-brand-green leading-[0.9] tracking-tighter">{dailyPhrase.phrase}</h3>
              <p className="text-2xl font-mono text-accent-sand tracking-widest italic font-bold">/{dailyPhrase.pronunciation}/</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-t border-brand-green/10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-black text-brand-green/40 tracking-[0.2em] mb-2">Bahasa Malaysia</p>
                <p className="text-2xl font-bold text-deep-forest underline decoration-accent-sand/30 decoration-4 underline-offset-8">{dailyPhrase.meaningBM}</p>
              </div>
              <div className="space-y-1 text-right md:text-left">
                <p className="text-[10px] uppercase font-black text-brand-green/40 tracking-[0.2em] mb-2">English</p>
                <p className="text-2xl font-bold text-deep-forest opacity-80 italic">"{dailyPhrase.meaningEN}"</p>
              </div>
            </div>

            <button 
              onClick={onContinue}
              className="w-full bg-brand-green text-white py-6 rounded-[2rem] font-black text-2xl hover:brightness-110 shadow-2xl shadow-brand-green/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
            >
              Master This Phrase <ArrowRight />
            </button>
          </div>
          
          <div className="hidden lg:flex flex-col gap-4">
             <button className="w-20 h-20 rounded-[2rem] bg-soft-green flex items-center justify-center border-2 border-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-lg hover:rotate-6">
                <Volume2 size={32} />
              </button>
              <button className="w-20 h-20 rounded-[2rem] bg-soft-green flex items-center justify-center border-2 border-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-lg hover:-rotate-6 text-3xl">
                ⭐
              </button>
          </div>
        </div>
      </section>

      {/* Stats and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-brand-green/10 card-shadow group">
          <h4 className="font-bold mb-10 flex items-center gap-3 text-deep-forest text-2xl">
            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all animate-bounce">📈</span> Recent Activity
          </h4>
          <div className="flex gap-4 items-end h-32 mb-6">
            {user.activity.map((entry: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                <div 
                  className={cn(
                    "w-full rounded-2xl transition-all duration-700 ease-out shadow-sm",
                    entry.count > 15 ? "bg-brand-green shadow-brand-green/20" : entry.count > 0 ? "bg-accent-sand/40 border border-accent-sand/20" : "bg-gray-100/50"
                  )}
                  style={{ height: `${Math.max(entry.count * 3, 10)}%` }}
                />
                <span className="text-[10px] font-black text-deep-forest/30 uppercase tracking-widest">{entry.day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-[0.2em] pt-4">Weekly progress calibration</p>
        </div>
        
        <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-brand-green/10 card-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 opacity-5 text-brand-green rotate-12">
            <Trophy size={200} />
          </div>
          <h4 className="font-black text-brand-green uppercase tracking-widest text-sm mb-8">Sabahan Warrior Stats</h4>
          <div className="space-y-10 relative z-10">
            <div>
              <p className="text-6xl font-black text-brand-green leading-none">{user.phrasesLearned}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 underline decoration-accent-sand decoration-2">Words Reclaimed</p>
            </div>
            <div>
              <p className="text-6xl font-black text-brand-green leading-none">{user.xp.toLocaleString()}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 underline decoration-accent-sand decoration-2">Cultural XP</p>
            </div>
          </div>
          <div className="mt-12 p-6 bg-soft-green rounded-[2.5rem] flex items-center gap-5 border border-brand-green/10 shadow-inner group/badge">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-4 ring-brand-green/5 group-hover/badge:scale-110 transition-transform">🌱</div>
            <div>
              <p className="text-[10px] font-black text-brand-green opacity-40 uppercase tracking-widest">Mastery Status</p>
              <p className="text-lg font-black text-brand-green leading-tight">Guardian</p>
              <div className="w-full h-1.5 bg-brand-green/10 rounded-full mt-2">
                <div className="w-3/4 h-full bg-brand-green rounded-full shadow-[0_0_8px_rgba(45,106,79,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExplorerScreen({ onStartLesson }: { onStartLesson: (lesson: Lesson) => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12 pb-10"
    >
      <header className="space-y-1">
        <h2 className="text-4xl font-black text-brand-green tracking-tight">Lesson Explorer</h2>
        <p className="text-deep-forest/40 text-lg font-medium italic">Your journey back to roots starts here.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {LESSONS.map((lesson) => (
          <button 
            key={lesson.id}
            onClick={() => onStartLesson(lesson)}
            className="bg-white p-10 rounded-[3rem] text-left border border-brand-green/10 hover:border-brand-green/30 hover:-translate-y-2 transition-all group relative overflow-hidden card-shadow"
          >
            {lesson.isCompleted && (
              <div className="absolute top-8 right-8">
                <CheckCircle className="text-brand-green fill-soft-green" size={32} />
              </div>
            )}
            <div className="flex items-center gap-6 mb-10">
              <div className="p-6 bg-soft-green rounded-3xl text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all transform group-hover:rotate-12 shadow-lg">
                <PlayCircle size={40} />
              </div>
              <div>
                <h3 className="font-black text-2xl text-deep-forest leading-tight underline decoration-accent-sand decoration-4 underline-offset-4">{lesson.title}</h3>
                <span className="text-[10px] font-black text-accent-brown uppercase tracking-[0.2em] block mt-2">{lesson.phrasesCount} Sacred Phrases</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-deep-forest/40">
                <span>Calibration</span>
                <span>{lesson.progress}% Unlocked</span>
              </div>
              <div className="h-4 bg-brand-warm-white rounded-full overflow-hidden border border-brand-green/5 p-[2px] shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${lesson.progress}%` }}
                  className="h-full bg-brand-green rounded-full shadow-[0_0_12px_rgba(45,106,79,0.3)]"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function LessonScreen({ lesson, onComplete, onExit }: { lesson: Lesson, onComplete: () => void, onExit: () => void, key?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentPhrase = lesson.phrases[currentIndex];
  
  const options = React.useMemo(() => [
    { text: currentPhrase.meaningBM, correct: true },
    { text: "Selamat malam", correct: false },
    { text: "Saya lapur", correct: false },
    { text: "Tolong saya", correct: false }
  ].sort(() => Math.random() - 0.5), [currentIndex, currentPhrase]);

  const handleOptionClick = (option: { text: string, correct: boolean }) => {
    if (selectedOption) return;
    setSelectedOption(option.text);
    if (option.correct) {
      toast.success("Tepat sekali! Perfect pronunciation.");
    } else {
      toast.error("Almost there. Try again, soul.");
    }
  };

  const next = () => {
    if (currentIndex < lesson.phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setSelectedOption(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-warm-white z-50 flex flex-col">
      <header className="h-20 p-8 flex items-center justify-between border-b border-brand-green/10 bg-white">
        <button onClick={onExit} className="p-3 text-brand-green hover:bg-soft-green rounded-2xl transition-all hover:rotate-90">
          <X size={28} />
        </button>
        <div className="flex-1 max-w-xl mx-10">
          <div className="h-4 bg-brand-warm-white rounded-full overflow-hidden border-2 border-brand-green/5 p-[2px] shadow-inner">
            <motion.div 
              animate={{ width: `${((currentIndex + 1) / lesson.phrases.length) * 100}%` }}
              className="h-full bg-brand-green rounded-full shadow-[0_0_15px_rgba(45,106,79,0.4)]"
            />
          </div>
        </div>
        <span className="text-sm font-black text-brand-green uppercase tracking-[0.2em] hidden sm:block">Calibration {currentIndex + 1}/{lesson.phrases.length}</span>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-14 space-y-16 max-w-4xl mx-auto w-full">
        {/* Flip Card */}
        <div 
          className="relative h-96 md:h-[450px] w-full cursor-pointer perspective-2000 group active:scale-95 transition-transform"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div 
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
            className="w-full h-full relative preserve-3d"
          >
            {/* Front */}
            <div className="absolute inset-0 bg-white shadow-[0_30px_60px_-15px_rgba(45,106,79,0.15)] rounded-[4rem] p-16 flex flex-col items-center justify-center border-4 border-accent-sand/10 backface-hidden motif-border transition-all group-hover:border-brand-green/20">
              <span className="absolute top-10 text-[10px] font-black uppercase tracking-[0.3em] text-accent-brown opacity-40">Dialect Phrase</span>
              <h3 className="text-6xl md:text-8xl font-black text-brand-green text-center leading-none tracking-tighter">{currentPhrase.phrase}</h3>
              <p className="mt-12 text-accent-sand font-black uppercase tracking-[0.4em] text-xs transition-all opacity-40 group-hover:opacity-100 group-hover:scale-110">Click to reveal meaning</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-brand-green text-white shadow-2xl rounded-[4rem] p-12 flex flex-col items-center justify-center border-8 border-accent-sand/30 rotate-y-180 backface-hidden relative overflow-hidden">
              <div className="absolute inset-0 pattern-bg opacity-15"></div>
              <div className="space-y-10 text-center relative z-10 w-full">
                <p className="text-white font-mono text-3xl tracking-[0.2em] bg-white/10 py-4 rounded-3xl backdrop-blur-md border border-white/5 whitespace-nowrap overflow-hidden text-ellipsis px-4 capitalize">/{currentPhrase.pronunciation}/</p>
                <div className="space-y-4">
                  <p className="text-5xl font-black tracking-tight">{currentPhrase.meaningBM}</p>
                  <div className="h-1 w-20 bg-accent-sand mx-auto rounded-full"></div>
                  <p className="text-2xl text-white/70 italic font-cultural whitespace-nowrap overflow-hidden text-ellipsis px-4 underline decoration-accent-sand/50 underline-offset-8">"{currentPhrase.meaningEN}"</p>
                </div>
                <div className="bg-white/10 p-8 rounded-[2.5rem] text-lg italic font-cultural border border-white/5 backdrop-blur-xl shadow-inner">
                   {currentPhrase.note}
                </div>
                <button className="mx-auto w-20 h-20 bg-white text-brand-green rounded-[2rem] flex items-center justify-center hover:scale-110 transition-all shadow-2xl hover:rotate-12 border-4 border-soft-green">
                  <Volume2 size={32} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quiz Section */}
        <section className="space-y-10 bg-white p-12 rounded-[4rem] border-2 border-brand-green/10 shadow-2xl card-shadow">
          <h4 className="font-black text-center text-deep-forest/30 uppercase text-xs tracking-[0.3em] mb-4">Choose the ancestral meaning</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((opt) => (
              <button
                key={opt.text}
                disabled={selectedOption !== null}
                onClick={() => handleOptionClick(opt)}
                className={cn(
                  "p-6 rounded-[2rem] border-4 text-left transition-all font-black text-xl md:text-2xl shadow-sm",
                  selectedOption === opt.text
                    ? (opt.correct ? "bg-green-600 border-green-800 text-white shadow-2xl scale-[1.03] -translate-y-1" : "bg-red-500 border-red-700 text-white opacity-90")
                    : "bg-brand-warm-white border-transparent hover:border-accent-sand/30 text-deep-forest hover:bg-soft-green hover:scale-[1.01]"
                )}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-10 pb-20">
          <button 
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="px-10 py-5 text-brand-green font-black uppercase tracking-widest disabled:opacity-20 disabled:pointer-events-none hover:bg-soft-green rounded-3xl transition-all active:scale-95"
          >
            ← Back
          </button>
          <button 
            onClick={next}
            className="px-16 py-6 bg-deep-forest text-white rounded-full font-black text-2xl shadow-[0_20px_50px_rgba(27,67,50,0.4)] hover:brightness-125 transition-all transform active:scale-90 hover:scale-105"
          >
            {currentIndex === lesson.phrases.length - 1 ? "Reclaim Heritage →" : "Proceed →"}
          </button>
        </div>
      </div>
      
      {/* Decorative Bottom */}
      <div className="h-4 w-full woven-border opacity-50 absolute bottom-0 left-0"></div>
    </div>
  );
}

function CommunityScreen({ posts, onNewPost }: { posts: any[], onNewPost: (post: any) => void, key?: string }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    phrase: "",
    romanisation: "",
    meaning: "",
    dialect: "Kadazan",
    origin: "",
    note: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      id: Date.now().toString(),
      name: "You",
      upvotes: 0
    };
    onNewPost(newPost);
    toast.success("Ancestral wisdom shared!");
    setShowForm(false);
    setFormData({ phrase: "", romanisation: "", meaning: "", dialect: "Kadazan", origin: "", note: "" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-12 pb-10"
    >
      <header className="flex justify-between items-end gap-6 bg-white p-8 rounded-[2.5rem] border border-brand-green/5 shadow-sm">
        <div>
          <h2 className="text-4xl font-black text-brand-green tracking-tight">Community Wall</h2>
          <p className="text-deep-forest/40 text-lg font-medium italic mt-1">Wisdom passed through generations.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="hidden md:flex items-center gap-3 bg-accent-sand text-white px-8 py-4 rounded-full font-black shadow-xl hover:brightness-110 active:scale-95 transition-all text-lg"
        >
          <Plus size={24} strokeWidth={3} />
          Share Wisdom
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <motion.div 
            layout
            key={post.id}
            className="bg-white p-8 rounded-[3rem] border-l-[12px] border-brand-green shadow-sm space-y-6 hover:shadow-2xl transition-all relative overflow-hidden card-shadow group"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 pattern-bg rounded-2xl flex items-center justify-center text-white font-black shadow-lg">
                  {post.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-base text-deep-forest leading-none">{post.name}</h4>
                  <div className="flex items-center text-[10px] text-gray-400 gap-1.5 font-black uppercase tracking-[0.2em] mt-2">
                    <MapPin size={12} className="text-brand-green" />
                    <span>{post.origin}</span>
                  </div>
                </div>
              </div>
              <span className="px-4 py-1.5 bg-soft-green text-brand-green text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-green/10 shadow-sm">{post.dialect}</span>
            </div>

            <div className="py-2 space-y-2">
              <h3 className="text-3xl font-black text-brand-green group-hover:text-deep-forest transition-colors leading-tight tracking-tight">{post.phrase}</h3>
              <p className="text-deep-forest/70 font-bold text-lg leading-snug">"{post.meaning}"</p>
            </div>

            {post.note && (
              <div className="bg-brand-warm-white p-5 rounded-3xl border border-brand-green/5 shadow-inner">
                <p className="text-sm text-accent-brown italic font-cultural leading-relaxed">"{post.note}"</p>
              </div>
            )}

            <div className="flex items-center gap-6 pt-6 border-t border-brand-green/10">
              <button className="flex items-center gap-2 text-gray-400 hover:text-brand-green transition-all group/up transform active:scale-75">
                <ArrowUp size={22} strokeWidth={3} className="group-hover/up:-translate-y-1" />
                <span className="text-sm font-black">{post.upvotes}</span>
              </button>
              <button className="text-gray-400 hover:text-accent-sand transition-all transform active:scale-75">
                <MessageSquare size={22} strokeWidth={3} />
              </button>
              <div className="ml-auto text-[10px] font-black text-gray-200 uppercase tracking-widest">Heritage Signal</div>
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-8 md:hidden w-20 h-20 bg-accent-sand text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 active:scale-90 transition-all border-4 border-white"
      >
        <Plus size={40} />
      </button>

      {/* Submission Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-deep-forest/40 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border-4 border-brand-green/10"
            >
              <header className="p-8 border-b border-brand-green/5 flex justify-between items-center bg-soft-green/30">
                <h3 className="text-3xl font-black text-brand-green tracking-tight">Share Wisdom</h3>
                <button onClick={() => setShowForm(false)} className="p-3 hover:bg-white rounded-2xl transition-all hover:rotate-90 text-brand-green shadow-sm"><X size={24} /></button>
              </header>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Phrase</label>
                    <input 
                      required
                      placeholder="e.g. Kopiwosion"
                      className="w-full bg-brand-warm-white p-4 rounded-2xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold placeholder:opacity-30"
                      value={formData.phrase}
                      onChange={e => setFormData({...formData, phrase: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Dialect</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-brand-warm-white p-4 rounded-2xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold appearance-none cursor-pointer"
                        value={formData.dialect}
                        onChange={e => setFormData({...formData, dialect: e.target.value})}
                      >
                        {["Kadazan", "Dusun", "Bajau", "Murut"].map(d => <option key={d}>{d}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-green opacity-50">▾</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Meaning</label>
                    <input 
                      required
                      placeholder="What does it mean in English?"
                      className="w-full bg-brand-warm-white p-4 rounded-2xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold placeholder:opacity-30"
                      value={formData.meaning}
                      onChange={e => setFormData({...formData, meaning: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Village / District Origins</label>
                    <input 
                      required
                      placeholder="e.g. Penampang, Ranau, or Sipitang"
                      className="w-full bg-brand-warm-white p-4 rounded-2xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold placeholder:opacity-30"
                      value={formData.origin}
                      onChange={e => setFormData({...formData, origin: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Cultural Memory (Optional)</label>
                    <textarea 
                      placeholder="Share a short story or context for this phrase..."
                      className="w-full bg-brand-warm-white p-5 rounded-[2rem] outline-none h-32 focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold placeholder:opacity-30 resize-none"
                      value={formData.note}
                      onChange={e => setFormData({...formData, note: e.target.value})}
                    />
                </div>
                <button className="w-full bg-brand-green text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:brightness-110 active:scale-95 transition-all mt-4 shadow-brand-green/20 uppercase tracking-widest">
                  Release Wisdom to Community
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProfileScreen({ user }: { user: any, key?: string }) {
  if (!user) return <div className="h-full flex items-center justify-center text-brand-green font-bold animate-pulse">Retrieving your scroll...</div>;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-10"
    >
      <header className="flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-[4rem] border-2 border-brand-green/10 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:rotate-45 transition-transform duration-1000">
          <Library size={200} />
        </div>
        <div className="w-40 h-40 pattern-bg rounded-[3rem] flex items-center justify-center text-white text-6xl font-black shadow-[0_20px_40px_rgba(45,106,79,0.3)] rotate-3 ring-12 ring-soft-green transition-transform group-hover:rotate-0">
          {user.dialect[0]}
        </div>
        <div className="text-center md:text-left space-y-4 relative z-10">
          <h2 className="text-5xl font-black text-brand-green tracking-tight leading-none">{user.dialect} Warrior</h2>
          <p className="text-deep-forest/40 font-bold text-xl italic font-cultural leading-tight">"A descendant reclaiming what was once unheard."</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
            <span className="bg-soft-green px-8 py-3 rounded-2xl text-sm font-black text-brand-green flex items-center gap-3 shadow-sm border border-brand-green/5">
              <Flame size={22} className="text-orange-500 animate-pulse" /> {user.streak} Day Streak
            </span>
            <span className="bg-soft-green px-8 py-3 rounded-2xl text-sm font-black text-brand-green flex items-center gap-3 shadow-sm border border-brand-green/5">
              <Trophy size={22} className="text-accent-sand" /> {user.xp} XP Points
            </span>
            <button 
              onClick={() => supabase.auth.signOut()}
              className="bg-red-50 px-8 py-3 rounded-2xl text-sm font-black text-red-600 flex items-center gap-3 shadow-sm border border-red-100 hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Activity Chart */}
        <div className="bg-white p-12 rounded-[4rem] border border-brand-green/10 shadow-sm space-y-10 card-shadow relative overflow-hidden group">
          <div className="absolute top-10 right-10 text-accent-sand/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <BarChart size={100} />
          </div>
          <h3 className="text-3xl font-black text-deep-forest flex items-center gap-4">
            <span className="text-accent-sand text-4xl">📊</span> Calibration History
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={user.activity}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 900, fill: '#1B4332', opacity: 0.3}} />
                <Tooltip 
                  cursor={{fill: '#2D6A4F05'}}
                  contentStyle={{borderRadius: '32px', border: 'none', background: '#1B4332', color: 'white', fontWeight: 900, fontSize: '14px', boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.2)', padding: '20px'}}
                  itemStyle={{color: 'white'}}
                />
                <Bar dataKey="count" radius={[16, 16, 16, 16]} barSize={24}>
                  {user.activity.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.count > 0 ? '#2D6A4F' : '#F8F9FA'} className="transition-all hover:brightness-125" />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-300 font-black uppercase tracking-[0.3em] pt-6 border-t border-gray-50">Ancestral phrases learned this week</p>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white p-12 rounded-[4rem] border border-brand-green/10 shadow-sm space-y-10 card-shadow overflow-hidden relative">
           <div className="absolute bottom-[-50px] left-[-50px] opacity-5 text-accent-sand">
             <Trophy size={150} />
           </div>
          <h3 className="text-3xl font-black text-deep-forest relative z-10">Sacred Badges</h3>
          <div className="grid grid-cols-2 gap-8 relative z-10">
            {user.achievements.map((ach: any) => (
              <div key={ach.id} className="p-8 bg-brand-warm-white rounded-[2.5rem] flex flex-col items-center text-center gap-4 group border border-brand-green/5 hover:border-brand-green/20 hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-brand-green shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all ring-8 ring-soft-green">
                  {ach.icon === "CheckCircle" && <CheckCircle size={40} strokeWidth={2.5} />}
                  {ach.icon === "Flame" && <Flame size={40} strokeWidth={2.5} className="text-orange-500 animate-pulse" />}
                </div>
                <div>
                  <p className="text-sm font-black text-deep-forest leading-tight uppercase tracking-tight">{ach.name}</p>
                  <p className="text-xs text-gray-400 italic mt-2 font-cultural leading-relaxed">"{ach.description}"</p>
                </div>
              </div>
            ))}
            <div className="p-8 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center opacity-30 group cursor-not-allowed">
              <div className="w-14 h-14 bg-white/50 rounded-[1.5rem] flex items-center justify-center text-gray-300 group-hover:shake transition-all">
                <Library size={32} />
              </div>
              <p className="text-[10px] font-black mt-4 text-gray-400 tracking-[0.3em] uppercase">Locked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="bg-deep-forest text-white p-14 rounded-[4.5rem] shadow-[0_40px_80px_-20px_rgba(27,67,50,0.5)] grid grid-cols-2 gap-12 relative overflow-hidden group border-b-8 border-accent-sand">
        <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000 scale-150">
          <div className="w-full h-full pattern-bg"></div>
        </div>
        <div className="space-y-4 relative z-10">
          <p className="text-7xl md:text-9xl font-black tracking-tighter text-accent-sand drop-shadow-2xl leading-none">{user.lessonsCompleted}</p>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white/40 border-l-4 border-accent-sand/40 pl-4">Lessons Transmitted</p>
        </div>
        <div className="space-y-4 relative z-10 text-right">
          <p className="text-7xl md:text-9xl font-black tracking-tighter text-accent-sand drop-shadow-2xl leading-none">{user.phrasesLearned}</p>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white/40 border-r-4 border-accent-sand/40 pr-4">Meanings Reclaimed</p>
        </div>
      </div>
    </motion.div>
  );
}
