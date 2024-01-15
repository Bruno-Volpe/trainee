import express from "express";

import { getPosts, createPost, updatePost, deletePost, getPostByEventName } from "../controllers/posts.js";

const router = express.Router()

// baseURL = /posts
router.post('/getPostByEventName', getPostByEventName)
router.get('/', getPosts)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router