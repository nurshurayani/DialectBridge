import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database for the session
  const state = {
    user: {
      dialect: "Kadazan",
      xp: 450,
      streak: 5,
      lessonsCompleted: 12,
      phrasesLearned: 84,
      activity: [
        { day: "Mon", count: 12 },
        { day: "Tue", count: 8 },
        { day: "Wed", count: 15 },
        { day: "Thu", count: 20 },
        { day: "Fri", count: 5 },
        { day: "Sat", count: 0 },
        { day: "Sun", count: 0 },
      ],
      achievements: [
        { id: "1", name: "First Lesson", icon: "CheckCircle", description: "Completed your first lesson" },
        { id: "2", name: "7-Day Streak", icon: "Flame", description: "Practiced for 7 days in a row" },
      ]
    },
    communitySubmissions: [
      {
        id: "1",
        name: "Arthur L.",
        origin: "Penampang",
        phrase: "Kopiwosion",
        meaning: "Greetings / Good day",
        dialect: "Kadazan",
        upvotes: 15,
        note: "Used formally when meeting elders."
      },
      {
        id: "2",
        name: "Siti A.",
        origin: "Kota Belud",
        phrase: "Nokuro ko?",
        meaning: "Why?",
        dialect: "Bajau",
        upvotes: 8,
        note: "Commonly used in daily conversations."
      }
    ]
  };

  // API Routes
  app.get("/api/user", (req, res) => {
    res.json(state.user);
  });

  app.get("/api/community", (req, res) => {
    res.json(state.communitySubmissions);
  });

  app.post("/api/community", (req, res) => {
    const newSubmission = {
      id: Date.now().toString(),
      upvotes: 0,
      ...req.body
    };
    state.communitySubmissions.unshift(newSubmission);
    res.status(201).json(newSubmission);
  });

  app.post("/api/user/complete-lesson", (req, res) => {
    state.user.xp += 50;
    state.user.lessonsCompleted += 1;
    state.user.phrasesLearned += 8;
    // Update activity for "today" (simple mock logic)
    state.user.activity[6].count += 8;
    res.json(state.user);
  });

  // Gemini API proxy (optional placeholder for real logic)
  app.post("/api/gemini/tts", async (req, res) => {
    const { text } = req.body;
    // In a real app, we'd use gemini-3.1-flash-tts-preview
    // But since this is a mock/starter, we'll return a successful status
    res.json({ success: true, message: "AI audio requested" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
