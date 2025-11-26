import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        text: String,
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;