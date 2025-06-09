import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CommunityBoard() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Load posts on mount
  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/journal/readpost');
      setPosts(res.data);
    } catch (error) {
      alert('Failed to load community posts');
    }
  };

  fetchPosts();
}, []);


  // Submit new post
  const submitPost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/journal/createpost', { text });
      setPosts([res.data, ...posts]);
      setText('');
    } catch {
      alert('Failed to submit post');
    } finally {
      setLoading(false);
    }
  };
   const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5001/api/journal/deletepost/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post");
    }
  };
  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-[#916570]">Anonymous Community Board</h2>

      <form onSubmit={submitPost} className="mb-6">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Share your thoughts on cracking interviews ..."
          className="textarea textarea-bordered w-full"
          rows={4}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      <div className="space-y-4">
        {posts.length === 0 && <p className="italic text-gray-500">No posts yet. Be the first!</p>}
        {posts.map(post => (
          <div key={post._id} className="p-4 bg-base-100 rounded-lg shadow">
            <p className="mb-2">{post.text}</p>
            <small className="text-gray-400">{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
