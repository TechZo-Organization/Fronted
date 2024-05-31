import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class userApiService {
    getUsers() {
        return http.get('/users');
    }

    getUserById(userId) {
        return http.get(`/users/${userId}`);
    }
}
