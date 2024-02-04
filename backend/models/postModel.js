import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
