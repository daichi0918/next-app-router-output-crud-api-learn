'use server';

import { StatusCodes } from 'http-status-codes';

import { deleteFetch, getFetch, postFetch, putFetch } from '@/actions/fetch';
import { ResponseType } from '@/types/ApiResponse';
import {
  CreateTodoRequest,
  DeleteTodoRequest,
  GetTodoRequest,
  TodoListResponseType,
  TodoType,
  UpdateTodoRequest,
} from '@/types/todo';

export const getTodoList = async (): Promise<
  ResponseType<TodoListResponseType>
> => {
  try {
    const response = await getFetch({
      path: 'todos',
      tagName: 'getTodoList',
    });
    const data = await response.json();

    if (response.status === StatusCodes.OK) {
      return {
        status: response.status,
        data,
      };
    }

    return {
      status: response.status,
      errorCode: data.code,
      errorMessage: data.message,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
      errorMessage: `Internal Server Error: ${error}`,
    };
  }
};

export const getTodo = async (
  req: GetTodoRequest
): Promise<ResponseType<TodoType>> => {
  try {
    const response = await getFetch({
      path: `todos/${req.id}`,
      tagName: 'getTodoList',
    });
    const data = await response.json();

    if (response.status === StatusCodes.OK) {
      return {
        status: response.status,
        data,
      };
    }

    return {
      status: response.status,
      errorCode: data.code,
      errorMessage: data.message,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
      errorMessage: `Internal Server Error: ${error}`,
    };
  }
};

export const createTodo = async (
  req: CreateTodoRequest
): Promise<ResponseType<TodoType>> => {
  console.log('[Server Action] createTodo called:', req);

  try {
    const response = await postFetch({
      path: 'todos',
      body: req,
    });
    const data = await response.json();

    if (response.status === StatusCodes.CREATED) {
      return {
        status: response.status,
        data,
      };
    }

    return {
      status: response.status,
      errorCode: data.code,
      errorMessage: data.message,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
      errorMessage: `Internal Server Error: ${error}`,
    };
  }
};

export const updateTodo = async (
  req: UpdateTodoRequest
): Promise<ResponseType<TodoType>> => {
  console.log('[Server Action] updateTodo called:', req);

  try {
    const response = await putFetch({
      path: `todos/${req.id}`,
      body: req,
    });
    const data = await response.json();

    if (response.status === StatusCodes.OK) {
      return {
        status: response.status,
        data,
      };
    }

    return {
      status: response.status,
      errorCode: data.code,
      errorMessage: data.message,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
      errorMessage: `Internal Server Error: ${error}`,
    };
  }
};

export const deleteTodo = async (
  req: DeleteTodoRequest
): Promise<ResponseType> => {
  console.log('[Server Action] deleteTodo called:', req);

  try {
    const response = await deleteFetch({
      path: `todos/${req.id}`,
    });

    if (response.status === StatusCodes.NO_CONTENT) {
      return {
        status: response.status,
      };
    }

    const data = await response.json();

    return {
      status: response.status,
      errorCode: data.code,
      errorMessage: data.message,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      errorCode: `${StatusCodes.INTERNAL_SERVER_ERROR}`,
      errorMessage: `Internal Server Error: ${error}`,
    };
  }
};
