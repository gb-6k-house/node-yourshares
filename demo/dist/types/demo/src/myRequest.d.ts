export declare class MyRequest {
    host: string;
    port: number;
    constructor(host: string, port?: number);
    private request(method, path, data, cb, headers?);
    post(path: string, data: any, cb: (data) => void, header?: any): void;
    get(path: string, cb: (data) => void, header?: any): void;
    delete(path: string, cb: (data) => void, header?: any): void;
}
