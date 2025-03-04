import { gql } from "@apollo/client";

export const GET_ALL_CREATORS = gql`
    query{
  AllUsersWithCounts{
    user_id
    username
    role
    email
    profile_picture
    bio
    created_at
    updated_at
    followers_count
    following_count
  }
}

`


export const FILTRAR_USUARIOS = gql`
    query filtrado_usuarios($search: String!) {
        FILTRAR_USUARIOS(search: $search){
        username
        profile_picture
        bio
        }
    }
`;

export const GET_WEEKLY_FEED = gql`
    query POST_SEMANALES($user_id: String!) {
        GET_WEEKLY_FEED(user_id: $user_id){
        username
        profile_picture
        bio
        }
    }
`;