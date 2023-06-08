import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(async config => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            config.headers['Authorization'] = `Bearer ${userInfo.token}`;
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
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
        console.log(url)
        try {
            const response = await axiosInstance({ method, url, data: body });
            return fullResponse ? response : response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

export default axiosEndpoints;