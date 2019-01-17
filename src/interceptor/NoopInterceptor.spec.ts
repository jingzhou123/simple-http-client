import { NoopInterceptor } from "./NoopInterceptor";
import { HTTPRequest } from "../HTTPRequest";

describe('NoopIntercept', () => {
  it('should work', () => {
    const interceptor = new NoopInterceptor()
    const req = new HTTPRequest('url', { method: 'GET' });
    expect(interceptor.intercept(req)).toBe(req);
  })
})
