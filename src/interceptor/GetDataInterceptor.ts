import { IHTTPResponseInterceptor } from '../interface';
export class GetDataInterceptor implements IHTTPResponseInterceptor {
  // tslint:disable-next-line:no-any
  intercept(response: any) {
    // tslint:disable-next-line:no-console
    // console.log('got data: ', response.data);

    // return { ...(response.data || {}), __ORIGINAL_RESPONSE__: response };
    return response.data;
  }
}
