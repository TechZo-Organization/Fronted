import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class offerApiService {
    getOffers() {
        return http.get("/api/v1/offer");
    }
    updateOfferStatus(id, status){
        return http.put(`/api/v1/offer/${id}`, status);
    }
    getOfferById(offerId) {
        return http.get(`/offer/${offerId}`);
    }
    getOffersByUserOwnId(userId) {
        return http.get(`/api/v1/offer/user-own/${userId}`);
    }
    getOffersByUserChangeId(userId) {
        return http.get(`/api/v1/offer/user-change/${userId}`);
    }
    createOffer(offerData) {
        return http.post("/api/v1/offer", offerData);
    }
    updateOffer(offerId, offerData) {
        return http.put(`/api/v1/offer/${offerId}`, offerData);
    }
    deleteOffer(offerId) {
        return http.delete(`/api/v1/offer/${offerId}`);
    }


}
