import { IHTTPRequest, ISimpleHTTPClientConfig, IHTTPRequestOptions } from './interface';
import { HTTPRequest } from './HTTPRequest';
import { interceptRequest, interceptResponse } from './utils';
export class SimpleHTTPClent {
  constructor(public backend: IHTTPRequest, public config?: ISimpleHTTPClientConfig) {
  }
  // tslint:disable-next-line:no-any
  request(url: string, options: IHTTPRequestOptions): Promise<any> {
    const request = new HTTPRequest(url, options);
    const interceptedRequestPromise = interceptRequest(request, this.config && this.config.requestInterceptors);

    return interceptedRequestPromise
      .then(req => this.backend.request(req.url, req.options))
      .then(resp => interceptResponse(resp, this.config && this.config.responseInterceptors));
  }
  // tslint:disable-next-line:no-any
  get(url: string, data = {}, options = {}): Promise<any> {
    return this.request(url, {
      ...options,
      method: 'GET',
      data
    });
  }
  // tslint:disable-next-line:no-any
  post(url: string, data = {}, options = {}): Promise<any> {
    return this.request(url, {
      ...options,
      method: 'POST',
      data
    });
  }
}
