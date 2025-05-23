import { Hono } from "hono";
import { createPost,updatePost,deletePost,createComment,likeUnlikePost} from "../controllers/post.controller.js";
import{ authMiddleware } from "../middlewares/auth.js";

const postRoute = new Hono();

postRoute.post('/CreatePost',authMiddleware,createPost);
postRoute.post('/:postId/CreateComment',authMiddleware,createComment);
postRoute.post('/:postId/Like',authMiddleware,likeUnlikePost);
postRoute.patch('/',authMiddleware,updatePost);
postRoute.delete('/',authMiddleware,deletePost);
postRoute.put('/',authMiddleware,updatePost);
export default postRoute