/******************************************************************************
** auth: liukai
** date: 2017/9
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
import { RpcConfig } from "./YSRpcConfig";
/**
 * RPC客户端
 *
 * @export
 * @class RPCClient
 */
export declare class RPCClient {
    client: any;
    proxy: any;
    constructor(config: RpcConfig);
    call(f: Function): void;
}
