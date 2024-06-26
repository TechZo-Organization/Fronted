export class Review {
    constructor(
        id = '',
        content = '',
        score = 0,
        get_user_id = '',
        give_user_id = ''
    ) {
        this.id = id;
        this.content = content;
        this.score = score;
        this.get_user_id = get_user_id;
        this.give_user_id = give_user_id;
    }
}