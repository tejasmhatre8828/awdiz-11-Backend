import { Router } from "express";
import { getComments, addComment } from "../Controllers/comment.controllers.js";

const CommentRouter = Router();

CommentRouter.get("/:blogId", getComments);

CommentRouter.post("/add-comment", addComment);

export default CommentRouter;
