import {randomString} from "./randomString";

export const prepareHeaders = (headers: Headers) => {
    if (window.location.hostname.indexOf('localhost') > -1) {
        let token = localStorage.getItem('tn-token');
        if (!token) {
            token = randomString(32);
            localStorage.setItem('tn-token', token);
        }
        headers.set('Force-Identifier', token);
        // headers.set("Content-Type", "application/json");
        // headers.set('credentials', 'true');//credentials: 'include'
    }
    return headers
}
