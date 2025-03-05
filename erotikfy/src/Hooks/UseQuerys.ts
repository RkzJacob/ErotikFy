import { useQuery } from "@apollo/client"
import { FILTRAR_USUARIOS,  GET_ALL_CREATORS, GET_ALL_NORMALS, GET_ID, GET_WEEKLY_FEED } from "../Querys/querys"
import {ListCreators, ListNormales, ListPost } from "../Interfaces/interfaces"


//obtener todos los creados
export const useGetallCreators = () => {
    const result = useQuery<ListCreators>(GET_ALL_CREATORS,{
    })
    return result
}

//obtener todos los creadores filtrando apenas escribe 1 letra 
export const useGetCreators = (username:String) => {
    const result = useQuery<ListCreators>(FILTRAR_USUARIOS,{
        variables:{search:username},
        skip: !username,
    })
    return result
}

//obtener la feed semanal de los creadores que sigue el usuario y los usuarios que no sigue
export const useGET_WEEKLY_FEED_ = (user_id:String) => {
    const result = useQuery<ListPost>(GET_WEEKLY_FEED,{
        variables:{user_id:user_id},
    })
    return result
}

//obtener id de un usuario
export const useGET_ID = (username:String) => {
    const result = useQuery(GET_ID,{
        variables:{username:username},
    })
    return result
}

//obtener todos los usuarios normales
export const useGetallNormals = () => {
    const result = useQuery<ListNormales>(GET_ALL_NORMALS,{
    })
    return result
}

