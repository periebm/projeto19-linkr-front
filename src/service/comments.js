/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

const getCommentsById = (id) => {
    return api.get(`/comments/${id}`);
};

const createComment = (body) => {
    return api.post("/comments", body);
};

export default {
    getCommentsById,
    createComment
};