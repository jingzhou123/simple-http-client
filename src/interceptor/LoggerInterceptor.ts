import { IHTTPRequestInterceptor } from '../interface';
import { HTTPRequest } from '../HTTPRequest';
export class LoggerInterceptor implements IHTTPRequestInterceptor {
  intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
    // tslint:disable-next-line:no-console
    console.log('request: ', {
      url: request.url,
      data: request.options.data,
      headers: request.options.headers
    });

    return request;
  }
}
