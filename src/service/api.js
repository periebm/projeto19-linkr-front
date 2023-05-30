import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json'
    }
});

const methods = [
    'get',
    'post',
    'put',
    'delete'
];

const queryBuilder = (query) => Object.keys(query).length ?
    `?${Object.keys(query)
        .map(param => `${param}=${query[param]}`)
        .join("&")}` : "";

const axiosEndpoints = {};

for (const method of methods) {
    axiosEndpoints[method] = async function (route, body, query = {}, fullResponse = false) {
        const url = `${route}${queryBuilder(query)}`;

        try {
            const response = await axiosInstance({ method, url, data: body });
            return fullResponse ? response : response.data
        } catch (error) {
            Promise.reject(error);
            throw new Error(error.message);
        }
    };
}

export default axiosEndpoints