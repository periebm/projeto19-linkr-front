/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

export const getUsers = (config) => {
    return api.get('/users', config);
};

