"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonContent = void 0;
const httpContent_1 = require("./httpContent");
const DEFAULT_MEDIA_TYPE = 'application/json';
class JsonContent extends httpContent_1.HttpContent {
    constructor(content) {
        super();
        this.content = content;
        this.headers['content-type'] = DEFAULT_MEDIA_TYPE;
    }
    readAsync() {
        return Promise.resolve(this.content);
    }
}
exports.JsonContent = JsonContent;
