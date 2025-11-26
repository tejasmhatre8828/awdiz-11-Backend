import Blog from "../models/blog.schema.js";

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

export const createBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
};
