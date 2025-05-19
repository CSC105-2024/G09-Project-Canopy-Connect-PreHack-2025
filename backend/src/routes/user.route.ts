import { Hono } from "hono";
import { createUser } from "../controllers/user.controller.js";


const userRoute = new Hono();

userRoute.post('/register',createUser);
userRoute.post('/login',);
userRoute.get('/profile',);
//update username / password
userRoute.patch('/updateUsername,')


export default userRoute