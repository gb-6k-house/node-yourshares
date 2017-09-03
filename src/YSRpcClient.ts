/******************************************************************************
** auth: liukai
** date: 2017/9
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
import { RpcConfig } from "./YSRpcConfig"
import hprose = require('hprose');

/**
 * RPC客户端
 * 
 * @export
 * @class RPCClient
 */
export class RPCClient {
    client = null
    proxy = null
    constructor(config: RpcConfig) {

        // let hostlist = config.map(row => {
        //     return row.host
        // })
        this.client = hprose.Client.create(config.host);
        this.client.fullDuplex = true;
        this.client.maxPoolSize = 2;
        this.client.on('error', function (func, e) {
            console.error(func, e);
        });
       this.proxy = this.client.useService()
    }
    public call(f: Function) {
        try {
            f(this.proxy)
        } catch (e) {
            console.error(e);
        }
    }
}