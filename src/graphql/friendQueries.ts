import { gql } from "@apollo/client";

export const GET_USERS = gql`
query SearchUsers($username: String) {
  searchUsers(username: $username) {
    id
    username
    streak
    email
  }
}
`;

export const GET_MY_CONFIRMED_FRIENDS = gql`
query GetMyConfirmedFriends {
  myConfirmedFriends {
    id
    username
    streak
  }
}
`;

export const GET_MY_RECIEVED_INVITES = gql`
query myReceivedInvites {
  myReceivedInvites {
    id
    username
    streak
  }
}
`;

