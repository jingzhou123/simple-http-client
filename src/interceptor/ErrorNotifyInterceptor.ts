import { IHTTPResponseInterceptor, HTTPResponse } from '..';

export class ErrorNotifyInterceptor implements IHTTPResponseInterceptor {
  constructor(public dialog: { alert(errMsg: string): void },
              public errMsgKeyName = 'errMsg', public errCodeKeyName = 'errCode', public NoneFailErrCode = 0) {}
  intercept(response: any): HTTPResponse | Promise<HTTPResponse> {
    if (response[this.errCodeKeyName] !== this.NoneFailErrCode) {
      this.dialog.alert(response[this.errMsgKeyName]);

      return Promise.reject(response);
    }

    return response;
  }
}
