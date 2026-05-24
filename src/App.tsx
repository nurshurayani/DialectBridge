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
  BarChart,
  Lock
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { LESSONS, Lesson, DICTIONARY, Phrase } from "./constants";
import { Toaster, toast } from "react-hot-toast";
import { clsx, type ClassValue } from "clsx";
import { Search, Filter, Book, Sparkles } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Screen = "auth" | "home" | "explorer" | "lesson" | "community" | "profile" | "dictionary" | "unconfigured";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(isSupabaseConfigured ? "auth" : "unconfigured");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
  // Initialize community posts from cloud or fallback local guest posts
  const [communityPosts, setCommunityPosts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("dialect_bridge_guest_community_posts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [session, setSession] = useState<any>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<Phrase[]>([]);

  // Mastered phrases state to build completion on quiz performance
  const [masteredPhraseIds, setMasteredPhraseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("dialect_bridge_mastered_phrases");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bestScores, setBestScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("dialect_bridge_best_scores");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveBestScore = (lessonId: string, score: number) => {
    const currentBest = bestScores[lessonId] || 0;
    if (score > currentBest) {
      const updated = { ...bestScores, [lessonId]: score };
      setBestScores(updated);
      localStorage.setItem("dialect_bridge_best_scores", JSON.stringify(updated));
    }
  };

  useEffect(() => {
    localStorage.setItem("dialect_bridge_mastered_phrases", JSON.stringify(masteredPhraseIds));
  }, [masteredPhraseIds]);

  const [lastOpenedLessonId, setLastOpenedLessonId] = useState<string>(() => {
    return localStorage.getItem("dialect_bridge_last_opened_lesson_id") || "l1";
  });

  const [hasSubmittedPost, setHasSubmittedPost] = useState<boolean>(() => {
    return localStorage.getItem("dialect_bridge_submitted_post") === "true";
  });

  const [guestUserData, setGuestUserData] = useState<any>(() => {
    const saved = localStorage.getItem("dialect_bridge_guest_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      xp: 0,
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
      ]
    };
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("dialect_bridge_completed_lessons");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("dialect_bridge_guest_user", JSON.stringify(guestUserData));
  }, [guestUserData]);

  useEffect(() => {
    localStorage.setItem("dialect_bridge_completed_lessons", JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  // Compute calculated values based strictly on live mastered phrases to prevent resets
  const calculatedCompletedLessonsCount = LESSONS.filter(lesson => {
    const total = lesson.phrases.length;
    return total > 0 && lesson.phrases.every(p => masteredPhraseIds.includes(p.id));
  }).length;

  const activeUser = (session && userData) ? {
    ...userData,
    completed_lesson_ids: completedLessonIds,
    mastered_phrase_ids: masteredPhraseIds,
    phrases_learned: masteredPhraseIds.length,
    lessons_completed: calculatedCompletedLessonsCount,
    has_submitted_post: hasSubmittedPost
  } : {
    ...guestUserData,
    completed_lesson_ids: completedLessonIds,
    mastered_phrase_ids: masteredPhraseIds,
    phrases_learned: masteredPhraseIds.length,
    lessons_completed: calculatedCompletedLessonsCount,
    has_submitted_post: hasSubmittedPost
  };

  useEffect(() => {
    const stored = localStorage.getItem("dialect_bridge_favourites");
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favourites", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dialect_bridge_favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (phrase: Phrase) => {
    setFavourites(prev => {
      const isFav = prev.find(p => p.id === phrase.id);
      if (isFav) {
        toast.success("Wisdom removed from favourites");
        return prev.filter(p => p.id !== phrase.id);
      } else {
        toast.success("Wisdom preserved in favourites");
        return [...prev, phrase];
      }
    });
  };

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
        if (created) {
          setGuestUserData((prev: any) => ({
            ...prev,
            xp: Math.max(prev.xp || 0, created.xp || 0),
            phrases_learned: Math.max(prev.phrases_learned || 0, created.phrases_learned || 0),
            lessons_completed: Math.max(prev.lessons_completed || 0, created.lessons_completed || 0),
            activity: created.activity || prev.activity
          }));
        }
      } else if (error) {
        throw error;
      } else {
        setUserData(data);
        if (data) {
          setGuestUserData((prev: any) => ({
            ...prev,
            xp: Math.max(prev.xp || 0, data.xp || 0),
            phrases_learned: Math.max(prev.phrases_learned || 0, data.phrases_learned || 0),
            lessons_completed: Math.max(prev.lessons_completed || 0, data.lessons_completed || 0),
            activity: data.activity || prev.activity
          }));
        }
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
    setLastOpenedLessonId(lesson.id);
    localStorage.setItem("dialect_bridge_last_opened_lesson_id", lesson.id);
  };

  const handleLessonComplete = async (correctPhraseIdsThisSession: string[], score?: number) => {
    if (!activeLesson) {
      setCurrentScreen("explorer");
      return;
    }

    const lessonId = activeLesson.id;
    
    // Calculate new mastered list
    const oldMasteredList = [...masteredPhraseIds];
    const updatedMasteredList = Array.from(new Set([...oldMasteredList, ...correctPhraseIdsThisSession]));
    
    // Find net new phrases mastered
    const newlyMasteredCount = correctPhraseIdsThisSession.filter(id => !oldMasteredList.includes(id)).length;
    
    // Calculate extra XP (e.g. 50 flat + 10 XP for each new mastered phrase)
    const extraXp = 50 + (newlyMasteredCount * 10);
    
    // Update local mastered state
    setMasteredPhraseIds(updatedMasteredList);

    const quizScore = score ?? 0;
    const isFullyCompletedNow = quizScore === activeLesson.phrases.length || (bestScores[lessonId] || 0) === activeLesson.phrases.length;
    if (isFullyCompletedNow) {
      setCompletedLessonIds(prev => prev.includes(lessonId) ? prev : [...prev, lessonId]);
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayDayName = days[new Date().getDay()];

    const currentXp = activeUser.xp || 0;
    const updatedXp = currentXp + extraXp;

    const calculatedCompletedLessonsCount = LESSONS.filter(lesson => {
      const total = lesson.phrases.length;
      const best = lesson.id === lessonId ? Math.max(bestScores[lesson.id] || 0, quizScore) : (bestScores[lesson.id] || 0);
      return total > 0 && best === total;
    }).length;

    const currentActivity = activeUser.activity || [
      { day: "Mon", count: 0 },
      { day: "Tue", count: 0 },
      { day: "Wed", count: 0 },
      { day: "Thu", count: 0 },
      { day: "Fri", count: 0 },
      { day: "Sat", count: 0 },
      { day: "Sun", count: 0 },
    ];
    const updatedActivity = currentActivity.map((act: any) => {
      if (act.day === todayDayName) {
        return { ...act, count: (act.count || 0) + 20 };
      }
      return act;
    });

    // Save to guest state representing device memory
    setGuestUserData((prev: any) => ({
      ...prev,
      xp: updatedXp,
      lessons_completed: calculatedCompletedLessonsCount,
      phrases_learned: updatedMasteredList.length,
      activity: updatedActivity
    }));

    if (!userData || !session) {
      toast.success(`Progress Saved to Local Memory! +${extraXp} XP`);
      setCurrentScreen("explorer");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          xp: updatedXp, 
          lessons_completed: calculatedCompletedLessonsCount, 
          phrases_learned: updatedMasteredList.length,
          activity: updatedActivity
        })
        .eq('id', session.user.id)
        .select()
        .single();

      if (error) throw error;
      setUserData(data);
      toast.success(`Progress Saved to Heritage Cloud! +${extraXp} XP`);
      setCurrentScreen("explorer");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Cloud save failed, but your progress remains local.");
      setUserData((prev: any) => prev ? {
        ...prev,
        xp: updatedXp,
        lessons_completed: calculatedCompletedLessonsCount,
        phrases_learned: updatedMasteredList.length,
        activity: updatedActivity
      } : null);
      setCurrentScreen("explorer");
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = async (postData: any) => {
    try {
      const newPost = {
        id: postData.id || Date.now().toString(),
        phrase: postData.phrase,
        meaning: postData.meaning,
        dialect: postData.dialect,
        origin: postData.origin || "",
        note: postData.note || "",
        user_id: session?.user?.id || "guest",
        name: session ? (session.user.user_metadata?.username || session.user.email?.split('@')[0]) : "You (Guest)",
        upvotes: 0,
        created_at: new Date().toISOString()
      };

      if (session) {
        const { data, error } = await supabase
          .from('community_posts')
          .insert([newPost])
          .select()
          .single();

        if (error) throw error;
        setCommunityPosts([data, ...communityPosts]);
        toast.success("Phrase preserved in the community cloud!");
      } else {
        // Safe Guest offline mode
        const updatedPosts = [newPost, ...communityPosts];
        setCommunityPosts(updatedPosts);
        localStorage.setItem("dialect_bridge_guest_community_posts", JSON.stringify(updatedPosts));
        toast.success("Phrase preserved locally on your device!");
      }

      setHasSubmittedPost(true);
      localStorage.setItem("dialect_bridge_submitted_post", "true");
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
              <span className="font-bold text-brand-green text-sm md:text-base">{userData?.streak || 0} Day Streak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-semibold uppercase opacity-60 tracking-wider">Level {Math.floor((userData?.xp || 0) / 100)}</p>
                <p className="text-sm font-bold text-deep-forest">{userData?.dialect || "Kadazan"} Soul</p>
              </div>
              <button 
                onClick={() => setCurrentScreen("profile")}
                className="w-10 h-10 rounded-full border-2 border-brand-green overflow-hidden flex items-center justify-center bg-accent-sand transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              >
                <User className="text-white" size={20} />
              </button>
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
                icon="📖" 
                label="Dictionary" 
                active={currentScreen === "dictionary"} 
                onClick={() => setCurrentScreen("dictionary")} 
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
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  <p className="font-black text-deep-forest text-lg leading-tight">Kadazan-Dusun</p>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Bottom Navigation (Mobile) */}
        {currentScreen !== "lesson" && currentScreen !== "auth" && currentScreen !== "unconfigured" && (
          <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-brand-green/10 flex justify-around items-center md:hidden z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
            <NavButton icon={<Home />} active={currentScreen === "home"} onClick={() => setCurrentScreen("home")} />
            <NavButton icon={<Library />} active={currentScreen === "explorer"} onClick={() => setCurrentScreen("explorer")} />
            <NavButton icon={<Book />} active={currentScreen === "dictionary"} onClick={() => setCurrentScreen("dictionary")} />
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
                <UnconfiguredScreen key="unconfigured" onSkip={() => setCurrentScreen("home")} />
              )}
              {currentScreen === "auth" && (
                <AuthScreen key="auth" onSkip={() => setCurrentScreen("home")} />
              )}
              {currentScreen === "home" && (
                <HomeScreen 
                  user={activeUser} 
                  onContinue={(category?: string) => {
                    const matchingLesson = LESSONS.find(l => l.category === category);
                    if (matchingLesson) {
                      handleStartLesson(matchingLesson);
                    } else {
                      setCurrentScreen("explorer");
                    }
                  }} 
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                  masteredPhraseIds={masteredPhraseIds}
                  bestScores={bestScores}
                  lastOpenedLessonId={lastOpenedLessonId}
                  onResumeLesson={(lessonId) => {
                    const matchingLesson = LESSONS.find(l => l.id === lessonId);
                    if (matchingLesson) {
                      handleStartLesson(matchingLesson);
                    }
                  }}
                />
              )}
              {currentScreen === "explorer" && (
                <ExplorerScreen 
                  onStartLesson={handleStartLesson} 
                  completedLessonIds={completedLessonIds}
                  bestScores={bestScores}
                />
              )}
              {currentScreen === "community" && (
                <CommunityScreen 
                  posts={communityPosts} 
                  onNewPost={handleNewPost}
                />
              )}
              {currentScreen === "profile" && (
                <ProfileScreen 
                  user={activeUser} 
                  favourites={favourites}
                  onToggleFavourite={toggleFavourite}
                  masteredPhraseIds={masteredPhraseIds}
                  bestScores={bestScores}
                  hasSubmittedPost={hasSubmittedPost}
                />
              )}
              {currentScreen === "dictionary" && (
                <DictionaryScreen />
              )}
              {currentScreen === "lesson" && activeLesson && (
                <LessonScreen 
                  key="lesson" 
                  lesson={activeLesson} 
                  onComplete={(correctPhraseIds, score) => {
                    saveBestScore(activeLesson.id, score);
                    handleLessonComplete(correctPhraseIds, score);
                  }}
                  onExit={() => setCurrentScreen("explorer")}
                  masteredPhraseIds={masteredPhraseIds}
                  onPhraseMastered={(phraseId) => {
                    setMasteredPhraseIds(prev => prev.includes(phraseId) ? prev : [...prev, phraseId]);
                  }}
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

function UnconfiguredScreen({ onSkip, key }: { onSkip?: () => void, key?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-warm-white" key={key}>
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
        
        {onSkip && (
          <button 
            type="button"
            onClick={onSkip}
            className="w-full bg-brand-green text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all mt-4 flex items-center justify-center gap-3"
          >
            Continue as Guest (Offline Mode) →
          </button>
        )}
        
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest pt-2">Connect to Supabase to save your heritage progress.</p>
      </motion.div>
    </div>
  );
}

function AuthScreen({ onSkip, key }: { onSkip?: () => void, key?: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Convert username to a valid internal email format for Supabase
    const email = `${username.trim().toLowerCase()}@dialectbridge.auth`;
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              username: username.trim()
            }
          }
        });
        if (error) throw error;
        toast.success("Identity Secured! You can now sign in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back, guardian.");
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
            {isSignUp ? "Join the Bridge" : "Return to Roots"}
          </h2>
          <p className="text-deep-forest/50 font-medium italic">
            {isSignUp 
              ? "Choose your guardian username." 
              : "Welcome back, voice of the ancestors."}
          </p>
        </header>

        <form onSubmit={handleAuth} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-2">Guardian Username</label>
            <input 
              type="text"
              required
              placeholder="e.g. sabahan_spirit"
              className="w-full bg-brand-warm-white p-5 rounded-3xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold"
              value={username}
              onChange={e => setUsername(e.target.value)}
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
            ) : (isSignUp ? "Protect Identity" : "Enter the Bridge")}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-8 text-brand-green font-black text-sm hover:underline tracking-tight"
        >
          {isSignUp ? "Already a guardian? Sign In" : "New descendant? Create Identity"}
        </button>

        {onSkip && (
          <button 
            type="button"
            onClick={onSkip}
            className="w-full mt-4 bg-brand-green/10 text-brand-green py-5 rounded-[2rem] font-black text-lg hover:bg-brand-green/20 transition-all text-center flex items-center justify-center gap-2 border border-brand-green/20"
          >
            <span>Continue as Guest (Local Memory)</span> <span>→</span>
          </button>
        )}

        <div className="mt-8 pt-8 border-t border-brand-green/5 text-center">
          <p className="text-[9px] uppercase font-black text-gray-300 tracking-[0.2em] leading-relaxed">
            Prototype Demo: No email verification required if "Confirm Email" is disabled in Supabase.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function HomeScreen({ 
  user, 
  onContinue, 
  favourites, 
  onToggleFavourite,
  masteredPhraseIds = [],
  bestScores = {},
  lastOpenedLessonId = "l1",
  onResumeLesson
}: { 
  user: any, 
  onContinue: (category?: string) => void, 
  favourites: Phrase[], 
  onToggleFavourite: (phrase: Phrase) => void,
  masteredPhraseIds?: string[],
  bestScores?: Record<string, number>,
  lastOpenedLessonId?: string,
  onResumeLesson: (lessonId: string) => void
}) {
  const defaultUser = {
    phrases_learned: 0,
    xp: 0,
    activity: [
      { day: "Mon", count: 0 },
      { day: "Tue", count: 0 },
      { day: "Wed", count: 0 },
      { day: "Thu", count: 0 },
      { day: "Fri", count: 0 },
      { day: "Sat", count: 0 },
      { day: "Sun", count: 0 },
    ]
  };
  const activeUser = user || defaultUser;
  const [dailyPhrase] = useState(() => {
    if (!DICTIONARY || DICTIONARY.length === 0) return LESSONS[0].phrases[0];
    
    // Create or retrieve a session-specific seed so each session gets a different word.
    let sessionKey = sessionStorage.getItem("dialect_bridge_session_seed");
    if (!sessionKey) {
      sessionKey = Math.floor(Math.random() * 1000000).toString();
      sessionStorage.setItem("dialect_bridge_session_seed", sessionKey);
    }
    
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const seed = dateSeed + parseInt(sessionKey, 10);
    const index = seed % DICTIONARY.length;
    return DICTIONARY[index];
  });
  const isStarred = favourites.some(p => p.id === dailyPhrase.id);

  // Math calculation of progress for the last opened lesson
  const lastLesson = LESSONS.find(l => l.id === lastOpenedLessonId) || LESSONS[0];
  const totalPhrasesInLastLesson = lastLesson.phrases.length;
  const bestScoreInLastLesson = bestScores[lastLesson.id] || 0;
  const lastLessonProgressPercent = totalPhrasesInLastLesson > 0 
    ? Math.round((bestScoreInLastLesson / totalPhrasesInLastLesson) * 100) 
    : 0;

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
              onClick={() => onContinue(dailyPhrase.category)}
              className="w-full bg-brand-green text-white py-6 rounded-[2rem] font-black text-2xl hover:brightness-110 shadow-2xl shadow-brand-green/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
            >
              Master This Phrase <ArrowRight />
            </button>
          </div>
          
          <div className="hidden lg:flex flex-col gap-4">
              <button 
                onClick={() => onToggleFavourite(dailyPhrase)}
                className={cn(
                  "w-20 h-20 rounded-[2rem] bg-soft-green flex items-center justify-center border-2 border-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-lg hover:-rotate-6 text-3xl",
                  isStarred && "bg-brand-green text-white"
                )}
              >
                {isStarred ? "⭐" : "☆"}
              </button>
          </div>
        </div>
      </section>

      {/* Stats and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Continue Your Journey Card */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-brand-green/10 card-shadow flex flex-col justify-between group">
          <div className="space-y-6">
            <h4 className="font-extrabold flex items-center gap-3 text-deep-forest text-2xl">
              <span className="text-3xl animate-pulse">🧭</span> Continue Your Journey
            </h4>
            <p className="text-sm font-medium text-deep-forest/50 italic">
              "Every word learned strengthens the bridge between generations."
            </p>
            
            <div className="p-8 bg-brand-warm-white rounded-[2rem] border border-brand-green/5 space-y-6 mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-green text-3xl shadow-sm ring-4 ring-soft-green/50">
                    {lastLesson.icon === "Hand" && "👋"}
                    {lastLesson.icon === "Users" && "👥"}
                    {lastLesson.icon === "User" && "👤"}
                    {lastLesson.icon === "Paintbrush" && "🎨"}
                    {lastLesson.icon === "Smile" && "😊"}
                    {lastLesson.icon === "Utensils" && "🍴"}
                    {lastLesson.icon === "Trees" && "🌲"}
                    {lastLesson.icon === "Sparkles" && "✨"}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-green opacity-40 tracking-widest leading-none block">Last Opened Lesson</span>
                    <span className="text-xl font-black text-brand-green mt-1 underline decoration-accent-sand decoration-2 block">{lastLesson.title}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-brand-green text-2xl font-black">{lastLessonProgressPercent}%</span>
                  <p className="text-[9px] font-black text-deep-forest/40 uppercase tracking-widest mt-1">Mastery</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-4 bg-white rounded-full overflow-hidden border border-brand-green/5 p-[2px] shadow-inner relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${lastLessonProgressPercent}%` }}
                  className="h-full bg-brand-green rounded-full shadow-[0_0_8px_rgba(45,106,79,0.3)]"
                  style={{ backgroundColor: "#2D6A4F" }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-black text-deep-forest/40 uppercase tracking-widest pt-1">
                <span>{bestScoreInLastLesson} / {totalPhrasesInLastLesson} Phrases Mastered</span>
                {lastLessonProgressPercent === 100 && <span className="text-amber-600 flex items-center gap-1">🌟 Golden Mastery</span>}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onResumeLesson(lastLesson.id)}
            className="w-full bg-deep-forest text-white py-5 rounded-[2rem] font-black text-xl hover:brightness-110 shadow-xl mt-8 transition-all active:scale-[0.98] flex items-center justify-center gap-3 animate-pulse hover:animate-none"
          >
            Resume Lesson <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="lg:col-span-4 bg-white p-10 rounded-[3.5rem] border border-brand-green/10 card-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 opacity-5 text-brand-green rotate-12">
            <Trophy size={200} />
          </div>
          <h4 className="font-black text-brand-green uppercase tracking-widest text-sm mb-8">Sabahan Warrior Stats</h4>
          <div className="space-y-10 relative z-10">
            <div>
              <p className="text-6xl font-black text-brand-green leading-none">{activeUser.phrases_learned || 0}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 underline decoration-accent-sand decoration-2">Words Learned</p>
            </div>
            <div>
              <p className="text-6xl font-black text-brand-green leading-none">{(activeUser.xp || 0).toLocaleString()}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 underline decoration-accent-sand decoration-2">XP Points</p>
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

function ExplorerScreen({ 
  onStartLesson, 
  completedLessonIds = [],
  bestScores = {}
}: { 
  onStartLesson: (lesson: Lesson) => void, 
  completedLessonIds?: string[],
  bestScores?: Record<string, number>
}) {
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
        {LESSONS.map((lesson) => {
          const totalPhrases = lesson.phrases.length;
          const bestScore = bestScores[lesson.id] || 0;
          const progress = totalPhrases > 0 ? Math.round((bestScore / totalPhrases) * 100) : 0;
          const isCompleted = progress === 100;
 
          return (
            <button 
              key={lesson.id}
              onClick={() => onStartLesson(lesson)}
              className="bg-white p-10 rounded-[3rem] text-left border border-brand-green/10 hover:border-brand-green/30 hover:-translate-y-2 transition-all group relative overflow-hidden card-shadow"
            >
              {isCompleted && (
                <div className="absolute top-8 right-8">
                  <CheckCircle className="text-brand-green fill-soft-green animate-bounce" size={32} />
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
                  <span>{progress}% Unlocked</span>
                </div>
                <div className="h-4 bg-brand-warm-white rounded-full overflow-hidden border border-brand-green/5 p-[2px] shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-brand-green rounded-full shadow-[0_0_12px_rgba(45,106,79,0.3)]"
                    style={{ backgroundColor: "#2D6A4F" }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function LessonScreen({ 
  lesson, 
  onComplete, 
  onExit,
  masteredPhraseIds = [],
  onPhraseMastered
}: { 
  lesson: Lesson, 
  onComplete: (correctPhraseIds: string[], score: number) => void, 
  onExit: () => void, 
  masteredPhraseIds?: string[],
  onPhraseMastered?: (phraseId: string) => void,
  key?: string 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wrongOptions, setWrongOptions] = useState<string[]>([]);
  const [correctPhraseIdsThisSession, setCorrectPhraseIdsThisSession] = useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [mode, setMode] = useState<"learning" | "quiz">("learning");
  const [quizType, setQuizType] = useState<"kto_bm" | "kto_en" | "bmto_k" | "ento_k">("kto_bm");
  const [quizOrder, setQuizOrder] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (mode === "quiz") {
      const order = Array.from({ length: lesson.phrases.length }, (_, i) => i);
      setQuizOrder(order.sort(() => Math.random() - 0.5));
      setCorrectAnswersCount(0);
      setQuizFinished(false);
      setCurrentIndex(0);
      setSelectedOption(null);
      setWrongOptions([]);
      setIsAnswered(false);
      setIsAnswerCorrect(null);
    }
  }, [mode, lesson.phrases.length]);

  const currentPhraseIndex = mode === "learning" ? currentIndex : quizOrder[currentIndex] ?? 0;
  const currentPhrase = lesson.phrases[currentPhraseIndex];
  
  const options = React.useMemo(() => {
    let correctText = "";
    
    // Get local references of phrases from the same category as the current lesson
    const sameCatPhrases = lesson.phrases.filter(p => p.id !== currentPhrase.id);
    // Get phrases from other lessons/categories
    const diffCatPhrases = DICTIONARY.filter(p => !lesson.phrases.some(lp => lp.id === p.id));

    let sameCatPool: string[] = [];
    let diffCatPool: string[] = [];

    if (quizType === "kto_bm") {
      correctText = currentPhrase.meaningBM;
      sameCatPool = sameCatPhrases.map(p => p.meaningBM);
      diffCatPool = diffCatPhrases.map(p => p.meaningBM);
    } else if (quizType === "kto_en") {
      correctText = currentPhrase.meaningEN;
      sameCatPool = sameCatPhrases.map(p => p.meaningEN);
      diffCatPool = diffCatPhrases.map(p => p.meaningEN);
    } else if (quizType === "bmto_k") {
      correctText = currentPhrase.phrase;
      sameCatPool = sameCatPhrases.map(p => p.phrase);
      diffCatPool = diffCatPhrases.map(p => p.phrase);
    } else if (quizType === "ento_k") {
      correctText = currentPhrase.phrase;
      sameCatPool = sameCatPhrases.map(p => p.phrase);
      diffCatPool = diffCatPhrases.map(p => p.phrase);
    }

    // Filter out the correct answer and eliminate duplicate strings
    const cleanSamePool = Array.from(new Set(sameCatPool.filter(t => t && t.trim() !== "" && t !== correctText)));
    const cleanDiffPool = Array.from(new Set(diffCatPool.filter(t => t && t.trim() !== "" && t !== correctText)));

    // Select 2 wrong options from the same category
    const shuffledSame = [...cleanSamePool].sort(() => Math.random() - 0.5);
    const chosenSame = shuffledSame.slice(0, 2);

    // Filter chosen same-category options out of different-category pool to prevent any duplicates
    const cleanDiffPoolFiltered = cleanDiffPool.filter(t => !chosenSame.includes(t));
    const shuffledDiff = [...cleanDiffPoolFiltered].sort(() => Math.random() - 0.5);
    const chosenDiff = shuffledDiff.slice(0, 1);

    // Combine them
    let distractors = [...chosenSame, ...chosenDiff];

    // Fallbacks to guarantee exactly 3 distractors if some pools are too small (highly unlikely given DICTIONARY sizes)
    if (distractors.length < 3) {
      const remainingSame = shuffledSame.filter(t => !distractors.includes(t));
      distractors = [...distractors, ...remainingSame];
    }
    if (distractors.length < 3) {
      const remainingDiff = shuffledDiff.filter(t => !distractors.includes(t));
      distractors = [...distractors, ...remainingDiff];
    }

    // Limit to exactly 3 unique distractors
    distractors = Array.from(new Set(distractors)).slice(0, 3);

    const finalOptions = [
      { text: correctText, correct: true },
      ...distractors.map(text => ({ text, correct: false }))
    ];

    // Perfect structural shuffle to fully randomize position of the correct option
    for (let i = finalOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = finalOptions[i];
      finalOptions[i] = finalOptions[j];
      finalOptions[j] = temp;
    }

    return finalOptions;
  }, [currentIndex, currentPhrase, mode, quizType, lesson]);

  const handleOptionClick = (option: { text: string, correct: boolean }) => {
    if (isAnswered) return;

    setSelectedOption(option.text);
    setIsAnswered(true);
    setIsAnswerCorrect(option.correct);

    if (option.correct) {
      toast.success("Tepat sekali! Correct!");
      setCorrectAnswersCount(prev => prev + 1);
      
      const phraseId = currentPhrase.id;
      // Triggers mastered state update cleanly
      if (!correctPhraseIdsThisSession.includes(phraseId)) {
        setCorrectPhraseIdsThisSession(prev => [...prev, phraseId]);
        if (onPhraseMastered) {
          onPhraseMastered(phraseId);
        }
      }
    } else {
      toast.error("Salah! Proceeding automatically...");
      setWrongOptions(prev => prev.includes(option.text) ? prev : [...prev, option.text]);
    }

    // Automatically proceed with timing feedback
    setTimeout(() => {
      if (currentIndex < lesson.phrases.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setWrongOptions([]);
        setIsAnswered(false);
        setIsAnswerCorrect(null);
        setQuizType(["kto_bm", "kto_en", "bmto_k", "ento_k"][Math.floor(Math.random() * 4)] as any);
      } else {
        const finalScore = correctAnswersCount + (option.correct ? 1 : 0);
        onComplete(correctPhraseIdsThisSession, finalScore);
        setQuizFinished(true);
      }
    }, 1500);
  };

  const handleRetryQuiz = () => {
    const order = Array.from({ length: lesson.phrases.length }, (_, i) => i);
    setQuizOrder(order.sort(() => Math.random() - 0.5));
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setWrongOptions([]);
    setIsAnswered(false);
    setIsAnswerCorrect(null);
  };

  const next = () => {
    if (mode === "learning") {
      if (currentIndex < lesson.phrases.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsRevealed(false);
      } else {
        setMode("quiz");
      }
    }
  };

  const back = () => {
    if (mode === "learning") {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsRevealed(false);
      }
    }
  };

  if (quizFinished) {
    const totalCount = lesson.phrases.length;
    const scorePercent = Math.round((correctAnswersCount / totalCount) * 100);
    
    let motivationalMessage = "";
    let motivationalSub = "";
    if (scorePercent === 100) {
      motivationalMessage = "🌟 Golden Mastery Achieved!";
      motivationalSub = "Tepat sekali! You correctly answered every ancestral challenge. The voices of your elders echo proudly in you.";
    } else if (scorePercent >= 70) {
      motivationalMessage = "✨ High Heritage Guardian!";
      motivationalSub = "Outstanding effort! You have a solid grasp of this dialect. Continue to nourish this connection.";
    } else if (scorePercent >= 40) {
      motivationalMessage = "🌱 Descendant Practitioner!";
      motivationalSub = "A respectable milestone! Every word learned is a thread of your cultural fabric restored.";
    } else {
      motivationalMessage = "🍂 Cultural Journey Seeker";
      motivationalSub = "Do not be discouraged. Reclaiming our tongue takes courage and practice. Your roots are waiting.";
    }

    return (
      <div className="fixed inset-0 bg-brand-warm-white z-50 flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-2xl w-full p-10 md:p-14 rounded-[3.5rem] border-2 border-brand-green/10 shadow-2xl relative text-center space-y-8"
        >
          <div className="absolute top-10 right-10 opacity-10 text-brand-green">
            <Trophy size={80} />
          </div>

          <div className="space-y-3">
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-accent-brown opacity-60">Entrance Quiz Completed</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-green leading-tight">{lesson.title} Results</h2>
          </div>

          <div className="py-10 bg-soft-green/50 rounded-[2.5rem] border border-brand-green/10 space-y-4">
            <p className="text-6xl font-black text-brand-green">{correctAnswersCount} / {totalCount}</p>
            <p className="text-xl font-bold text-deep-forest">{scorePercent}% Mastery Score</p>
          </div>

          <div className="space-y-2 px-4">
            <h4 className="text-2xl font-black text-deep-forest underline decoration-accent-sand decoration-2">{motivationalMessage}</h4>
            <p className="text-deep-forest/60 italic leading-relaxed text-sm md:text-base font-cultural">
              "{motivationalSub}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleRetryQuiz}
              className="w-full bg-brand-green/10 text-brand-green font-black uppercase tracking-widest text-lg py-5 rounded-3xl border border-brand-green/20 hover:bg-brand-green/20 active:scale-95 transition-all text-center"
            >
              🔄 Retry Quiz
            </button>
            <button
              onClick={onExit}
              className="w-full bg-brand-green text-white font-black uppercase tracking-widest text-lg py-5 rounded-3xl shadow-xl hover:brightness-110 active:scale-95 transition-all text-center"
            >
              ← Back to Lessons
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalSteps = lesson.phrases.length * 2;
  const currentStep = mode === "learning" ? currentIndex + 1 : lesson.phrases.length + currentIndex + 1;

  return (
    <div className="fixed inset-0 bg-brand-warm-white z-50 flex flex-col">
      <header className="h-20 p-8 flex items-center justify-between border-b border-brand-green/10 bg-white">
        <button onClick={onExit} className="p-3 text-brand-green hover:bg-soft-green rounded-2xl transition-all hover:rotate-90">
          <X size={28} />
        </button>
        <div className="flex-1 max-w-xl mx-10">
          <div className="h-4 bg-brand-warm-white rounded-full overflow-hidden border-2 border-brand-green/5 p-[2px] shadow-inner">
            <motion.div 
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              className="h-full bg-brand-green rounded-full shadow-[0_0_15px_rgba(45,106,79,0.4)]"
            />
          </div>
        </div>
        <span className="text-sm font-black text-brand-green uppercase tracking-[0.2em] hidden sm:block">
          {mode === "learning" ? "Learning" : "Quiz"} {currentIndex + 1}/{lesson.phrases.length}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-14 space-y-8 max-w-4xl mx-auto w-full pb-32">
        {mode === "learning" ? (
          <motion.div 
            key={`learning-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3.5rem] shadow-2xl border-2 border-brand-green/5 overflow-hidden transition-all duration-500"
          >
            <div className="p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-brown opacity-40">Dialect Phrase</span>
              <h3 className="text-6xl md:text-8xl font-black text-brand-green leading-none tracking-tighter">{currentPhrase.phrase}</h3>
              
              <button 
                onClick={() => setIsRevealed(!isRevealed)}
                className={cn(
                  "px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3",
                  isRevealed ? "bg-soft-green text-brand-green" : "bg-brand-green text-white shadow-xl"
                )}
              >
                {isRevealed ? <CheckCircle size={20} /> : <Sparkles size={20} />}
                {isRevealed ? "Heritage Revealed" : "Reveal Ancestral Meaning"}
              </button>
            </div>

            <AnimatePresence>
              {isRevealed && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-brand-green text-white"
                >
                  <div className="p-12 md:p-16 space-y-10 relative">
                    <div className="absolute inset-0 pattern-bg opacity-10"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Pronunciation</p>
                          <p className="text-3xl font-mono tracking-wider italic">/{currentPhrase.pronunciation}/</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Bahasa Malaysia</p>
                          <p className="text-4xl font-black uppercase">{currentPhrase.meaningBM}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">English</p>
                          <p className="text-3xl font-black opacity-80 decoration-accent-sand decoration-2 underline underline-offset-4 tracking-tight">"{currentPhrase.meaningEN}"</p>
                        </div>
                      </div>

                      <div className="bg-white/10 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md space-y-4">
                        <p className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Cultural Note</p>
                        <p className="text-lg font-medium leading-relaxed italic font-cultural">
                          {currentPhrase.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.section 
            key={`quiz-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10 bg-white p-12 rounded-[4rem] border-2 border-brand-green/10 shadow-2xl card-shadow"
          >
            <div className="text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-brown opacity-40">Ancestral Challenge Challenge</span>
              {quizType === "kto_bm" && (
                <>
                  <h3 className="text-4xl font-black text-brand-green">What is the meaning in Malay?</h3>
                  <p className="text-5xl font-black text-deep-forest py-6">"{currentPhrase.phrase}"</p>
                </>
              )}
              {quizType === "kto_en" && (
                <>
                  <h3 className="text-4xl font-black text-brand-green">What is the meaning in English?</h3>
                  <p className="text-5xl font-black text-deep-forest py-6">"{currentPhrase.phrase}"</p>
                </>
              )}
              {quizType === "bmto_k" && (
                <>
                  <h3 className="text-4xl font-black text-brand-green">How do you say in Kadazandusun?</h3>
                  <p className="text-5xl font-black text-deep-forest py-6">"{currentPhrase.meaningBM}"</p>
                </>
              )}
              {quizType === "ento_k" && (
                <>
                  <h3 className="text-4xl font-black text-brand-green">How do you say in Kadazandusun?</h3>
                  <p className="text-5xl font-black text-deep-forest py-6">"{currentPhrase.meaningEN}"</p>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((opt) => {
                const hasMatchedCorrect = isAnswered;
                const isSelectedCorrect = isAnswered && opt.correct;
                const isSelectedAndWrong = isAnswered && opt.text === selectedOption && !opt.correct;

                return (
                  <button
                    key={opt.text}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(opt)}
                    className={cn(
                      "p-6 rounded-[2rem] border-4 text-left transition-all font-black text-xl md:text-2xl shadow-sm",
                      isSelectedCorrect
                        ? "bg-green-600 border-green-800 text-white shadow-2xl scale-[1.03] -translate-y-1"
                        : (isSelectedAndWrong
                          ? "bg-red-500 border-red-700 text-white shadow-md scale-95"
                          : "bg-brand-warm-white border-transparent hover:border-accent-sand/30 text-deep-forest hover:bg-soft-green hover:scale-[1.01]")
                    )}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-10">
          <button 
            disabled={currentIndex === 0 || mode === "quiz" || isAnswered}
            onClick={back}
            className="px-10 py-5 text-brand-green font-black uppercase tracking-widest disabled:opacity-20 disabled:pointer-events-none hover:bg-soft-green rounded-3xl transition-all active:scale-95"
          >
            ← Back
          </button>
          
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
            disabled={mode === "quiz" || isAnswered}
            className={cn(
              "px-16 py-6 rounded-full font-black text-2xl shadow-[0_20px_50px_rgba(27,67,50,0.4)] transition-all transform active:scale-90 hover:scale-105",
              mode === "quiz" ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" : "bg-deep-forest text-white hover:brightness-125"
            )}
          >
            {mode === "learning" ? (currentIndex === lesson.phrases.length - 1 ? "Start Entrance Quiz →" : "Proceed →") : "Proceeding Automatically..."}
          </button>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="h-4 w-full woven-border opacity-50 absolute bottom-0 left-0"></div>
    </div>
  );
}

function CommunityScreen({ posts, onNewPost }: { posts: any[], onNewPost: (post: any) => void | Promise<void> }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    phrase: "",
    meaning: "",
    dialect: "Kadazan-Dusun",
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
    setFormData({ phrase: "", meaning: "", dialect: "Kadazan-Dusun", origin: "", note: "" });
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
function ProfileScreen({ 
  user, 
  favourites, 
  onToggleFavourite,
  masteredPhraseIds = [],
  bestScores = {},
  hasSubmittedPost = false
}: { 
  user: any, 
  favourites: Phrase[], 
  onToggleFavourite: (phrase: Phrase) => void,
  masteredPhraseIds?: string[],
  bestScores?: Record<string, number>,
  hasSubmittedPost?: boolean
}) {
  const defaultUser = {
    streak: 0,
    xp: 0,
    activity: [
      { day: "Mon", count: 0 },
      { day: "Tue", count: 0 },
      { day: "Wed", count: 0 },
      { day: "Thu", count: 0 },
      { day: "Fri", count: 0 },
      { day: "Sat", count: 0 },
      { day: "Sun", count: 0 },
    ]
  };
  const activeUser = user || defaultUser;

  // 1. Definition of the 8 required categories
  const categoriesList = [
    { name: "Greetings", id: "l1" },
    { name: "Family", id: "l2" },
    { name: "Numbers", id: "l4" },
    { name: "Colours", id: "l3" },
    { name: "Body Parts", id: "l5" },
    { name: "Food", id: "l9" },
    { name: "Nature", id: "l10" },
    { name: "Celebrations", id: "l11" }
  ];

  // 2. Map progress calculation for each category using bestScores
  const categoryProgressMap = categoriesList.map((cat) => {
    const matchingLesson = LESSONS.find(l => l.id === cat.id || l.title === cat.name);
    const totalPhrases = matchingLesson ? matchingLesson.phrases.length : 8;
    const completedPhrases = matchingLesson ? (bestScores[matchingLesson.id] || 0) : 0;
    const percent = totalPhrases > 0 ? Math.round((completedPhrases / totalPhrases) * 100) : 0;
    return { 
      ...cat, 
      totalPhrases, 
      completedPhrases, 
      percent, 
      isCompleted: percent === 100 
    };
  });

  // 3. Derived Metrics based on true progress state
  const completedLessonsCount = categoryProgressMap.filter(c => c.isCompleted).length;
  const wordsLearnedCount = Object.values(bestScores).reduce((sum, val) => sum + (val || 0), 0);
  const currentStreak = activeUser.streak || 0;
  const coloursLessonComplete = categoryProgressMap.find(c => c.name === "Colours")?.isCompleted || false;
  const allCategoriesComplete = completedLessonsCount >= 8;
  const isWisdomSharer = hasSubmittedPost || false;

  // 4. Achievement Badges List (Exactly 6 specified badges)
  const badges = [
    {
      id: "badge-first-step",
      name: "First Step",
      description: "Complete 1 full lesson of your heritage",
      unlocked: completedLessonsCount >= 1,
      icon: "🌱"
    },
    {
      id: "badge-word-collector",
      name: "Word Collector",
      description: "Secure 15 words in your local memory",
      unlocked: wordsLearnedCount >= 15,
      icon: "📚"
    },
    {
      id: "badge-7-day-streak",
      name: "7-Day Streak",
      description: "Maintain a sacred 7-day memory streak",
      unlocked: currentStreak >= 7,
      icon: "🔥"
    },
    {
      id: "badge-colour-master",
      name: "Colour Master",
      description: "Master all Sabah colours (100% Colours)",
      unlocked: coloursLessonComplete,
      icon: "🎨"
    },
    {
      id: "badge-heritage-guardian",
      name: "Heritage Guardian",
      description: "Restore all 8 categories to golden mastery",
      unlocked: allCategoriesComplete,
      icon: "🛡️"
    },
    {
      id: "badge-wisdom-sharer",
      name: "Wisdom Sharer",
      description: "Submit a custom ancestral phrase to Community Hub",
      unlocked: isWisdomSharer,
      icon: "💬"
    }
  ];

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
          K
        </div>
        <div className="text-center md:text-left space-y-4 relative z-10">
          <h2 className="text-5xl font-black text-brand-green tracking-tight leading-none">Kadazan-Dusun Warrior</h2>
          <p className="text-deep-forest/40 font-bold text-xl italic font-cultural leading-tight">"A descendant reclaiming what was once unheard."</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
            <span className="bg-soft-green px-8 py-3 rounded-2xl text-sm font-black text-brand-green flex items-center gap-3 shadow-sm border border-brand-green/5">
              <Flame size={22} className="text-orange-500 animate-pulse" /> {currentStreak} Day Streak
            </span>
            <span className="bg-soft-green px-8 py-3 rounded-2xl text-sm font-black text-brand-green flex items-center gap-3 shadow-sm border border-brand-green/5">
              <Trophy size={22} className="text-accent-sand" /> {activeUser.xp || 0} XP Points
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

      {/* Favourites Section */}
      <section className="bg-white p-12 rounded-[4rem] border border-brand-green/10 shadow-sm space-y-10 card-shadow">
        <h3 className="text-3xl font-black text-deep-forest flex items-center gap-4">
          <span className="text-accent-sand text-4xl">⭐</span> Preserved Favourites
        </h3>
        
        {favourites.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-brand-warm-white rounded-[3rem] border-2 border-dashed border-brand-green/10">
            <p className="text-2xl font-bold text-brand-green/40 italic">"No wisdom preserved yet..."</p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Star phrases in the Home Hub or Dictionary to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favourites.map((phrase) => (
              <div key={phrase.id} className="p-8 bg-brand-warm-white rounded-[2.5rem] border border-brand-green/5 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-3xl font-black text-brand-green">{phrase.phrase}</h4>
                    <button 
                      onClick={() => onToggleFavourite(phrase)}
                      className="text-brand-green hover:text-red-500 transition-colors"
                      title="Unfavourite"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-sm font-mono text-accent-sand font-bold">/{phrase.pronunciation}/</p>
                  <div className="space-y-2 pt-4 border-t border-brand-green/5">
                    <p className="text-sm font-bold text-deep-forest"><span className="text-[10px] uppercase opacity-40 mr-2">BM:</span> {phrase.meaningBM}</p>
                    <p className="text-sm font-medium text-deep-forest/70 italic"><span className="text-[10px] uppercase opacity-40 mr-2">EN:</span> "{phrase.meaningEN}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Lessons Progress Card */}
        <div className="bg-white p-12 rounded-[4rem] border border-brand-green/10 shadow-sm space-y-10 card-shadow relative overflow-hidden group">
          <div className="absolute top-10 right-10 text-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Library size={100} />
          </div>
          <h3 className="text-3xl font-black text-deep-forest flex items-center gap-4">
            <span className="text-brand-green text-4xl">📚</span> Lessons Progress
          </h3>
          
          <div className="space-y-8">
            {categoryProgressMap.map((cat) => {
              return (
                <div key={cat.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-xl text-deep-forest">{cat.name}</span>
                      {cat.isCompleted && (
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black border border-amber-300 flex items-center gap-1.5 shadow-sm">
                          <span className="text-amber-500">🏆</span>
                          <span>Complete</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-black text-deep-forest/40 uppercase tracking-widest block">
                      {cat.completedPhrases} / {cat.totalPhrases} phrases
                    </span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-4 bg-brand-warm-white rounded-full overflow-hidden border border-brand-green/5 p-[2px] shadow-inner relative flex items-center">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percent}%` }}
                      className="h-full bg-brand-green rounded-full shadow-[0_0_12px_rgba(45,106,79,0.3)]"
                      style={{ backgroundColor: "#2D6A4F" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Achievements Badges Section */}
        <div className="bg-white p-12 rounded-[4rem] border border-brand-green/10 shadow-sm space-y-10 card-shadow overflow-hidden relative">
          <div className="absolute bottom-[-50px] left-[-50px] opacity-5 text-accent-sand">
            <Trophy size={150} />
          </div>
          <h3 className="text-3xl font-black text-deep-forest relative z-10">Sacred Badges</h3>
          
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {badges.map((b) => (
              <div 
                key={b.id} 
                className={cn(
                  "p-8 rounded-[2.5rem] flex flex-col items-center text-center gap-4 border transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 relative",
                  b.unlocked 
                    ? "bg-white border-brand-green/20" 
                    : "bg-gray-55 border-gray-100 opacity-60"
                )}
              >
                <div 
                  className={cn(
                    "w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-md transition-transform relative",
                    b.unlocked 
                      ? "bg-soft-green ring-8 ring-soft-green/50 animate-pulse text-brand-green" 
                      : "bg-gray-200 text-gray-400"
                  )}
                >
                  <span>{b.icon}</span>
                  
                  {/* Badge Unlocked Status Checkmark or Lock */}
                  {b.unlocked ? (
                    <div className="absolute -bottom-1 -right-1 bg-brand-green text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 border-white shadow-md">
                      ✓
                    </div>
                  ) : (
                    <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <Lock size={10} className="stroke-[3]" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className={cn("text-base font-black leading-tight tracking-tight", b.unlocked ? "text-brand-green" : "text-gray-500")}>
                    {b.name}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="bg-deep-forest text-white p-14 rounded-[4.5rem] shadow-[0_40px_80px_-20px_rgba(27,67,50,0.5)] grid grid-cols-2 gap-12 relative overflow-hidden group border-b-8 border-accent-sand">
        <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000 scale-150">
          <div className="w-full h-full pattern-bg"></div>
        </div>
        <div className="space-y-4 relative z-10">
          <p className="text-7xl md:text-9xl font-black tracking-tighter text-accent-sand drop-shadow-2xl leading-none">{completedLessonsCount}</p>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white/40 border-l-4 border-accent-sand/40 pl-4">Lessons Transmitted</p>
        </div>
        <div className="space-y-4 relative z-10 text-right">
          <p className="text-7xl md:text-9xl font-black tracking-tighter text-accent-sand drop-shadow-2xl leading-none">{wordsLearnedCount}</p>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-white/40 border-r-4 border-accent-sand/40 pr-4">Words Learned</p>
        </div>
      </div>
    </motion.div>
  );
}

function DictionaryScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", "Greetings", "Family", "Numbers", "Colours", "Body Parts", "Food", "Nature", "Celebrations"];

  const sortedDictionary = React.useMemo(() => {
    return [...DICTIONARY].sort((a, b) => a.phrase.localeCompare(b.phrase));
  }, []);

  const filtered = sortedDictionary.filter(item => {
    const matchesSearch = 
      item.phrase.toLowerCase().includes(search.toLowerCase()) || 
      item.meaningBM.toLowerCase().includes(search.toLowerCase()) ||
      item.meaningEN.toLowerCase().includes(search.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(search.toLowerCase()));
    
    const matchesLetter = filter === "All" || item.phrase.toUpperCase().startsWith(filter);
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    
    return matchesSearch && matchesLetter && matchesCategory;
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-10 pb-10"
    >
      <header className="space-y-1">
        <h2 className="text-4xl font-black text-brand-green tracking-tight">Ancestral Dictionary</h2>
        <p className="text-deep-forest/40 text-lg font-medium italic">Search through the collected wisdom of Kadazan-Dusun.</p>
      </header>

      <div className="bg-white p-8 rounded-[3rem] border border-brand-green/10 card-shadow space-y-8">
        <div className="space-y-6">
          <div className="relative z-30">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-green/40 pointer-events-none" size={24} />
            <input 
              type="text"
              placeholder="Search words, meanings, or categories..."
              className="w-full bg-brand-warm-white py-5 pl-16 pr-8 rounded-2xl outline-none focus:ring-4 ring-brand-green/10 border-2 border-transparent focus:border-brand-green/20 transition-all font-bold placeholder:opacity-30 relative z-30 cursor-text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar relative z-20">
              <button 
                onClick={() => setFilter("All")}
                className={cn(
                  "px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                  filter === "All" ? "bg-brand-green text-white shadow-lg" : "bg-soft-green text-brand-green hover:bg-brand-green/10"
                )}
              >
                All
              </button>
              {alphabet.map(letter => (
                <button 
                  key={letter}
                  onClick={() => setFilter(letter)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-xl font-bold text-xs uppercase transition-all shrink-0",
                    filter === letter ? "bg-brand-green text-white shadow-lg" : "bg-soft-green text-brand-green hover:bg-brand-green/10"
                  )}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 relative z-20">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    categoryFilter === cat ? "bg-brand-green text-white shadow-md" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-brand-warm-white/50 p-6 rounded-[2rem] border border-brand-green/5 group hover:border-brand-green/20 hover:bg-white transition-all card-shadow shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-black text-brand-green leading-tight">{item.phrase}</h4>
                    <span className="text-[9px] font-black text-accent-brown uppercase tracking-widest bg-accent-sand/20 px-3 py-1 rounded-full whitespace-nowrap">
                      {item.category || "General"}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-accent-sand italic">/{item.pronunciation}/</p>
                  <div className="space-y-2 border-t border-brand-green/5 pt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter w-6">BM</span>
                      <p className="text-sm font-bold text-deep-forest">{item.meaningBM}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter w-6">EN</span>
                      <p className="text-sm font-bold text-deep-forest opacity-60 italic">"{item.meaningEN}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <Search className="mx-auto text-gray-200" size={64} />
              <p className="text-deep-forest/40 font-bold italic">"This word has not yet returned to the library."</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
