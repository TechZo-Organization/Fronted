export class Membership {
    constructor(id = "", name = '', price = 0, description = '', benefits = '') {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.benefits = benefits;
    }
}