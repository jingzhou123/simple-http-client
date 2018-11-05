import { IHTTPResponseInterceptor } from "./interface";
export class GetDataInterceptor implements IHTTPResponseInterceptor {
  public intercept(response: any) {
    console.log('got data: ', response.data);
    return response.data;
  }
}