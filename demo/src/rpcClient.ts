/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/


import {RPCClient} from "../../src"


var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var client: any = new RPCClient({ip: '0.0.0.0', port: '50051'},'Greeter', PROTO_PATH, 'helloworld')


client.sayHello().sendMessage({name: 'world'}).then((message) =>{
    console.log('Greeting:', message);
})
