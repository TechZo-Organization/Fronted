import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class donationsApiService {
    getCategories() {
        return http.get('/categories-ongs');
    }

    getOngs() {
        return http.get('/ongs');
    }
}