import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $contrasena: String!){
    LOGIN_USER(username: $username, contrasena: $contrasena)
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

export const GET_URL = gql`
    mutation obtenerUrl($base64File: String!) {
        GET_UPLOAD_URL(base64File:$base64File)
}
`;