import axios from 'axios';

const httpBackendClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpBackendClient;