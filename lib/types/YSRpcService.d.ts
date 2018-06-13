/****************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  RPC发布
***************************************************************************/
import { RpcConfig } from "./YSRpcConfig";
export interface RpcService {
    serviceName: string;
    object: any;
}
/**
 * RPC服务器启动程序
 *
 * @export
 * @abstract
 * @class RPCStartup
 */
export declare class RPCStartup {
    private server;
    private rpclist;
    private packageName;
    private protoPath;
    private addressConfig;
    /**
     *
     * @param adrees
=     * @param protoPath .proto file 路径
     * @param packageName  proto说明文件中package名称
     */
    constructor(address: RpcConfig, protoPath: string, packageName: string);
    private findService;
    /**
     * 发布服务
     */
    publish(): void;
    /**
     * 添加发布对象
     */
    addService(server: RpcService): void;
}
