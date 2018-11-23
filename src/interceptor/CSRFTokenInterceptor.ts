import { IHTTPRequestInterceptor } from '../interface';
import { HTTPRequest } from '../HTTPRequest';

export class CSRFTokenInterceptor implements IHTTPRequestInterceptor {
    constructor(public config: { type?: 'header' | 'url'; key?: string; getCSRFToken(): string }) {
    }
    intercept(request: HTTPRequest): HTTPRequest | Promise<HTTPRequest> {
        if (this.config.type === 'url') {
            request.options.data = {
                ...(request.options.data || {}),
                [this.config.key || 'csrfToken']: this.config.getCSRFToken()
            };
        } else {
            request.options.headers = {
                ...(request.options.headers || {}),
                [this.config.key || 'X-CSRF-TOKEN']: this.config.getCSRFToken()
            };
        }

        return request;
    }
}
