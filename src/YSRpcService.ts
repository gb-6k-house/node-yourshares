/****************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  RPC发布
***************************************************************************/

// import hprose = require('hprose');

import { RpcConfig} from "./YSRpcConfig"
import * as grpc  from "grpc"

//log日志前缀
let LOG_PRE = 'RPC Service Log-->>>'

export interface RpcService {
    serviceName: string, //对应proto文件中service 名称
    object: any //关联的类对象
}

/**
 * RPC服务器启动程序
 * 
 * @export
 * @abstract
 * @class RPCStartup
 */
export  class RPCStartup {
    private server: any
    private rpclist = []
    private packageName: string
    private protoPath: string
    private addressConfig: RpcConfig
    /**
     * 
     * @param adrees 
=     * @param protoPath .proto file 路径
     * @param packageName  proto说明文件中package名称
     */
    constructor(address: RpcConfig, protoPath: string, packageName: string) {
        this.protoPath = protoPath
        this.packageName = packageName
        this.addressConfig = address
    }
    //获取服务名关联的对象
    private findService(name: string): RpcService {
        for(var i=0; i<this.rpclist.length; i++) {
            if (this.rpclist[i].serviceName === name) {
                return this.rpclist[i]
            }
        }
    }

    /**
     * 发布服务
     */
    public publish() {
        //获取IP信息
        let ipHost = this.addressConfig
        this.server = new grpc.Server()
        var proto = grpc.load(this.protoPath)[this.packageName]
        //proto对象map了.proto文件信息
        //获取proto对象中类型为ServiceClient对象存在service属性。这种对象实际上对应.proto中的service节点
        //遍历proto获取service
        console.log(`==============>尧尚信息科技(wwww.yourshares.cn)<================\n>>>${ipHost.ip}:${ipHost.port}<<< publish api`)
        let self = this
        Object.getOwnPropertyNames(proto).forEach(propertyName => {
            // if (typeof proto[property]. === 'function' && proto[property].name === 'ServiceClient'){ //通过判断方法名来获取service对象
            //通过判断是否存在service属性来获取service对象
            if (proto[propertyName].service !== undefined){
                let serviceObject =  self.findService(propertyName)
                console.log(`${LOG_PRE} service ${propertyName} publish api [Begin]`)
                if (serviceObject !== undefined && serviceObject.object !== undefined) {
                    let apiObject =  serviceObject.object
                    var routerObject = {}
                    //Object.keys(Object.getPrototypeOf(apiObject))
                    //获取自己本身的属性
                    Object.getOwnPropertyNames(apiObject).forEach(rpcFuncName => {
                        //发布apiObject 方法 
                        //所有未在.proto中定义和_开头的方法不会发布
                        // console.log(`${LOG_PRE} find object ${serviceObject.serviceName} function: ${rpcFuncName}`)
                        if (proto[propertyName].service[rpcFuncName] !== undefined 
                            && typeof apiObject[rpcFuncName] === 'function'
                             && !rpcFuncName.hasPrefix('_')){
                            console.log(`${LOG_PRE} ${serviceObject.serviceName} 发布接口 ${rpcFuncName}`)
                            routerObject[rpcFuncName] =  apiObject[rpcFuncName]
                        }
                    })
                    //获取原型连上的方法
                    Object.getOwnPropertyNames(Object.getPrototypeOf(apiObject)).forEach(rpcFuncName => {
                        //发布apiObject 方法 
                        //所有未在.proto中定义和_开头的方法不会发布
                        // console.log(`${LOG_PRE} find object ${serviceObject.serviceName} function: ${rpcFuncName}`)
                        if (rpcFuncName !== 'constructor' && proto[propertyName].service[rpcFuncName] !== undefined 
                            && typeof apiObject[rpcFuncName] === 'function'
                             && !rpcFuncName.hasPrefix('_')){
                            console.log(`${LOG_PRE} ${serviceObject.serviceName} 发布接口 ${rpcFuncName}`)
                            routerObject[rpcFuncName] =  apiObject[rpcFuncName]
                        }
                    })
                    //grpc发布服务
                    self.server.addService(proto[propertyName].service, routerObject)
                }else{
                    //服务没有找到关联的对象
                    console.error(`${LOG_PRE} ${propertyName} have no map Object!!!!`)
                }
                console.log(`${LOG_PRE} service ${propertyName} publish api [End]`)

            }

        })
        this.server.bind(ipHost.ip+ ':'+ ipHost.port, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }
    //
    /**
     * 添加发布对象
     */
    public addService(server: RpcService) {
        this.rpclist.push(server)
    }
}
