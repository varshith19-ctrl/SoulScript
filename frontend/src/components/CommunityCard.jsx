export const CommunityCard = ({ post }) => {
  return (
    <div
      key={post._id}
      className="card bg-linear-to-r from-blue-500 to-grey-400  shadow-md p-4 mt-2 "
    >
      <p className="mb-2 p-4">{post.text}</p>
      <button
        className="btn btn-sm btn-error mt-2 bg-linear-to-r from-grey-500 to-grey-400"
      >
        Delete
      </button>
    </div>
  );
};
