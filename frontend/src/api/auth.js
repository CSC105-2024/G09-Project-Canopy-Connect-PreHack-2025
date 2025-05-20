import { Axios } from "../utils/axiosInstance";

export const loginUser = async(username,password,rememberMe) => {
    try {
        const response = await Axios.post('/user/login',{   
            username,
            password,
            rememberMe,
        })
        return response.data;
    } catch (error) {
        console.error('Login Error: ',error);
        throw error;
    }
}

export const fetchCurrentUser = async () => {
    try {
        const res = await Axios.get('user/decodeCookie',{withCredentails:true})
        return res.data
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const res = await Axios.delete('/user/logout',{withCredentials: true});
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const registerUser = async(username,password,email) => {
    try {
        const res = await Axios.post('/user/register',{
            username,
            password,
            email
        })
        return res.data;
    } catch (error) {
        console.error('Register error:',error);
        throw error;
    }
}

export const updateUsername = async(id, newUsername) => {
    try {
        const res = await Axios.patch('/user/updateUsername',{
            id,
            newUsername
        })
        return res.data;
    } catch (error) {
        console.error('Update username error:',error);
        throw error;
    }
}

export const updatePassword = async(id, newPassword) => {
    try {
        const res = await Axios.patch('/user/updatePassword',{
            id,
            newPassword
        })
        return res.data;
    } catch (error) {
        console.error('Update username error:',error);
        throw error;
    }
}

export const updateEmail = async(id, newEmail) => {
    try {
        const res = await Axios.patch('/user/updateEmail',{
            id,
            newEmail
        })
        return res.data;
    } catch (error) {
        console.error('Update username error:',error);
        throw error;
    }
}

export const updateProfile = async(id, newProfile) => {
    try {
        const res = await Axios.patch('/user/updatePassword',{
            id,
            newProfile
        })
        return res.data;
    } catch (error) {
        console.error('Update username error:',error);
        throw error;
    }
}