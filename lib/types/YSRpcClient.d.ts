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
    private packageName;
    private protoPath;
    private addressConfig;
    private grpcClient;
    private serviceName;
    /**
       *
       * @param address
       * @param serviceName
  =    * @param protoPath .proto file 路径
       * @param packageName  proto说明文件中package名称
       */
    constructor(address: RpcConfig, serviceName: string, protoPath: string, packageName: string);
    private init;
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
    private mapgRpcServiceToSelf;
}
