/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
******************************************************************************/

import { MyRequest } from "./myRequest"
import { RpcService, RPCStartup, YSHttpHandle, RPCClient, RpcConfig } from "../../src"
// import hprose = require('hprose');

let config1 = { host: "tcp://127.0.0.1:9001", name: 'Test' }
let config2 = { host: "tcp://127.0.0.1:9002", name: 'Test' }

let rpc = new RPCClient(config1)

rpc.call(romote => {
    romote.helloWorld().then(data => {
        console.log(data)
    })
 })
 rpc.call(romote => {
    romote.good('abc', function(data){
        console.log(data)        
    })
 })

// var hprose = require("hprose");
// var client = hprose.Client.create(config1.host);
// var proxy = client.useService();
// proxy.helloWorld("world").then(data => {
//     console.log(data)

// })
