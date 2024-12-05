import { HttpResponseMessage } from '../httpResponseMessage';
import type { IHttpActionResult } from '../interfaces';
export declare class JsonResult<T extends Record<string, unknown>> implements IHttpActionResult {
    readonly json: T | T[];
    readonly statusCode: number;
    constructor(json: T | T[], statusCode: number);
    executeAsync(): Promise<HttpResponseMessage>;
}
