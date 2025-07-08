import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CommunityCard } from "../components/CommunityCard";

export default function CommunityBoard({ setShowNavbar }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Load posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
          }/api/journal/readpost`
        );
        setPosts(res.data);
      } catch (error) {
        alert("Failed to load community posts");
      }
    };

    fetchPosts();
    setShowNavbar(false); //  hide navbar on this page
    return () => setShowNavbar(true); //  show navbar again when leaving
  }, []);

  // Submit new post
  const submitPost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
        }/api/journal/createpost`,
        { text }
      );
      setPosts([res.data, ...posts]);
      setText("");
      toast.success("Post submitted successfully");
    } catch {
      alert("Failed to submit post");
      toast.error("Something went wrong while submitting your post");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-red-500 to-violet-500 bg-clip-text text-transparent">
          Anonymous Community Board
        </h2>

        <form onSubmit={submitPost} className="mb-6 text-[#041220]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts on cracking interviews ..."
            className="textarea textarea-bordered w-full bg-linear-to-r from-[#946c98] to-[rgb(212,94,94)]"
            rows={4}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary mt-2 bg-[#4dab6c]"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>

        <div className="space-y-4">
          {posts.length === 0 && (
            <p className="italic text-gray-500">No posts yet. Be the first!</p>
          )}
        </div>
      </div>
      <div>
        {posts.map((post) => (
          <CommunityCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

// {notes.length > 0 && !isRateLimited && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {notes.map((note) => (
//               <NoteCard key={note._id} note={note} setNotes={setNotes} />
//             ))}
//           </div>
//         )}
