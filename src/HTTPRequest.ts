import { IHTTPRequestOptions } from './interface';
export class HTTPRequest {
  constructor(public url: string, public options: IHTTPRequestOptions) {
  }
}
