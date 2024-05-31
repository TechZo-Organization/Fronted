import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class publishApiService {
    getCountry() {
        return http.get('/country');
    }
}