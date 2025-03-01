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