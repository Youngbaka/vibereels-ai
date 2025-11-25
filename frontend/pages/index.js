import { useState } from 'react';
import axios from 'axios';
import Generator from '../components/Generator';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = async (text, style) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/generate', { text, style });
      setVideoUrl(res.data.video_url);  // Backend returns signed URL
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">VibeReels AI</h1>
      <Generator onGenerate={handleGenerate} loading={loading} />
      {videoUrl && (
        <div className="mt-8">
          <video src={videoUrl} controls className="max-w-md rounded-lg" />
          <a href={videoUrl} download className="block mt-2 text-blue-400">Download MP4</a>
        </div>
      )}
    </div>
  );
}
