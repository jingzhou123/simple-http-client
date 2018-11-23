import { HTTPRequest, IHTTPRequestInterceptor } from '..';

export class HostInterceptor implements IHTTPRequestInterceptor {
  constructor(public host: string) {}
  intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
    request.url = this.host + request.url;

    return request;
  }
}
