
export interface IProfileInfo{
    username: string,
    nickname: string,
    birth_date: string,
    city: string | null,
    country: string | null,
    links: [string] | null,
    subscribers_count: number,
    isBlocked: boolean,
    isVerify: boolean,
    created_at: string,
    account_banner:string,
    account_photo:string,
    email:string,
    biography:string,
    posts_count:number,
    id:number,
}