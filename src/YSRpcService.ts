/****************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  RPC发布
***************************************************************************/
declare var process
import hprose = require('hprose');
import { RpcConfig} from "./YSRpcConfig"

export interface RpcService {
}


/**
 * RPC服务器启动程序
 * 
 * @export
 * @abstract
 * @class RPCStartup
 */
export  abstract class RPCStartup {
    private server: any
    private rpclist = []

    private startup() {
        this.server = hprose.Server.create(this.serverHost().host);
        this.rpclist = this.rpcClass()
        this.publishAPI();
        this.server.start();
    }
    //服务器地址，子类必须实现
    protected abstract serverHost(): RpcConfig
    /**
     * 需要发布的对象 
     * 
     * @protected
     * @abstract
     * @returns {RpcService} 
     * @memberof RPCStartup
     */
    protected abstract rpcClass(): [RpcService]

    /**
     * 发布rpcClass类型的所有static 方法 _开头的方法不会发布
     * 
     * @memberof RPCStartup
     */
    private publishAPI(): void {

        console.log(`==============>尧尚信息科技(wwww.yourshares.cn)<================\n>>>${this.serverHost().host}<<<发布接口`)

        if (this.rpclist != null) {
            this.rpclist.forEach(rpc => {
                Object.getOwnPropertyNames(rpc).forEach(rpcFuncName => {
                    if (typeof rpc[rpcFuncName] === 'function' && !rpcFuncName.hasPrefix('_')){
                        console.log(`${rpc['name']} 发布接口 ${rpcFuncName}`)
                        this.server.addFunction(rpc[rpcFuncName], rpcFuncName)
                    }
                })
            })
        }
    }
    /**
     * 启动Service
     * 
     * @static
     * @returns {number} 
     * @memberof RPCStartup
     */
    public static main(): number {
        let rpc = Object.create(this.prototype);
        rpc.startup()
        //我们可以uncaughtException来全局捕获未捕获的Error，同时你还可以将此函数的调用栈打印出来，捕获之后可以有效防止node进程退出
        //我们也可以用node-forever 提供了守护的功能和LOG日志记录功能。
        process.on('uncaughtException', function (err) {
            //打印出错误
            //console.log(err);
            //打印出错误的调用栈方便调试
            console.error(JSON.stringify(err.stack));
        });
        return 0;
    }
}
