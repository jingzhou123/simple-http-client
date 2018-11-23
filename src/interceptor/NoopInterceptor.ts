import { HTTPRequest, IHTTPRequestInterceptor } from '..';

export class NoopInterceptor implements IHTTPRequestInterceptor {
  intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
    return request;
  }
}
