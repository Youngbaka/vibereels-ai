# VibeReels AI 🚀
Turn any text into viral TikTok/YouTube Shorts in seconds. Built with Next.js, FastAPI, Remotion, and AI magic.

## Quick Start (5 mins)
1. **Frontend:** `cd frontend && npm install && npm run dev` (runs on http://localhost:3000)
2. **Backend:** `cd backend && pip install -r requirements.txt && uvicorn main:app --reload` (runs on http://localhost:8000)
3. Get free API keys:
   - OpenAI: https://platform.openai.com/api-keys
   - ElevenLabs: https://elevenlabs.io (free tier: 10k chars/mo)
4. Add keys to `.env` in backend: `OPENAI_API_KEY=sk-...` and `ELEVENLABS_API_KEY=...`
5. Generate! Paste text → Click button → Download MP4.

## Deploy (Free)
- **Frontend:** Push to GitHub → Connect to Vercel (free hosting).
- **Backend:** Deploy to Render.com (free tier) or Railway.
- **Video Render:** Use Vercel for Remotion (serverless).

## How It Works
1. User inputs text on frontend.
2. Frontend calls backend API `/generate`.
3. Backend uses OpenAI to create JSON script/shot list.
4. Remotion renders video from template + script.
5. ElevenLabs generates VO audio.
6. FFmpeg composites: video + audio + captions → MP4 download.

## Templates
- Add more in `/video-templates/` (e.g., gym-motivation.js).
- Styles: spiritual, luxury, motivational (expandable).

## Tech Stack
- Frontend: Next.js 14 + Tailwind
- Backend: FastAPI + OpenAI
- Video: Remotion + FFmpeg
- Audio: ElevenLabs

Built by [Your Name] – Fork & Star! ⭐
