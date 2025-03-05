export interface Creators {
    user_id:string;
    username:string;
    role:string;
    email:string;
    profile_picture:string;
    bio:string;
    created_at:string;
    followers_count:number;
    following_count:number;
    posts: Post[];
}

export interface ListCreators{
    AllUsersWithCountsCreator:Creators[];
    FILTRAR_USUARIOS:Creators[];
}
export interface OneCreator{
    getOneFindUserID: Creators;
}

export interface ListNormales{
    AllUsersWithCountsNormales:Creators[];
}

export interface ListPost{
    GET_WEEKLY_FEED:Post[];
}
export interface Post{
    usuario:Creators;
    post_id:string;
    user_id:string;
    title:string;
    description:string;
    media:string;
    price:string;
    is_public:number;
    comments:Comments[];
}
export interface Comments{
    comment_id:string;
    user_id:string;
    content:string;
    user:User;

}
export interface User {
    user_id:string;
    username:string;
    profile_picture:string;
    bio:string;
}