export type TodoType = {
  id: string;
  title: string;
  content?: string;
};

export type TodoListResponseType = {
  todos: TodoType[];
  total: number;
};

export type GetTodoRequest = {
  id: string;
};

export type CreateTodoRequest = {
  title: string;
  content?: string;
};

export type UpdateTodoRequest = {
  id: string;
  title: string;
  content?: string;
};
