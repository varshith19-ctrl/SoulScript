import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function JournalForm({ onNewEntry }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/journal`,
        { text, mood }
      );

      onNewEntry(response.data);
      setText('');
      setMood('');
      toast.success('Entry submitted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Submission failed. Try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-red-100/80 shadow-lg rounded-xl p-6 mb-4 w-full max-w-[600px] mx-auto min-h-[260px]"
    >
      <div className="mb-4">
        <textarea
          className="w-full p-3 border rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-sm min-h-[100px] bg-calm-blue"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Mood (e.g., Happy, Relaxed)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
          className="w-full p-3 border rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm bg-calm-blue"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        Submit Entry
      </button>
    </form>
  );
}