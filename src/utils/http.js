import axios from 'axios';
import qs from 'qs';

const Axios = axios.create();

Axios.interceptors.request.use(
    config => {
        if (config.method === 'POST') {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error.data.error.message);
    }
);

Axios.interceptors.response.use(
    res => res,
    error => Promise.reject(error)
);

export default Axios;