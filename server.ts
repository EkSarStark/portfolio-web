import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from './src/data/portfolioData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // SERIX AI Assistant API Route
  app.post('/api/serix-chat', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback response when key is not configured
        return res.json({
          reply: `[SERIX Local AI Core]: Sai Deepak Sarma is a B.Tech Computer Science student specializing in Local AI (Qwen, llama.cpp, CUDA), Linux systems, 3D/VFX in Blender (Geometry Nodes, Cycles, compositing), creative writing & worldbuilding (Omnian Chronicles), and research in paleogenomics and cosmic physics.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `
You are SERIX, the local AI assistant concept created by Sai Deepak Sarma.
Answer questions concisely, accurately, and politely based on Sai Deepak Sarma's portfolio profile:

Profile:
${PERSONAL_INFO.profileText}

Current Direction:
${PERSONAL_INFO.currentDirection}

Skills:
${JSON.stringify(SKILL_CATEGORIES, null, 2)}

Projects:
${JSON.stringify(PROJECTS, null, 2)}

Keep answers concise, technical, and directly referencing Sai's real experience. Do not invent unmentioned facts.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }
        ]
      });

      const text = response.text || "SERIX core processed your query successfully.";
      res.json({ reply: text });
    } catch (err: any) {
      console.error('SERIX API Error:', err);
      res.json({
        reply: `[SERIX Local Fallback]: Sai Deepak Sarma is a B.Tech Computer Science student combining software development, Linux, local AI (LM Studio, CUDA), Blender 3D/VFX, sci-fi worldbuilding (Omnian Chronicles), and scientific research.`
      });
    }
  });

  // Vite middleware for development vs production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
