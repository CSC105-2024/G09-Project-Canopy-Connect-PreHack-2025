import { db } from "../index.js";
import bcrypt from 'bcrypt'
const createUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await db.user.create({
        data: {
            username: username,
            password: hashedPassword,
        }
    })
    return user;
}



const getUserInfo = async(id:number) => {
    return db.user.findUnique({where: {id}});
}


export default {createUser,getUserInfo}