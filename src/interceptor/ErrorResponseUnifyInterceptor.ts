import { IHTTPResponseInterceptor, HTTPResponse } from '..';

export class ErrorResponseUnifyInterceptor implements IHTTPResponseInterceptor {
  constructor(public config: { oldErrCodeKey: string; oldErrMsgKey: string;
    newErrCodeKey?: string; newErrMsgKey?: string; errCodeTransform?(oldErrCode: any, response: any): any;
  }) {
    this.config = {
      newErrCodeKey: 'errCode',
      newErrMsgKey: 'errMsg',
      ...config
    };
  }
  intercept(response: any): HTTPResponse | Promise<HTTPResponse> {
    response[this.config.newErrMsgKey as any] = response[this.config.oldErrMsgKey];
    response[this.config.newErrCodeKey as any] = this.config.errCodeTransform ?
      this.config.errCodeTransform(response[this.config.oldErrCodeKey], response) : response[this.config.oldErrCodeKey];

    return response;
  }
}
