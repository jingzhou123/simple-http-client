import { IHTTPRequestInterceptor } from "./interface";
import { HTTPRequest } from "./HTTPRequest";
export class LoggerInterceptor implements IHTTPRequestInterceptor {
  public intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
    console.log('request: ', {
      url: request.url,
      data: request.options.data,
      headers: request.options.headers
    });
    return request;
  }
}