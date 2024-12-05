import { HttpResponseMessage } from '../httpResponseMessage';
import type { IHttpActionResult } from '../interfaces';
export declare class ResponseMessageResult implements IHttpActionResult {
    private message;
    constructor(message: HttpResponseMessage);
    executeAsync(): Promise<HttpResponseMessage>;
}
