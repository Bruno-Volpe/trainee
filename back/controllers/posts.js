import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find().sort({ createdAt: 1 });

        res.status(200).json(postMessage);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const getPostByEventName = async (req, res) => {
    const { eventName } = req.body;

    try {
        const postMessage = await PostMessage.findOne({ eventName });

        if (!postMessage) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(postMessage);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID')

    await PostMessage.findByIdAndRemove(_id)

    res.json({ message: 'Post delete sucessfully' })
}