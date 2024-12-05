import { HttpResponseMessage } from '../httpResponseMessage';
import type { IHttpActionResult } from '../interfaces';
export declare class BadRequestErrorMessageResult implements IHttpActionResult {
    private message;
    constructor(message: string);
    executeAsync(): Promise<HttpResponseMessage>;
}
