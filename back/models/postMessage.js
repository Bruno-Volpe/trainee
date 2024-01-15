import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    text: String,
    eventName: String,
    eventYear: Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage