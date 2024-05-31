export class Product {
    constructor(
        product_name = '',
        description = '',
        change_for = '',
        price = 0,
        images = [],
        category_id = '',
        boost = false,
        user_id = '',
        location = { country: '', departament: '', district: '' }
    ) {
        this.product_name = product_name;
        this.description = description;
        this.change_for = change_for;
        this.price = price;
        this.images = images;
        this.category_id = category_id;
        this.boost = boost;
        this.user_id = user_id;
        this.location = location;
    }
}
