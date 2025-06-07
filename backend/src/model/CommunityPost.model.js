import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
export default CommunityPost;
