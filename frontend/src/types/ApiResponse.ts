export type ResponseType<T = undefined> = {
  status: number;
  data?: T;
  errorCode?: string;
  errorMessage?: string;
};
