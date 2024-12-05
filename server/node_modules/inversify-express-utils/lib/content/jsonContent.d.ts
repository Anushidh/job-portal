import { HttpContent } from './httpContent';
export declare class JsonContent<T extends Record<string, unknown>> extends HttpContent {
    private content;
    constructor(content: T | T[]);
    readAsync(): Promise<T | T[]>;
}
