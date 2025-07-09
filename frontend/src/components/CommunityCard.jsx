export const CommunityCard = ({ post, showDelete, onDelete }) => {
  return (
    <div
      key={post._id}
      className="card bg-gradient-to-r from-blue-500 to-purple-400 shadow-md p-4 mt-2 text-white"
    >
      <p className="mb-2 p-4">{post.text}</p>

      <p className="text-xs text-gray-200 px-4">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      {showDelete && (
        <button
          className="btn btn-sm btn-error mt-4 ml-4 bg-gradient-to-r from-red-600 to-orange-400 text-white"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};
