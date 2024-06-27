import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class membershipsApiService {
    getMemberships() {
        return http.get('/api/v1/membership');
    }
    deleteMemberships(id){
        return http.delete(`/api/v1/membership/${id}`)
    }
    getMembershipsById(id){
        return http.get(`/api/v1/membership/${id}`)
    }
}