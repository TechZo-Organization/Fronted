import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class offerApiService {
    getOffers() {
        return http.get("/offers");
    }
    updateOfferStatus(id, status){
        return http.put(`offers/${id}`, { status});
    }
    getOfferById(offerId) {
        return http.get(`/offers/${offerId}`);
    }
    getOffersByUserId(userId) {
        return http.get(`/offers?get_user_id=${userId}`);
    }
    createOffer(offerData) {
        return http.post("/offers", offerData);
    }
    updateOffer(offerId, offerData) {
        return http.put(`/offers/${offerId}`, offerData);
    }
    deleteOffer(offerId) {
        return http.delete(`/offers/${offerId}`);
    }
}
