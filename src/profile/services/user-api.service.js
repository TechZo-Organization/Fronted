import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});


export class userApiService {


    getUsers() {
        return http.get("/users");
    }
    getUserById(userId) {
        return http.get(`/users/${userId}`);
    }
    putUser(id,data){
        return http.put(`/users/${id}`,data)
    }
    deleteUser(id){
        return http.delete(`/users/${id}`)
    }
    changePassword(id, newPassword) {
        return http.put(`/users/${id}`, { password: newPassword });
    }
    changeMembership(id, newMembership){
        return http.put(`/users/${id}`, { membership: newMembership });
    }
}
