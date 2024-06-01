export class Offer {
    constructor(
        id_user_offers = '',
        id_product_offers = '',
        id_user_get = '',
        id_product_get = '',
        status = 'Pendiente',
        id = ''
    ) {
        this.id_user_offers = id_user_offers;
        this.id_product_offers = id_product_offers;
        this.id_user_get = id_user_get;
        this.id_product_get = id_product_get;
        this.status = status;
        this.id = id;
    }
}