import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class reviewApiService {
    getReviews() {
        return http.get("/reviews");
    }
    getReviewById(reviewId) {
        return http.get(`/reviews/${reviewId}`);
    }
    getReviewsByUserId(userId) {
        return http.get(`/reviews?get_user_id=${userId}`);
    }
}