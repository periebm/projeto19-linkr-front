/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

export const getUsers = (id) => {
    return api.get(`/users/${id}`);
};

