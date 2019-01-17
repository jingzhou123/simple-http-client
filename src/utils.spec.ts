import { IHTTPRequestInterceptor, IHTTPResponseInterceptor } from './interface';
import { HTTPRequest } from './HTTPRequest';
import { interceptRequest, interceptResponse } from './utils';
import { HTTPResponse } from './HTTPResponse';

describe('utils', () => {
  it('interceptResponse', () => {
    class Interceptor1 implements IHTTPResponseInterceptor{
      intercept(response: any): any {
        response.response = response.response + 'data1'
        return Promise.resolve(response);
      }
    }
    class Interceptor2 implements IHTTPResponseInterceptor{
      intercept(response: any): any {
        response.response = response.response + 'data2'
        return response;
      }
    }
    const interceptors: IHTTPResponseInterceptor[] = [
      new Interceptor1(), new Interceptor2()
    ]
    const result = interceptResponse(new HTTPResponse('any'), interceptors)
    expect(result).resolves.toEqual({ response: 'anydata1data2' })
  })
  it('interceptRequest', () => {
    class Interceptor1 implements IHTTPRequestInterceptor  {
      intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
        request.url = request.url + 'url1'
        return Promise.resolve(request);
      }
    }
    class Interceptor2 implements IHTTPRequestInterceptor  {
      intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
        request.url = request.url + 'url2'
        return request;
      }
    }
    const interceptors: IHTTPRequestInterceptor[] = [
      new Interceptor1(), new Interceptor2()
    ]
    const result = interceptRequest(new HTTPRequest('any', { method: 'GET' }), interceptors)
    expect(result).resolves.toBeInstanceOf(HTTPRequest)
    expect(result).resolves.toHaveProperty('url', 'anyurl1url2')
  })
})
