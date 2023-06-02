/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

const getPosts = () => {
    return api.get('/posts');
};

const getPostsByHashtag = (hashtag) => {
    return api.get(`/posts/${hashtag}`);
};

const updatePost = (body, id) => {
    return api.put(`/posts/update/${id}`, body)
}

export default {
    getPosts,
    getPostsByHashtag,
    updatePost
};