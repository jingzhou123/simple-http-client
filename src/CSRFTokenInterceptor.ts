import { IHTTPRequestInterceptor } from "./interface";
import { HTTPRequest } from "./HTTPRequest";
export class CSRFTokenInterceptor implements IHTTPRequestInterceptor {
  public intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
    request.options.headers = request.options.headers || { 'X-CSRF-TOKEN': 'token' };
    return request;
  }
}
