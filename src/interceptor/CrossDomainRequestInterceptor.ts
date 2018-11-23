import { HTTPRequest, IHTTPRequestInterceptor } from '..';

export class CrossDomainInterceptor implements IHTTPRequestInterceptor {
  intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
    request.options.withCredentials = typeof request.options.withCredentials === 'undefined' ? true :
      request.options.withCredentials;

    return request;
  }
}
