import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $contrasena: String!){
    LOGIN_USER(username: $username, contrasena: $contrasena)
    }

`

export const REGISTER_MUTATION_USERNORMAL = gql`
    mutation createUser($username: String!, $email: String!, $contrasena: String!) {
        CREATE_USER(username: $username,contrasena: $contrasena,email:"")
    }
    `;