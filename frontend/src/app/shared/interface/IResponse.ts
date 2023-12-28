export interface IResponse<T = any> {
  status?: string;
  errorCode?: string;
  data?: T;
}
