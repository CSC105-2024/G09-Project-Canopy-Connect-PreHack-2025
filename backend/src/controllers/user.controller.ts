import type { Context } from "hono";
import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwt.js";


const createUser = async(c:Context) => {
    try {
        const body = await c.req.json();
        if(!body.username || !body.password){
            return c.json({
                error: "Missing username or password"
            },400);
        }
        const newUser = await userModel.createUser(body.username,body.password);
        const token = generateToken({ id: newUser.id },"1d");
        c.header('Set-Cookie', `userToken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`);
        return c.json({
            message: "User created",
            user: newUser
        })
    } catch (error) {
        console.error("Create user error:",error)
        return c.json({
            error: "Internal server error"
        },500)
    }
}
//need userId and picture url
const updateProfile = async(c:Context) => {
    try {
        const body = await c.req.json();
        const USER = c.get("user"); // if something's wrong debug this line
        const userId = USER.id;
        if(!userId || !body.profile){
            return c.json({
                error: "Missing id or profile url."
            },400);
        }
        //find user by userID
        const user = await userModel.getUserById(userId);
        if(!user){
            return c.json({
                error: "There is no user according to your id."
            },400)
        }
        const updateProfile = await userModel.updatePictureProfile(userId,body.profile);
        return c.json({
            message: "Update picture profile succesful.",
            profile: updateProfile.profile,
        })

        
    } catch (error) {
        console.error("Update profile picture error:",error)
        return c.json({
            error:"Internal sever error"
        },500)
    }
}

const loginUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { username, password, rememberMe } = body;
    if (!username || !password) {
      return c.json({ error: "Missing username or password." }, 400);
    }
    const USER = await userModel.getUserByUsername(username);
    if(!USER){
        return c.json({
            error: "Invalid username."
        },401)
    }
    const user = await userModel.loginUser(username, password);
    if (!user) {
      return c.json({ 
        error: "Invalid username or password.",
        bodyPassword: password,
        user:user
    }, 401);
    }
    
    const expiresIn = rememberMe ? "7d" : "1d";
    const token = generateToken({ id: user.id }, expiresIn);
    let cookie = `userToken=${token}; HttpOnly; Path=/; SameSite=Strict`;
    if (rememberMe) {
      const maxAge = 60 * 60 * 24 * 7;
      cookie += `; Max-Age=${maxAge}`;
    }
    c.header("Set-Cookie", cookie);
    return c.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Internal server error." }, 500);
  }
};


//update username
const updateUsername = async(c:Context) => {
    try {
        const body = await c.req.json();
        const user = c.get("user"); // if something's wrong debug this line first
        const userId = user.id;
        if(!body.newUsername){
            return c.json({
                error: "New username is required."
            },400)
        }
        const updateUser = await userModel.updateUsername(userId,body.newUsername);
        return c.json({
            message: "Username updated successfully.",
            user: {
                id: updateUser.id,
                username: updateUser.username
            }
        })
    } catch (error) {
        console.error("Update username error:",error);
        return c.json({
            error: "Internal server error", 
        },500)
    }
}
//update Password
const updatePassword = async (c: Context) => {
    try {
        const body = await c.req.json();
        const user = c.get("user");
        const userId = user.id;
        const { currentPassword, newPassword } = body;
        if (!currentPassword || !newPassword) {
            return c.json({ error: "Current and new password are required." }, 400);
        }
        const foundUser = await userModel.getUserById(userId);
        if (!foundUser) {
            return c.json({ error: "User not found." }, 404);
        }
        const isMatch = await bcrypt.compare(currentPassword, foundUser.password);
        if (!isMatch) {
            return c.json({ error: "Current password is incorrect." }, 401);
        }
        await userModel.updatePassword(userId, newPassword);
        return c.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Update password error:", error);
        return c.json({ error: "Internal server error." }, 500);
    }
};
//log out
const logoutUser = async(c:Context) => {
    try {
        c.header("Set-Cookie","userToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict")
        return c.json({
            message: "Logged out successfully."
        })
    } catch (error) {
        console.error("Logout error:",error);
        return c.json({
            error: "Internal server error."
        },500)
    }
}
export {createUser,updateProfile,loginUser,updateUsername,updatePassword,logoutUser}