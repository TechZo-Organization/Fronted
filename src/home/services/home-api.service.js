import axios from "axios";
import { environment } from "../../../environments/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl,
});

export class homeApiService {
    getCategoriesProduct() {
        return http.get("/categories-objects");
    }
    getProduct() {
        return http.get("/products");
    }
    getProductById(productId) {
        return http.get(`/products/${productId}`);
    }
    getCategoryById(categoryId) {
        return http.get(`/categories/${categoryId}`);
    }
}
