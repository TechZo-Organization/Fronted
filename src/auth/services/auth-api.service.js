import axios from 'axios';
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});
const userKey = 'user';
const tokenKey = 'authToken';

export class authService {
    register(username, password) {
        const register ={
            email: username,
            password: password
        }
        console.log(register)
        return http.post('/api/v1/authentication/sign-up', register);
    }
    login(username, password) {
        const login ={
            email: username,
            password: password
        }
        console.log(login)
        return http.post('/api/v1/authentication/sign-in', login)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', response.data.id.toString());
                    localStorage.setItem('authToken', response.data.token);
                }
                return response;
            });
    }
    getToken() {
        return localStorage.getItem(tokenKey);
    }
    isAuthenticated() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        return Date.now() < exp;
    }
    logOut() {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(userKey);
        window.location.href = '/log-in';
    }
}
