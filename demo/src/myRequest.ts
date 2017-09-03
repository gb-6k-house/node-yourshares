/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
var http = require('http');

export class MyRequest {
    host: string
    port: number
    constructor(host: string, port: number = 8080) {
        this.host = host
        this.port = port
    }
    private request(method: string, path: string, data: any, cb: any, headers: any = {
        "Content-Type": 'charset=UTF-8',
    }) {
        if (typeof data === 'function') {
            headers = cb;
            cb = data;
        }
        headers = Object.assign({      }, headers)
        console.info(path + " 头部信息: " + JSON.stringify(headers));

        var opt = {
            host: this.host,
            port: this.port,
            method: method,
            path: path,
            headers: headers
        };
        var body = "";
        var req = http.request(opt, function (res) {
            console.log("post response: " + res.statusCode);
            res.setEncoding('utf8');
            res.on('data', function (d) {
                body += d;
            }).on('end', function () {
                console.log(res.headers);
                console.log('请求返回数据体:' + body);
                typeof cb === 'function' && cb(body)
            });
        }).on('error', function (e) {
            console.log("error: " + e.message);
        })
        if (typeof data !== 'function') {
            req.write(JSON.stringify(data));
        }
        req.end();
    }

    post(path: string, data: any, cb: (data) => void, header?: any) {
        this.request('POST', path, data, cb, header)
    }
    get(path: string, cb: (data) => void, header?: any) {
        this.request('GET', path, cb, header)
    }
    delete(path: string, cb: (data) => void, header?: any) {
        this.request('DELETE', path, cb, header)
    }
}