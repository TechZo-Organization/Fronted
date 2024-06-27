import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class userApiService {
    getUser() {
        return http.get('/api/v1/users/profiles');
    }

    getUserById(userId) {
        return http.get(`/api/v1/profiles/${userId}`);
    }

    registerUser(user) {
        return http.post('/api/v1/profiles', user);
    }

    updateUser(userId, userData) {
        return http.put(`/api/v1/profiles/${userId}`, userData);
    }
    
}