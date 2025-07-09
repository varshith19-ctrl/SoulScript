import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MoodChart({ entries }) {
  const [filter, setFilter] = useState('all');

  // Filter entries by selected time range
  const filteredEntries = entries.filter((entry) => {
    const days = {
      '7': 7,
      '30': 30,
      all: Infinity,
    }[filter];

    const daysAgo = (Date.now() - new Date(entry.createdAt)) / (1000 * 60 * 60 * 24);
    return daysAgo <= days;
  });

  // Convert moods to numeric values
  const formattedData = filteredEntries.map((entry, index) => ({
    name: `Instance ${index + 1}`,
    mood: moodToValue(entry.mood),
  }));

  // Convert mood string to numeric scale
  function moodToValue(mood) {
    switch (mood.toLowerCase()) {
      case 'depressed': return 1;
      case 'sad': return 1.2;
      case 'anxious': return 1.4;
      case 'angry': return 1.6;
      case 'confused': return 1.8;
      case 'tired': return 2;
      case 'bored': return 2.2;
      case 'neutral': return 2.5;
      case 'calm': return 2.8;
      case 'okay': return 3;
      case 'content': return 3.2;
      case 'grateful': return 3.5;
      case 'relaxed': return 3.6;
      case 'motivated': return 3.8;
      case 'focused': return 4;
      case 'excited': return 4.2;
      case 'hopeful': return 4.4;
      case 'happy': return 4.6;
      case 'cheerful': return 4.8;
      case 'joyful':
      case 'inspired': return 5;
      case 'lonely': return 1.5;
      default: return 2.5;
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
        <h2 className="text-xl font-semibold text-center text-white">🧘 Mood Over Time</h2>
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
          <YAxis
            domain={[1, 5]}
            tickCount={6}
            tickFormatter={(val) => {
              if (val >= 4.5) return "Joyful";
              if (val >= 3.5) return "Positive";
              if (val >= 2.5) return "Neutral";
              if (val >= 1.5) return "Anxious";
              return "Low";
            }}
          />
          <Tooltip
            formatter={(value) => {
              if (value >= 4.5) return ["Joyful / Inspired", "Mood"];
              if (value >= 3.5) return ["Positive (Happy, Grateful)", "Mood"];
              if (value >= 2.5) return ["Neutral", "Mood"];
              if (value >= 1.5) return ["Anxious / Lonely", "Mood"];
              return ["Sad / Depressed", "Mood"];
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#4ade80"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            animationDuration={3000}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
