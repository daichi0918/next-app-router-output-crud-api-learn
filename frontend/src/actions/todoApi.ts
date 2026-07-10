'use server';

import { StatusCodes } from 'http-status-codes';

import { getFetch } from '@/actions/fetch';
import { ResponseType } from '@/types/ApiResponse';
import { GetTodoRequest, TodoListResponseType, TodoType } from '@/types/todo';

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
