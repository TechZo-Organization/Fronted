export class Product {
    constructor(
        product_name = '',
        description = '',
        change_for = '',
        price = 0,
        images = '',
        category = '',
        boost = false,
        contact_information = ''
    )
    {
        this.product_name = product_name;
        this.description = description;
        this.change_for = change_for;
        this.price = price;
        this.images = images;
        this.category = category;
        this.boost = boost;
        this.contact_information = contact_information;
    }
}