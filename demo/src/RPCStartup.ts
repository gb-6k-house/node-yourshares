/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
import { RpcService, RPCStartup, YSHttpHandle, RPCClient, RpcConfig } from "../../src"
import * as Promise from 'bluebird';


let config1 = { host: "tcp://127.0.0.1:9001", name: 'Test' }
let config2 = { host: "tcp://127.0.0.1:9002", name: 'Test2' }

class HelloRpcImpl implements RpcService {
  public static helloWorld() {
    return new Promise(function (resolve, reject) {
      resolve('hello world')
    })
  }
}

class MainRpcImpl implements RpcService {
  public static good() {
    return new Promise(function (resolve, reject) {
      resolve('good')
    })
  }
}


class Startup extends RPCStartup {

  protected serverHost(): RpcConfig {
    return config1
  }

  protected rpcClass(): [RpcService] {
    return [HelloRpcImpl, MainRpcImpl]
  }

}
class Startup2 extends RPCStartup {

  protected serverHost(): RpcConfig {
    return config2
  }

  protected rpcClass(): [RpcService] {
    return [MainRpcImpl]
  }

}


Startup.main()
Startup2.main()



