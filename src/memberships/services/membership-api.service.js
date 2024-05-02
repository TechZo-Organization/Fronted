import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class membershipsApiService {
    getMemberships() {
        return http.get('/memberships');
    }
}