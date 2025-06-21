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
    <form onSubmit={handleSubmit} className="card bg-[#0d0e3a] shadow-lg p-4 mb-2 sborder-5">
      <div className="form-control mb-4">
        <textarea
          className="textarea textarea-bordered bg-[#755e5f]"
          rows="4"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-control mb-4">
        <input
          className="input input-bordered bg-[#354a5f]"
          type="text"
          placeholder="Your Mood (e.g., Happy, Anxious)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </div>
      <button type="submit" className="btn bg-[#acc1d6] w-full">Submit Entry</button>
    </form>
  );
}
