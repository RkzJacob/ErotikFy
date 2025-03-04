import { useQuery } from "@apollo/client"
import { FILTRAR_USUARIOS, GET_ALL_CREATORS } from "../Querys/querys"

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
}

export interface ListCreators{
    AllUsersWithCounts:Creators[];
    FILTRAR_USUARIOS:Creators[];
}

export const useGetallCreators = () => {
    const result = useQuery<ListCreators>(GET_ALL_CREATORS,{
    })
    return result
}


export const useGetCreators = (username:String) => {
    const result = useQuery<ListCreators>(FILTRAR_USUARIOS,{
        variables:{search:username},
        skip: !username,
    })
    return result
}