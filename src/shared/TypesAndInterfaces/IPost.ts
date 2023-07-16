export interface IPost{
    content:string,
    author_account_photo: string,
    author_nickname: string,
    author_username: string,
    device:'pc' | 'phone',
    is_edited:boolean,
    photos: Array<string>,
    published_date: string,
    reply?:IPost,
    slug:string,
    comments:[]
}