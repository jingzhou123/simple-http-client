import { SimpleHTTPClent } from '..';
import { JQueryBackend } from '../backend/jQueryBackend';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __CSRF_TOKEN__: string;
    __IS_USER_RESP__: any;
  }
}

class CsrfTokenService {
  http = new SimpleHTTPClent(new JQueryBackend());
  isUserResp: any;
  constructor() {
    //
  }
  init() {
    return this.http.get('/api/dp/isUser').then(resp => {
      window.__CSRF_TOKEN__ = resp.data.csrfToken;
      window.__IS_USER_RESP__ = resp; // 这个接口一调,csrf token就更新了，确保全局只调一次
    });
  }
  getCsrfToken() {
    return window.__CSRF_TOKEN__;
  }
}

export const csrfTokenService = new CsrfTokenService();
