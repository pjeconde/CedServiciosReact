import axios from 'axios';

export const instance = axios.create({
    // baseURL: 'http://cedeira.ddns.net:8072/api',
    baseURL: 'http://localhost:49418/api'
    // withCredentials: false,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     'Content-type': 'application/json'
    // }
});

