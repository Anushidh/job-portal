import { HttpResponseMessage } from '../httpResponseMessage';
import type { IHttpActionResult } from '../interfaces';
export declare class OkNegotiatedContentResult<T> implements IHttpActionResult {
    private content;
    constructor(content: T);
    executeAsync(): Promise<HttpResponseMessage>;
}
