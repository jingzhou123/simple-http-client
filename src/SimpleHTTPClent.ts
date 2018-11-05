import { IHTTPRequest, ISimpleHTTPClientConfig, IHTTPRequestOptions, interceptRequest, interceptResponse } from "./interface";
import { HTTPRequest } from "./HTTPRequest";
export class SimpleHTTPClent {
  constructor(public backend: IHTTPRequest, public config?: ISimpleHTTPClientConfig) {
  }
  public request(url: string, options: IHTTPRequestOptions): Promise<any> {
    const request = new HTTPRequest(url, options);
    const interceptedRequestPromise = interceptRequest(request, this.config && this.config.requestInterceptors);
    return interceptedRequestPromise
      .then(req => this.backend.request(req.url, req.options))
      .then(resp => interceptResponse(resp, this.config && this.config.responseInterceptors));
  }
  public get(url: string, data = {}, options = {}): Promise<any> {
    return this.request(url, {
      ...options,
      method: 'GET',
      data
    });
  }
  public post(url: string, data = {}, options = {}): Promise<any> {
    return this.request(url, {
      ...options,
      method: 'POST',
      data
    });
  }
}