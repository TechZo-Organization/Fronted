export class Offer {
    constructor(
        id = '',
        id_user_offers = '',
        id_product_offers = '',
        id_user_get = '',
        id_product_get = '',
        status = 'Pendiente'
    ) {
        this.id = id;
        this.id_user_offers = id_user_offers;
        this.id_product_offers = id_product_offers;
        this.id_user_get = id_user_get;
        this.id_product_get = id_product_get;
        this.status = status;

        this.user_get = null;
        this.user_offer = null;
        this.product_get = null;
        this.product_offers = null;
    }

    set setUserGet(value) {
        this.user_get = value;
    }

    set setProductGet(value) {
        this.product_get = value;
    }

    set setProductOffers(value) {
        this.product_offers = value;
    }

    set setUserOffers(value) {
        this.user_offer = value;
    }

    get getUserOffers() {
        return this.user_offer;
    }
}