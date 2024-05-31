import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class userApiService {
    getUser() {
        return http.get('/users');
    }

    loginUser(email, password) {
        return http.post('/login', { email, password });
    }
}
