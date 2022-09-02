import { SERVER_URL, AXIOS_TIMEOUT } from 'Util/helpers/constants.js';
import axios from 'axios';

const api = axios.create({
    baseURL: SERVER_URL + '/api/',
    timeout: AXIOS_TIMEOUT,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});
export default api;
