import { SERVER_URL } from '../util/constants.js';
import axios from 'axios';

const api = axios.create({
    baseURL: SERVER_URL + '/api/',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});
export default api;
