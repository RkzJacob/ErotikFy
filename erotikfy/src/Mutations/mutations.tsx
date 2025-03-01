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