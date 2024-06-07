import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodo {
    getTodos {
      id
      text
      userId
      isComplete
      isRecurring
    }
  }
`;
