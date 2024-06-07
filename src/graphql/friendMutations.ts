import { gql } from "@apollo/client";

export const REMOVE_FRIEND = gql`
mutation Mutation($friendId: Int!) {
  removeFriend(friendId: $friendId)
}`;

export const ADD_FRIEND = gql`
mutation AddFriend($friendId: Int!) {
  addFriend(friendId: $friendId)
}`;

export const ACCEPT_FRIEND = gql`
mutation acceptFriendRequest($friendId: Int!) {
  acceptFriendRequest(friendId: $friendId)
}`;