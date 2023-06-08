/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

const getPosts = () => { 
    return api.get('/posts');
};

const getPostsByHashtag = (hashtag, offset) => {
    const query = {offset}
    return api.get(`/posts/${hashtag}`, {}, query);
};

const updatePost = (body, id) => {
    return api.put(`/posts/update/${id}`, body)
}

export default {
    getPosts,
    getPostsByHashtag,
    updatePost
};