import { Axios } from "../utils/axiosInstance";

//create post integration
export const createPost = async() => {
    try {
        const response = await Axios.post('/post/CreatePost',{
            // any input? if there is put it here
        }) 
        return response; //to return the data of create post
    } catch (error) {
        console.error('Create post error: ',error);
        throw error;
    } 
}

export const createComment = async() => {
    try {
        
    } catch (error) {
        console.error('Create comment: ',error);
        throw error;
    }
}

export const likeUnlikePost = async() => {
    try {
        
    } catch (error) {
        console.error('like/unlike post error: ',error);
        throw error;
    }
}

export const updatePost = async() => {
    try {
        
    } catch (error) {
        console.error('Update post error: ',error);
        throw error;
    }
}

export const deletePost = async() => {
    try {
        
    } catch (error) {
        console.error('Delete post error: ',error);
        throw error;
    }
}


//this function get all posts from database
//and then show it on the post page.
export const getAllPost = async() => {
    try {
        
    } catch (error) {
        console.error('Get all posts error: ',error);
        throw error;
    }
}

export const getPostByTag = async() => {
    try {
        
    } catch (error) {
        console.error('Get post by tag error: ',error);
        throw error;
    }
}

export const getCommentForPost = async() => {
    try {
        
    } catch (error) {
        console.error('Get comment for post error: ',error);
        throw error;
    }
}

export const getAllTags = async() => {
    try {
        
    } catch (error) {
        console.error('Get all tags error: ',error);
        throw error;
    }
}

export const getLikeForPost = async() => {
    try {
        
    } catch (error) {
        console.error('Get like for post error: ',error);
        throw error;
    }
}

