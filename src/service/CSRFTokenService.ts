import { IHTTPRequest } from '../interface';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __FETCH_CSRF_TOKEN_RESP__: {
      __CSRF_TOKEN__: string;
      __CSRF_TOKEN_RESP__: any;
    }
  }
}

export class CSRFTokenService {
  constructor(public backend: IHTTPRequest, public url: string, public dataKeyName = 'data', public csrfTokenKeyName = 'csrfToken') {
    //
  }
  init() {
    return this.backend.request(this.url, { method: 'GET' }).then(resp => {
      window.__FETCH_CSRF_TOKEN_RESP__ = {
        __CSRF_TOKEN__: resp[this.dataKeyName][this.csrfTokenKeyName],
        __CSRF_TOKEN_RESP__: resp // 这个接口一调,csrf token就更新了，确保全局只调一次
      }
    });
  }
  getCsrfToken() {
    return window.__FETCH_CSRF_TOKEN_RESP__ && window.__FETCH_CSRF_TOKEN_RESP__.__CSRF_TOKEN__ || '';
  }
}
