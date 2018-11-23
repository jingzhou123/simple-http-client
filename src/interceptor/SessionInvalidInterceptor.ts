import { IHTTPResponseInterceptor, HTTPResponse } from '..';

export class SessionInvalidInterceptor implements IHTTPResponseInterceptor {
  constructor(public errCodeForSessionInvalid: any, public dataKeyName = 'data',
              public loginUrlName = 'loginUrl', public loginUrl?: string) {
  }
  intercept(response: any): HTTPResponse | Promise<HTTPResponse> {
    if (response.errCode === this.errCodeForSessionInvalid) {
      // tslint:disable-next-line:max-line-length
      window.location.assign(`${this.loginUrl || response[this.dataKeyName][this.loginUrlName]}&redirectUrl=${encodeURIComponent(window.location.href)}`);
    }

    return response;
  }
}
