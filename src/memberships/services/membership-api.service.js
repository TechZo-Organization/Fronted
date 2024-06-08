import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class membershipsApiService {
    getMemberships() {
        return http.get('/memberships');
    }
    deleteMemberships(id){
        return http.delete(`/memberships/${id}`)
    }
    getMembershipsById(id){
        return http.get(`/memberships/${id}`)
    }
}