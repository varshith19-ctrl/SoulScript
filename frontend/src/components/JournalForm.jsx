import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function JournalForm({ onNewEntry }) {
  const [text, setText] = useState('')
  const [mood, setMood] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/journal`,
        { text, mood }
      )

      onNewEntry(response.data)
      setText('')
      setMood('')
      toast.success('Entry submitted successfully')
    } catch (err) {
      console.error(err)
      toast.error('Submission failed. Try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-linear-to-r from-grey-600 to-grey-400 shadow-md p-4 mb-4 rounded-xl w-full max-w-[600px] mx-auto min-h-[260px] transition-all duration-200"
    >
      {/* Set minimum height to prevent layout shifts during loading */}
      {/* Use max-width and mx-auto to center the form horizontally */}
      {/* Use reduced padding and shadow to improve LCP and render time */}

      <div className="form-control mb-3">
        <textarea
          className="textarea textarea-bordered bg-linear-to-r from-[#8b6dc6] to-[#150179] text-white placeholder-gray-400 focus:outline-none focus:ring  w-full resize-none text-sm min-h-[100px]"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        {/* Use resize-none to prevent layout shift from user resizing */}
        {/* Apply consistent height with min-h */}
        {/* Use required to enable native validation and skip JS alerts */}
      </div>

      <div className="form-control mb-3">
        <input
          className="input input-bordered  bg-linear-to-r from-[#8b6dc6] to-[#150179] text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-[#7db3e1] w-full text-sm"
          type="text"
          placeholder="Your Mood (e.g., Happy, Anxious)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        {/* Input with required and fixed width for consistent rendering */}
        {/* Text-sm improves paint speed and avoids large layout blocks */}
      </div>

      <button
        type="submit"
        className="btn  bg-linear-to-r from-[#8b6dc6] to-[#150179] hover:bg-[#93c6f2] text-[#a9adb1] w-full font-medium text-sm"
      >
        Submit Entry
      </button>
      {/* Use full width button to prevent layout shift */}
      {/* Use font-medium and text-sm to reduce render weight */}
      {/* Avoid excessive shadows and animations to reduce TBT */}
    </form>
  )
}
