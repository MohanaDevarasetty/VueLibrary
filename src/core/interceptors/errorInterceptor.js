import httpClient from '../../shared/services/httpClient'
import { removeRequest } from '../../shared/services/utilityService';
import { bus } from '../../bus';

export default function setup() {
    httpClient.interceptors.response.use(
        response => {
            removeRequest(response.config.url);
            if (response.status === 200 || response.status === 201) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(response);
            }
        },
        error => {
            if (error.response.status) {
                removeRequest(error.response.config.url);
                switch (error.response.status) {
                    case 400:
                        bus.$toaster.error('Bad Request');
                        break;
                    case 401:
                        bus.$toaster.error('session expired');
                        break;
                    case 404:
                        bus.$toaster.error('page not exist');
                        break;
                    case 500:
                        bus.$toaster.error('Oops! Something went wrong');
                        break;
                    default:
                        bus.$toaster.error('Oops! Something went wrong');
                        break;
                }
                return Promise.reject(error.response);
            }
        }
    );
}