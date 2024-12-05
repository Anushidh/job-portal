import { HttpResponseMessage } from '../httpResponseMessage';
import type { IHttpActionResult } from '../interfaces';
export declare class ExceptionResult implements IHttpActionResult {
    private error;
    constructor(error: Error);
    executeAsync(): Promise<HttpResponseMessage>;
}
