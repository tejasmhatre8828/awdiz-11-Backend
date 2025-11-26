
import { Router } from "express";
import { createBlog, getBlog, getBlogs } from "../Controllers/blog.controllers.js";

const BlogRouter = Router();

BlogRouter.get("/get", getBlogs);

BlogRouter.get("/:id", getBlog);

BlogRouter.post("/create", createBlog);


export default BlogRouter;