import { HTTPResponse, IHTTPResponseInterceptor, HTTPRequest, IHTTPRequestInterceptor } from '.';

function isPromise(promise: any) {
  return promise && typeof promise.then === 'function';
}
function chainPromise(initialValue: any, promiseList: Promise<any>[]) {
  return promiseList.reduce(() => {}, isPromise(initialValue) ? initialValue)
}
export function interceptResponse(response: HTTPResponse, interceptors: IHTTPResponseInterceptor[] = []):
  Promise<HTTPResponse> {

  let i = 0;
  let resultPromise: Promise<HTTPResponse> = Promise.resolve(response);
  while (i < interceptors.length) {
      let iterRes = interceptors[i].intercept(response);
      iterRes = isPromise(iterRes) ? iterRes as Promise<HTTPResponse> : Promise.resolve(iterRes);
      resultPromise = resultPromise && resultPromise.then(() => iterRes) || iterRes;
      i++;
  }

  return resultPromise;
}
export function interceptRequest(request: HTTPRequest, interceptors: IHTTPRequestInterceptor[] = []):
  Promise<HTTPRequest> {

  let i = 0;
  let resultPromise: Promise<HTTPRequest> = Promise.resolve(request);
  while (i < interceptors.length) {
      let iterRes = interceptors[i].intercept(request);
      iterRes = isPromise(iterRes) ? iterRes as Promise<HTTPRequest> : Promise.resolve(iterRes);
      resultPromise = resultPromise && resultPromise.then(() => iterRes) || iterRes;
      i++;
  }

  return resultPromise;
}
