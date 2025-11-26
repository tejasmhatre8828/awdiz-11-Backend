import Comment from "../models/comment.schema.js";

export const getComments = async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.blogId });
  res.json(comments);
};

export const addComment = async (req, res) => {
  const newComment = await Comment.create(req.body);
  res.json(newComment);
};
