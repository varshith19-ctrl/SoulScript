import { useState } from 'react';
import axios from 'axios';

export default function JournalForm({ onNewEntry }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !mood) return alert('Please fill in both mood and text');

    try {
      const res = await axios.post('http://localhost:5001/api/journal', { text, mood });
      onNewEntry(res.data);
      setText('');
      setMood('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-lg p-4 mb-6 border-cyan-800 border-5">
      <div className="form-control mb-4">
        <textarea
          className="textarea textarea-bordered"
          rows="4"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-control mb-4">
        <input
          className="input input-bordered"
          type="text"
          placeholder="Your Mood (e.g., Happy, Anxious)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Submit Entry</button>
    </form>
  );
}
