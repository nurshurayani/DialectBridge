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

  // API Routes (Now handled directly via Supabase on client, but kept for future extensions)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "DialectBridge API is healthy" });
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
