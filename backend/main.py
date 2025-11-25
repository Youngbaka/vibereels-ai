from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from elevenlabs import generate, save
from moviepy.editor import *
import os
import json
from dotenv import load_dotenv
import subprocess  # For Remotion

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class GenerateRequest(BaseModel):
    text: str
    style: str

@app.post("/generate")
async def generate_video(req: GenerateRequest):
    # Step 1: LLM for script/JSON
    with open("prompts/system_prompt.txt", "r") as f:
        prompt = f.read().format(text=req.text, style=req.style)
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    script_json = json.loads(response.choices[0].message.content)  # Assume JSON output
    
    # Step 2: Generate VO audio
    vo_audio = generate(
        text=script_json["voiceover_script"],
        voice="Rachel",  # Free ElevenLabs voice
        model="eleven_monolingual_v1"
    )
    audio_path = "temp_audio.mp3"
    save(vo_audio, audio_path)
    
    # Step 3: Render video with Remotion
    template = f"video-templates/{req.style}-manifestation.js"
    subprocess.run(["npx", "remotion", "render", template, "out.mp4", "--props", json.dumps(script_json)])
    
    # Step 4: Composite with MoviePy (add audio + captions)
    video = VideoFileClip("out.mp4")
    audio = AudioFileClip(audio_path)
    final_video = video.set_audio(audio)
    # Simple caption overlay (expand as needed)
    final_path = "final_video.mp4"
    final_video.write_videofile(final_path, fps=30)
    
    # Cleanup
    os.remove(audio_path)
    os.remove("out.mp4")
    
    return {"video_url": f"/static/{final_path}"}  # Serve static in prod

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
