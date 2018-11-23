import { HTTPRequest } from './HTTPRequest';
import { HTTPResponse } from './HTTPResponse';


export interface ISimpleHTTPClientConfig {
  requestInterceptors?: IHTTPRequestInterceptor[];
  responseInterceptors?: IHTTPResponseInterceptor[];
}
export interface IHTTPRequestOptions {
  method: 'GET' | 'POST';
  data?: object;
  headers?: object;
  withCredentials?: boolean;
}
export interface IHTTPRequest {
  // tslint:disable-next-line:no-any
  request(url: string, options: IHTTPRequestOptions): Promise<any>;
}
export interface IHTTPRequestInterceptor {
  intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest>;
}
export interface IHTTPResponseInterceptor {
  // tslint:disable-next-line:no-any
  intercept(response: HTTPResponse): HTTPResponse | Promise<HTTPResponse> | any;
}

