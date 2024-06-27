import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});


export class userApiService {


    getUsers() {
        return http.get("/api/v1/profiles");
    }
    getUserById(userId) {
        return http.get(`/api/v1/profiles/${userId}`);
    }
    putUser(id,data){
        return http.put(`/api/v1/profiles/${id}`,data)
    }
    deleteUser(id){
        return http.delete(`/api/v1/profiles/${id}`)
    }
    deleteProfile(id){
        return http.delete(`/api/v1/users/${id}`)
    }
    changePassword(id, newPassword) {
        return http.put(`/api/v1/profiles/${id}`, { password: newPassword });
    }
    changeMembership(id, newMembership){
        return http.put(`/api/v1/profiles/${id}`,newMembership);
    }
}
