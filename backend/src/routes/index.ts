import { Hono } from "hono";
import userRoute from "./user.route.js";
const mainRouter = new Hono()

mainRouter.route('/user',userRoute)

export default mainRouter