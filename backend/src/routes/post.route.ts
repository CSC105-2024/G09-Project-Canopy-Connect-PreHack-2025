import { Hono } from "hono";
import { createPost,updatePost,deletePost,createComment,likeUnlikePost,getAllPosts,getPostsByTag} from "../controllers/post.controller.js";
import{ authMiddleware } from "../middlewares/auth.js";

const postRoute = new Hono();

postRoute.post('/CreatePost',authMiddleware,createPost);
postRoute.post('/:postId/CreateComment',authMiddleware,createComment);
postRoute.post('/:postId/Like',authMiddleware,likeUnlikePost);
postRoute.put('/:id',authMiddleware,updatePost);
postRoute.delete('/DeletePost',authMiddleware,deletePost);
postRoute.get('/GetPosts',authMiddleware,getAllPosts);
postRoute.get('/:tagName/GetPostsByTag',authMiddleware,getPostsByTag);
export default postRoute