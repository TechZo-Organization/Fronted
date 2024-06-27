import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class reviewApiService {
    getReviews() {
        return http.get("/api/v1/review");
    }
    getReviewById(reviewId) {
        return http.get(`/api/v1/review/${reviewId}`);
    }
    getReviewsByUserId(userId) {
        return http.get(`/api/v1/review?get_user_id=${userId}`);
    }
    postReview(data){
        return http.post(`/api/v1/review`, data)
    }
}