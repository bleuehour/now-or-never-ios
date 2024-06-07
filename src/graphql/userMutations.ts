import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
mutation Register($username: String!, $email: String!, $password: String!) {
  Register(username: $username, email: $email, password: $password) {
    token
    user {
      id
      email
      username
    }
  }
}
`;

export const LOGIN_MUTATION = gql`
mutation Mutation($email: String, $password: String) {
  Login(email: $email, password: $password) {
    token
    user{
      email
      id
      username
    }
  }
}
`;


export const DELETE_USER = gql`
mutation DeleteUser {
  DeleteUser
}`