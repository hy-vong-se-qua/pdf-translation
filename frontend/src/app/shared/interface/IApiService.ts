import { CustomType } from "../type/dynamic-type";
import { IResponse } from "./IResponse";
import { Observable } from "rxjs";

export interface IApiService {

  /**
   * Constructs a GET request that interprets the body as a JSON object and
   * @param pathname API pathname
   * @param query API url query
   * @returns request: Promise<ICount>
   */
  get(pathname: string, query: CustomType<string>): Promise<IResponse>;
  /**
   * Constructs a POST request that interprets the body as a JSON object and
   * @param pathname API pathname
   * @param query API url query
   * @param body API body
   * @returns request: Promise<IResponse>
   */
  post(pathname: string, body: Object, query: CustomType<string>): Promise<IResponse>;

  /**
   * Change request promise to request observable
   * @param request API request
   * @returns request: Observable<IResponse>
   */
  requestSubscribe(request: Promise<IResponse>): Observable<IResponse>;
}
