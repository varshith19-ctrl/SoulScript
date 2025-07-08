export const CommunityCard = ({ post }) => {
  //   const handleDelete = async (postId) => {
  //   try {
  //     await axios.delete(
  //       `${
  //         import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL
  //       }/api/journal/deletepost/${postId}`
  //     );
  //     setPosts(posts.filter((post) => post._id !== postId));
  //   } catch (err) {
  //     console.error("Failed to delete post");
  //   }
  // };
  return (
    <div
      key={post._id}
      className="card bg-linear-to-r from-blue-500 to-purple-400  shadow-md p-4 mt-2 "
    >
      <p className="mb-2 p-4">{post.text}</p>
      <button
        className="btn btn-sm btn-error mt-2 bg-linear-to-r from-grey-500 to-grey-400"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};


 
