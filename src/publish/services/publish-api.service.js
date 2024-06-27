import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class publishApiService {
    getCountry() {
        return http.get('/api/v1/country');    }

    getDepartments(country) {
        return http.get(`/departments?country=${country}`);
    }

    getCities(department) {
        return http.get(`/cities?department=${department}`);
    }
}