import { HttpContent } from './httpContent';
export declare class StringContent extends HttpContent {
    private content;
    constructor(content: string);
    readAsync(): Promise<string>;
}
