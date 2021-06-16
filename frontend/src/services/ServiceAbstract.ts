import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost';
const port = process.env.REACT_APP_PORT || 8080;
export default axios.create({
    baseURL: `${baseUrl}:${port}/api`,
    headers: {
        'Content-type': 'application/json',
    },
});
