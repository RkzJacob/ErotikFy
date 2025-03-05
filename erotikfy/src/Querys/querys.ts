import { gql } from "@apollo/client";

export const GET_ALL_CREATORS = gql`
    query{
    AllUsersWithCountsCreator{
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
        user_id
        username
        profile_picture
        bio
        }
    }
`;

export const GET_WEEKLY_FEED = gql`
    query GET_WEEKLY_FEED($user_id: String!) {
        GET_WEEKLY_FEED(user_id: $user_id){
        usuario{
          username
          profile_picture
        }
        post_id
        user_id
        title
        description
        media
        price
        is_public
        likes_count
        comments{
          comment_id
          content
          user{
            user_id
            username
            profile_picture
        
      }
    }
        
        
        
  }
  }
`;

export const GET_ID = gql`
    query get_id_usuario($username: String!) {
        getOneFindUser(username: $username){
        user_id
        }
    }
`;

export const GET_INFO_CREATOR = gql`
    query get_INFO_USUARIO($user_id: String!) {
        getOneFindUserID(user_id:$user_id){
          username
          profile_picture
          bio
          posts{
            media
            }
        }
    }
`;

export const GET_ALL_NORMALS = gql`
    query{
    AllUsersWithCountsNormales{
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
