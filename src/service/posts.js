/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

const getPosts = () => {
    return api.get('/posts');
};

const getPostsByHashtag = (hashtag) => {
    return api.get(`/posts/${hashtag}`);
};

export default {
    getPosts,
    getPostsByHashtag
};