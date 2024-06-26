import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class userApiService {
    getUser() {
        return http.get('/users');
    }

    getUserById(userId) {
        return http.get(`/users/${userId}`);
    }

    registerUser(user) {
        return http.post('/users', user);
    }

    updateUser(userId, userData) {
        return http.put(`/users/${userId}`, userData);
    }
}