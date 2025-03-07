import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $contrasena: String!){
    LOGIN_USER(username: $username, contrasena: $contrasena){
        token,role}
    }

`

export const REGISTER_MUTATION_USERNORMAL = gql`
    mutation createUser($username: String!, $contrasena: String!) {
        CREATE_USER_NORMAL(username: $username,contrasena: $contrasena)
    }
    `;

export const CREATE_POST = gql`
    mutation createPost($user_id: String!, $title: String!, $descripcion: String!, $media: [String]!) {
        CREATE_POST(
        user_id: $user_id
        ,title: $title
        ,descripcion: $descripcion
        ,media: $media)
    }
    `;

export const CREATE_USER_CREATOR = gql`
    mutation createCreator($username: String!, $contrasena: String!, $profile_picture: String!, $bio:String! ) {
        CREATE_USER(
        username:$username,
        contrasena:$contrasena
        ,profile_picture: $profile_picture
        ,bio: $bio)
    }
    `;

export const GET_URL = gql`
    mutation obtenerUrl($base64File: String!) {
        GET_UPLOAD_URL(base64File:$base64File)
}
`;

export const GET_URL_CREATOR = gql`
    mutation obtenerUrlCreator($base64File: String!) {
        GET_UPLOAD_URL_CREATOR(base64File:$base64File)
}
`;

export const CREATE_LIKE= gql`
    mutation generarLike($user_id:String!, $post_id: String!){
        CREATE_Like(user_id:$user_id,post_id:$post_id)
    }
`

export const CREATE_COMENTARIO= gql`
    mutation createComentario($user_id:String!, $post_id: String!,$content: String!){
        CREATE_COMENTARIO(user_id:$user_id,post_id:$post_id,content:$content)
    }
`
export const BORRAR_CREADOR= gql`
    mutation borrarCreador($user_id:String!){
        DELETE_USER(user_id:$user_id)
    }
`
export const HACER_SUSCRIPTOR= gql`
    mutation serSuscriptor($user_id:String!){
        UPDATE_USER_ROLE(user_id:$user_id)
    }
`

export const HACER_NORMAL= gql`
    mutation serNormal($user_id:String!){
        UPDATE_USER_ROLE_NORMAL(user_id:$user_id)
    }
`

export const ACTUALIZAR_CREATOR= gql`
    mutation actualizarCreator($user_id:String!,$username:String,$profile_picture:String,$bio:String){
        UPDATE_USER(user_id:$user_id,username:$username,profile_picture:$profile_picture,bio:$bio)
    }
`
