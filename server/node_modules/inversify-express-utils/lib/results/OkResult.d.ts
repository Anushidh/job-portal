import { HttpResponseMessage } from '../httpResponseMessage';
import type { IHttpActionResult } from '../interfaces';
export declare class OkResult implements IHttpActionResult {
    executeAsync(): Promise<HttpResponseMessage>;
}
