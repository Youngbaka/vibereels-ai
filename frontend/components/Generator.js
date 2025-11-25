import { useState } from 'react';

export default function Generator({ onGenerate, loading }) {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('spiritual');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(text, style);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur p-6 rounded-xl w-full max-w-md">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text/quote here..."
        className="w-full h-32 p-4 bg-white/20 rounded-lg text-white placeholder-gray-300 mb-4"
        required
      />
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="w-full p-3 bg-white/20 rounded-lg text-white mb-4"
      >
        <option value="spiritual">Spiritual/Manifestation</option>
        <option value="luxury">Luxury/Motivational</option>
        <option value="gym">Gym/Hustle</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-bold disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Create Viral Short'}
      </button>
    </form>
  );
}
