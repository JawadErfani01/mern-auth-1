import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @desc    create post
// @route   POST /api/post
// @access  private
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Please Enter all Fields" });
  }
  const post = await Post.create({
    title,
    content,
    author: req.user._id,
    image: req.file.filename,
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400).json({ message: "invalid post" });
  }
});

// @desc    get posts
// @route   GET /api/post
// @access  private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("author", "name email image");

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: "There are no posts" });
  }
});
// @desc    getMe posts
// @route   GET /api/post/me
// @access  private
const getMePosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user.id }).populate(
    "author",
    "name email image"
  );

  if (posts) {
    res.status(200).json({ posts });
  } else {
    res.status(404).json({ message: "There are no posts" });
  }
});

// @desc    get post
// @route   GET /api/post/:id
// @access  private
const getAPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params._id).populate(
    "author",
    "name email image"
  );

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "there is no any post" });
  }
});

// @desc    Update post
// @route   PUT /api/post/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    { title: req.body.title, content: req.body.content },
    { new: true }
  );

  if (post) {
    res.json({
      _id: post._id,
      title: post.title,
      content: post.content,
    });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    delete post
// @route   delete /api/post/:id
// @access  Private

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    // author: req.user._id,
  });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ id: post._id, message: "Post deleted successfully" });
});

export { getAPost, getPosts, getMePosts, deletePost, updatePost, createPost };
