
export interface TodoItemProps {
  id: number;
  text: string;
  createdAt: string;
  userId: string;
}

export interface Todo {
  id: number;
  text: string;
  createdAt: string;
  userId: string;
  isComplete: boolean;
  isRecurring:boolean;
}

export interface Me {
  id: number;
  username: string;
}

export interface Invites {
  username: string;
  friends: [Friends];
}
export interface Friends {
  id: number;
  userId: string;
  friendId: string;
  isPending: boolean;
}
export type DisplayTodosProps = {
  data?: {
    getTodos: Todo[];
  };
  refetch?: () => void;
};

export type DisplayInviteProps = {
  data?: {
    getTodos: Todo[];
  };
};

