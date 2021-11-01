import httpClient from '../../shared/services/httpClient'
import {addRequest, removeRequest} from '../../shared/services/utilityService'

export default function setup() {
    httpClient.interceptors.request.use(function(config) {
        const token = 'test'
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Content-Type'] = 'application/json';
        addRequest(config.url);
        return config;
    }, function(err) {
        removeRequest(err.response.config.url);
        return Promise.reject(err);
    });
}