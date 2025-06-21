import { useEffect } from "react";

export default function WellnessSuggestion({ entries, setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false); // hide navbar on this page
    return () => setShowNavbar(true); // show navbar when leaving
  }, []);
  function parseStars(tone) {
    const match = tone.match(/(\d+(\.\d+)?)/); // Extracts 3 from "3 stars"
    return match ? parseFloat(match[0]) : null;
  }

  function getSuggestion(avgStars) {
    if (avgStars === null) {
      return "Start journaling to receive personalized wellness tips!";
    }

    if (avgStars >= 4.5) {
      return "🌟 You're emotionally thriving! Keep practicing gratitude and spreading joy.";
    } else if (avgStars >= 3.5) {
      return "😊 You're doing quite well. Keep up your positive routines.";
    } else if (avgStars >= 2.5) {
      return "😐 A bit of emotional ups and downs — try regular mindfulness and journaling.";
    } else if (avgStars >= 1.5) {
      return "😟 You're going through something. Talk to someone or explore calming activities.";
    } else {
      return "💔 It seems you're overwhelmed. Reach out to a mental health professional.";
    }
  }

  const starValues = entries
    .map((entry) => parseStars(entry.aiTone))
    .filter((val) => val !== null);

  const avgStars =
    starValues.length > 0
      ? starValues.reduce((a, b) => a + b, 0) / starValues.length
      : null;

  const suggestion = getSuggestion(avgStars);

  return (
    <div className="bg-[#1234] p-4 shadow-lg rounded-lg my-6 mt-50 ">
      <h3 className="text-lg font-bold text-[#916570] mb-2">
        🧘 Mental Wellness Suggestion
      </h3>
      <p className="text-sm text-[#6e0b4c]">{suggestion}</p>
    </div>
  );
}
