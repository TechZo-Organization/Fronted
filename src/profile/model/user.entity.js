export class User {
    constructor(
        name = '',
        email = '',
        phone = '',
        password = '',
        membership = '',
        membership_date='',
        img = '',
        id = '',
        favorites = []
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.membership = membership;
        this.membership_date = membership_date;
        this.img = img;
        this.id = id;
        this.favorites = favorites;
    }
}