/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

const getPosts = () => {
    return api.get('/posts');
};

export default {
    getPosts
};