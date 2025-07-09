import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CommunityCard } from "../components/CommunityCard";

export default function CommunityBoard({ setShowNavbar }) {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all posts on mount
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
        toast.error("Failed to load community posts");
      }
    };

    fetchPosts();
    setShowNavbar(false);
    return () => setShowNavbar(true);
  }, []);

  // Load only the current user's posts
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
        }/api/journal/readuserposts`
      );
      setUserPosts(res.data);
    } catch (error) {
      toast.error("Failed to load your posts");
    }
  };

  // Submit new post
  const submitPost = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("empty input");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
        }/api/journal/createpost`,
        { text }
      );
      setPosts([res.data, ...posts]);
      if (showUserPosts) setUserPosts([res.data, ...userPosts]);
      setText("");
      toast.success("Post submitted successfully");
    } catch {
      toast.error("Something went wrong while submitting your post");
    } finally {
      setLoading(false);
    }
  };

  // Delete post (for "Your Posts" mode)
  const deletePost = async (postId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
        }/api/journal/deletepost/${postId}`
      );
      toast.success("Post deleted");
      setPosts(posts.filter((p) => p._id !== postId));
      setUserPosts(userPosts.filter((p) => p._id !== postId));
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const displayedPosts = showUserPosts ? userPosts : posts;

  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-red-500 to-violet-500 bg-clip-text text-transparent animate-bounce">
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

          {posts.length !== 0 && (
            <button
              type="button"
              className="btn btn-primary mt-2 ml-1.5 bg-[#4dab6c]"
              onClick={() => {
                const newState = !showUserPosts;
                setShowUserPosts(newState);
                if (newState===true) fetchUserPosts();
              }}
            >
              {showUserPosts ? "All Posts" : "Your Posts"}
            </button>
          )}
        </form>

        <div className="space-y-4">
          {displayedPosts.length === 0 && (
            <p className="italic text-gray-500">
              {showUserPosts
                ? "You haven't posted anything yet."
                : "No posts yet. Be the first!"}
            </p>
          )}
        </div>
      </div>

      <div>
        {displayedPosts.map((post) => (
          <CommunityCard
            key={post._id}
            post={post}
            showDelete={showUserPosts}
            onDelete={() => deletePost(post._id)}
          />
        ))}
      </div>
    </>
  );
}
