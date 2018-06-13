/******************************************************************************
 ** auth: liukai
 ** date: 2017/9
 ** ver : 1.0
 ** desc:  说明
 ** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
 ******************************************************************************/
/// <reference types="grpc" />
import { RpcConfig } from "./YSRpcConfig";
import * as Promise from "bluebird";
import * as grpc  from "grpc"


let LOG_PRE = 'RPC Service Log-->>>'

/**
 * RPC客户端
 *
 * @export
 * @class RPCClient
 */
export class RPCClient {
  private packageName: string;
  private protoPath: string;
  private addressConfig: RpcConfig;
  private grpcClient: any;
  private serviceName: string;

  /**
     * 
     * @param address 
     * @param serviceName 
=    * @param protoPath .proto file 路径
     * @param packageName  proto说明文件中package名称
     */
  constructor(
    address: RpcConfig,
    serviceName: string,
    protoPath: string,
    packageName: string
  ) {
    this.protoPath = protoPath;
    this.packageName = packageName;
    this.addressConfig = address;
    this.serviceName = serviceName;
    this.init()
  }

  private init() {
    let ipHost = this.addressConfig;
    var proto = grpc.load(this.protoPath)[this.packageName];
    let Service =   proto[this.serviceName]
    if (Service === undefined) {
      console.error(`${LOG_PRE} service [${this.serviceName}] not define in .proto file`)
      return
    }
    this.grpcClient =  new Service(
      ipHost.ip + ":" + ipHost.port,
      grpc.credentials.createInsecure()
    );
    this.mapgRpcServiceToSelf();
  }

  /** 
 *  protocol buffers可以定义四种类型的服务: https://grpc.io/docs/tutorials/basic/node.html
 * （1）一个 简单 RPC ， 客户端使用存根发送请求到服务器并等待响应返回，就像平常的函数调用一样。
 *    // Obtains the feature at a given position.
     rpc GetFeature(Point) returns (Feature) {}
 * （2）一个 服务器端流式 RPC ， 客户端发送请求到服务器，拿到一个流去读取返回的消息序列。 
 *      客户端读取返回的流，直到里面没有任何消息。从例子中可以看出，通过在 响应 类型前插入 stream 关键字，可以指定一个服务器端的流方法。
 *  // Obtains the Features available within the given Rectangle.  Results are
   // streamed rather than returned at once (e.g. in a response message with a
   // repeated field), as the rectangle may cover a large area and contain a
   // huge number of features.
   rpc ListFeatures(Rectangle) returns (stream Feature) {}
 * （3）一个 客户端流式 RPC ， 客户端写入一个消息序列并将其发送到服务器，
       同样也是使用流。一旦客户端完成写入消息，它等待服务器完成读取返回它的响应。通过在 请求 类型前指定 stream 关键字来指定一个客户端的流方法。
       // Accepts a stream of Points on a route being traversed, returning a
   // RouteSummary when traversal is completed.
    rpc RecordRoute(stream Point) returns (RouteSummary) {}
 * （4） 一个 双向流式 RPC 是双方使用读写流去发送一个消息序列。两个流独立操作，
       因此客户端和服务器可以以任意喜欢的顺序读写：比如， 服务器可以在写入响应前等待接收所有的客户端消息，或者可以交替的读取和写入消息，或者其他读写的组合。
      每个流中的消息顺序被预留。你可以通过在请求和响应前加 stream 关键字去制定方法的类型。
      // Accepts a stream of RouteNotes sent while a route is being traversed,
    // while receiving other RouteNotes (e.g. from other users).
   rpc RouteChat(stream RouteNote) returns (stream RouteNote) {}
 */
  private mapgRpcServiceToSelf() {
    let self = this;
    Object.keys(Object.getPrototypeOf(self.grpcClient)).forEach(function(
      functionName
    ) {
      const originalFunction = self.grpcClient[functionName];
      //如果是服务器接口函数，映射到当前对象
      if (
        originalFunction.requestStream !== undefined &&
        originalFunction.responseStream !== undefined
      ) {
        //判断当前服务接口的类型
        const genericFunctionSelector =
          (originalFunction.requestStream ? 2 : 0) |
          (originalFunction.responseStream ? 1 : 0);
        let genericFunctionName;
        switch (genericFunctionSelector) {
          case 0:
            //简单 RPC
            genericFunctionName = "makeUnaryRequest"
            self[functionName] = UnaryRequest.makeUnaryRequestunction(self.grpcClient, originalFunction)

            break
          case 1:
            // 一个 服务器端流式 RPC
            self[functionName] = originalFunction
            break
          case 2:
            //一个 客户端流式 RPC
            self[functionName] = originalFunction
            break
          case 3:
            //一个 双向流式 RPC
            self[functionName] = originalFunction
            break
        }
        console.log(`${LOG_PRE} find service ${functionName} `)
      }
    });

  }
}

//第一种 简单 RPC ，客户端通实现Promise方式调用
class UnaryRequest {
  private client: any;
  private originalFunction: Function;

  constructor(client, original_function) {
    this.client = client;
    this.originalFunction = original_function;
  }
  //发送数据到服务器端
  sendMessage(content = {}) {
    return new Promise((resolve, reject) => {
      this.originalFunction.call(this.client, content, function(
        error,
        response
      ) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
  static makeUnaryRequestunction(client, originalFunction): Function {
        return function () {
          return new UnaryRequest(client, originalFunction);
        }
  }
}


