/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

export const getUsers = () => {
    return api.get('/users');
};
