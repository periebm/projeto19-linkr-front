/* eslint-disable import/no-anonymous-default-export */
import api from "./api";

const getTrendings = () => {
    return api.get('/trendings');
};


export default {
    getTrendings
};