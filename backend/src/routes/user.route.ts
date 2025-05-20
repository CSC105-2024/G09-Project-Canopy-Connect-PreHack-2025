import { Hono } from "hono";
import { createUser, decodeCookie, loginUser, logoutUser, 
    updateEmail, 
updatePassword, updateProfile, updateUsername} from "../controllers/user.controller.js";

import{ authMiddleware } from "../middlewares/auth.js";

const userRoute = new Hono();

userRoute.post('/register',createUser); // pass
userRoute.post('/login',loginUser); // pass
//update profile picutre
userRoute.patch('/updateProfile',authMiddleware,updateProfile);  // pass
//update username / password / email
userRoute.patch('/updateUsername',authMiddleware,updateUsername) // pass 
userRoute.patch('/updatePassword',authMiddleware,updatePassword) // pass
userRoute.patch('/updateEmail',updateEmail)
//logout
userRoute.delete('/logout',logoutUser) // pass
//decode cookie
userRoute.get('/decodeCookie',decodeCookie);
export default userRoute