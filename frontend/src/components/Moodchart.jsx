import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';
export default function MoodChart({ entries }) {
    const [filter, setFilter] = useState('all');

  const filteredEntries = entries.filter((entry) => {
    const days = {
      '7': 7,
      '30': 30,
      all: Infinity,
    }[filter];

    const daysAgo = (Date.now() - new Date(entry.createdAt)) / (1000 * 60 * 60 * 24);
    return daysAgo <= days;
  });
  const formattedData = filteredEntries.map((entry, index) => ({
    name: `instance ${index + 1}`,
    mood: moodToValue(entry.mood),
  }));

  function moodToValue(mood) {
    switch (mood.toLowerCase()) {
      case 'happy': return 3;
      case 'neutral': return 2;
      case 'sad': return 1;
      case 'anxious':return 1.5;
      case 'confused':return 1.55;
      default: return 2;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="card bg-linear-to-r from-[#160c1f] to-[rgb(77,79,146)] shadow-xl p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-center">🧘 Mood Over Time</h2>
        <select
          className="select select-sm select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
        </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 4]} tickFormatter={(val) => (
            val === 3 ? "Happy" : val === 2 ? "Neutral" : "Sad"
          )} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#4ade80"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
    
  );
}
