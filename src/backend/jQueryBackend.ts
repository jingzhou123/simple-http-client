import { IHTTPRequest, IHTTPRequestOptions } from '..';

export class JQueryBackend implements IHTTPRequest {
  constructor(public jQuery: JQueryStatic = (window as any).jQuery) {
  }
  request(url: string, options: IHTTPRequestOptions) {
      return new Promise((resolve, reject) => {
          this.jQuery.ajax(url, {
            ...options,
            xhrFields: {
              withCredentials: options.withCredentials
            }
          } as any)
          .then(resolve, reject);
      });
  }
}
