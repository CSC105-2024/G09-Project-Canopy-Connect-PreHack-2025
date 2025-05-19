import { Hono } from "hono";
import userRoute from "./user.route.js";
const router = new Hono()

router.route('/user',userRoute)

export default router