"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringContent = void 0;
const httpContent_1 = require("./httpContent");
const DEFAULT_MEDIA_TYPE = 'text/plain';
class StringContent extends httpContent_1.HttpContent {
    constructor(content) {
        super();
        this.content = content;
        this.headers['content-type'] = DEFAULT_MEDIA_TYPE;
    }
    readAsync() {
        return Promise.resolve(this.content);
    }
}
exports.StringContent = StringContent;
