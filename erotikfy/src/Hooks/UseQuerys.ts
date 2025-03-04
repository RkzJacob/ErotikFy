import { useQuery } from "@apollo/client"
import { FILTRAR_USUARIOS, GET_ALL_CREATORS, GET_ID, GET_WEEKLY_FEED } from "../Querys/querys"
import { ListCreators, ListPost, Post } from "../Interfaces/interfaces"



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

export const useGET_WEEKLY_FEED_ = (user_id:String) => {
    const result = useQuery<ListPost>(GET_WEEKLY_FEED,{
        variables:{user_id:user_id},
    })
    return result
}

export const useGET_ID = (username:String) => {
    const result = useQuery(GET_ID,{
        variables:{username:username},
    })
    return result
}
