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

