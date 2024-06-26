import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class donationsApiService {
    getCategories() {
        return http.get('/api/v1/category');
    }

    getOngs() {
        return http.get('/api/v1/ong');
    }

    getOngById(id) {
        return http.get(`/api/v1/ong/${id}`);
    }
}