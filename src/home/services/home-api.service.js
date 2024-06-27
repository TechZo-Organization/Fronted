import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class homeApiService {
    getCategoriesProduct() {
        return http.get("/api/v1/product-category");
    }
    getProduct() {
        return http.get("/api/v1/product");
    }
    getProductById(productId) {
        return http.get(`/api/v1/product/${productId}`);
    }
    getCategoryById(categoryId) {
        return http.get(`/api/v1/product-category/${categoryId}`);
    }
    getProductByIdAvailable(userId, available){
        return http.get(`/api/v1/product/user/${userId}/available/${available}`);
    }
    deleteProduct(id) {
        return http.delete(`/api/v1/product/${id}`);
    }

    putProduct(id, data) {
        return http.put(`/api/v1/product/${id}`, data);
    }


    postProduct(data) {
        console.log(data)
        return http.post('/api/v1/product', data);
    }


    getProductByUserId(userId, available) {
        return http.get(`/api/v1/product/user/${userId}/available/${available}`);
    }


}
