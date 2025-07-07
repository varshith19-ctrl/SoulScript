import { useEffect } from "react";
import { suggestionMessages } from "../lib/SuggestionMessage";

export default function WellnessSuggestion({ entries, setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false); // hide navbar on this page
    return () => setShowNavbar(true); // show navbar when leaving
  }, []);
  function parseStars(tone) {
    const match = tone.match(/(\d+(\.\d+)?)/); // Eg:- Extracts 3 from "3 stars"
    return match ? parseFloat(match[0]) : null;
  }

 function getSuggestion(avgStars) {
  if (avgStars === null) return suggestionMessages.null;
  if (avgStars >= 4.5) return suggestionMessages.excellent;
  if (avgStars >= 3.5) return suggestionMessages.good;
  if (avgStars >= 2.5) return suggestionMessages.mixed;
  if (avgStars >= 1.5) return suggestionMessages.low;
  return suggestionMessages.critical;
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
    <div className="bg-linear-to-r from-[#123] to-[#113151] p-4 shadow-lg rounded-lg my-6 mt-20 ">
      <h3 className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-2xl text-transparent mb-2">
         Mental Wellness Suggestion
      </h3>
       <h4 className="text-md md:text-lg font-semibold text-[#abc77c] mb-2">
        {suggestion.title}
      </h4>
      <p className="text-sm md:text-base text-[#ffffff] leading-relaxed whitespace-pre-wrap">
        {suggestion.description}
      </p>
    </div>
  );
}
