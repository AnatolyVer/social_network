export interface IComment{
    author_nickname: string,
    author_username: string,
    author_account_photo: string,
    author_is_verify: boolean,
    content: string,
    device: string,
    id: number,
    is_author_liked: boolean,
    is_edited: boolean,
    is_liked: string,
    likes_count: number,
    published_date: string,
    replies_count: number
}