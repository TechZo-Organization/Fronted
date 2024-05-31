export class User {
    constructor(
        name = '',
        email = '',
        phone = '',
        password = '',
        membership = 0,
        img = '',
        id = '',
        favorites = []
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.membership = membership;
        this.img = img;
        this.id = id;
        this.favorites = favorites;
    }
}