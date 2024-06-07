import { gql } from "@apollo/client";

export const CREATE_TODOS = gql`
  mutation CreateTodo($text: String) {
    createTodo(text: $text)
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_RECURRING = gql`
mutation recurringDone($id: Int, $isRecurring: Boolean) {
  recurringDone(id: $id, isRecurring: $isRecurring)
}
`;

export const UPDATE_DONE = gql`
  mutation updateDone($id: Int, $isComplete: Boolean) {
    updateDone(id: $id, isComplete: $isComplete)
  }
`;
