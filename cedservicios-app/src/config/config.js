import axios from 'axios';

export const axiosConfig = axios.create({
    baseURL: 'http://cedeira.ddns.net:8072/api',
});

