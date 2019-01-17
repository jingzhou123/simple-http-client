import { IHTTPRequestInterceptor } from './interface';
import { HTTPRequest } from './HTTPRequest';
import { interceptRequest } from './utils';

describe('utils', () => {
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
