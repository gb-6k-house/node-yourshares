/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/

import {RPCStartup} from "../../src"

var PROTO_PATH = __dirname + '/protos/helloworld.proto';

/**/
class  HelloRpc {
  /**
    * Implements the SayHello RPC method.
    */
  sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
  }
  sayHello2(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
  }

}

var rpc = new RPCStartup({ip: '0.0.0.0', port: '50051'}, PROTO_PATH, 'helloworld')
rpc.addService({serviceName: 'Greeter', object: new HelloRpc()})
rpc.publish()


