import { Hono } from "hono";
import userRoute from "./user.route.js";

const mainRouter = new Hono()

mainRouter.route('/user',userRoute) // to login/logout update profile/ password/username
export default mainRouter