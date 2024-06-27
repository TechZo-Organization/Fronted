import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});


export class publishApiService {
    getCountry() {
        return http.get('/api/v1/country');    }

    getDistrictByName(districtName) {
        return http.get(`/api/v1/district/name/${districtName}`);
    }

}