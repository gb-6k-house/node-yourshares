"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("bluebird");
const grpc = require("grpc");
/**
 * RPC客户端
 *
 * @export
 * @class RPCClient
 */
class RPCClient {
    /**
       *
       * @param address
       * @param serviceName
  =    * @param protoPath .proto file 路径
       * @param packageName  proto说明文件中package名称
       */
    constructor(address, serviceName, protoPath, packageName) {
        this.protoPath = protoPath;
        this.packageName = packageName;
        this.addressConfig = address;
        this.serviceName = serviceName;
    }
    init() {
        let ipHost = this.addressConfig;
        var proto = grpc.load(this.protoPath)[this.packageName];
        this.grpcClient = proto[this.serviceName](ipHost.ip + ":" + ipHost.port, grpc.credentials.createInsecure());
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
    mapgRpcServiceToSelf() {
        let self = this;
        Object.keys(Object.getPrototypeOf(self.grpcClient)).forEach(function (functionName) {
            const originalFunction = self.grpcClient[functionName];
            //如果是服务器接口函数，映射到当前对象
            if (originalFunction.requestStream !== undefined &&
                originalFunction.responseStream !== undefined) {
                //判断当前服务接口的类型
                const genericFunctionSelector = (originalFunction.requestStream ? 2 : 0) |
                    (originalFunction.responseStream ? 1 : 0);
                let genericFunctionName;
                switch (genericFunctionSelector) {
                    case 0:
                        //简单 RPC
                        genericFunctionName = "makeUnaryRequest";
                        self[functionName] = UnaryRequest.makeUnaryRequestunction(self.grpcClient, originalFunction);
                        break;
                    case 1:
                        // 一个 服务器端流式 RPC
                        self[functionName] = originalFunction;
                        break;
                    case 2:
                        //一个 客户端流式 RPC
                        self[functionName] = originalFunction;
                        break;
                    case 3:
                        //一个 双向流式 RPC
                        self[functionName] = originalFunction;
                        break;
                }
            }
        });
    }
}
exports.RPCClient = RPCClient;
//第一种 简单 RPC ，客户端通实现Promise方式调用
class UnaryRequest {
    constructor(client, original_function) {
        this.client = client;
        this.originalFunction = original_function;
    }
    //发送数据到服务器端
    sendMessage(content = {}) {
        return new Promise((resolve, reject) => {
            this.originalFunction.call(this.client, content, function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    static makeUnaryRequestunction(client, originalFunction) {
        return new UnaryRequest(client, originalFunction);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvWVNScGNDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTQSxvQ0FBb0M7QUFDcEMsNkJBQTZCO0FBRTdCOzs7OztHQUtHO0FBQ0g7SUFPRTs7Ozs7O1NBTUs7SUFDTCxZQUNFLE9BQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLFNBQWlCLEVBQ2pCLFdBQW1CO1FBRW5CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxJQUFJO1FBQ1YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNoQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUN2QyxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUNsQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCQztJQUNPLG9CQUFvQjtRQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUMxRCxZQUFZO1lBRVosTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZELG9CQUFvQjtZQUNwQixJQUNFLGdCQUFnQixDQUFDLGFBQWEsS0FBSyxTQUFTO2dCQUM1QyxnQkFBZ0IsQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUM3QztnQkFDQSxhQUFhO2dCQUNiLE1BQU0sdUJBQXVCLEdBQzNCLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksbUJBQW1CLENBQUM7Z0JBQ3hCLFFBQVEsdUJBQXVCLEVBQUU7b0JBQy9CLEtBQUssQ0FBQzt3QkFDSixRQUFRO3dCQUNSLG1CQUFtQixHQUFHLGtCQUFrQixDQUFBO3dCQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDNUYsTUFBSztvQkFDUCxLQUFLLENBQUM7d0JBQ0osZ0JBQWdCO3dCQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsZ0JBQWdCLENBQUE7d0JBQ3JDLE1BQUs7b0JBQ1AsS0FBSyxDQUFDO3dCQUNKLGNBQWM7d0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLGdCQUFnQixDQUFBO3dCQUNyQyxNQUFLO29CQUNQLEtBQUssQ0FBQzt3QkFDSixhQUFhO3dCQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQTt3QkFDckMsTUFBSztpQkFDUjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsR0QsOEJBa0dDO0FBRUQsK0JBQStCO0FBQy9CO0lBSUUsWUFBWSxNQUFNLEVBQUUsaUJBQWlCO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsV0FBVztJQUNYLFdBQVcsQ0FBQyxPQUFPLEdBQUcsRUFBRTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFDL0MsS0FBSyxFQUNMLFFBQVE7Z0JBRVIsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbkI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCO1FBQ2pELE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDdkQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICoqIGF1dGg6IGxpdWthaVxuICoqIGRhdGU6IDIwMTcvOVxuICoqIHZlciA6IDEuMFxuICoqIGRlc2M6ICDor7TmmI5cbiAqKiBDb3B5cmlnaHQgwqkgMjAxN+W5tCDlsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKS4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiZ3JwY1wiIC8+XG5pbXBvcnQgeyBScGNDb25maWcgfSBmcm9tIFwiLi9ZU1JwY0NvbmZpZ1wiO1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcbmltcG9ydCAqIGFzIGdycGMgIGZyb20gXCJncnBjXCJcblxuLyoqXG4gKiBSUEPlrqLmiLfnq69cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUlBDQ2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBSUENDbGllbnQge1xuICBwcml2YXRlIHBhY2thZ2VOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcHJvdG9QYXRoOiBzdHJpbmc7XG4gIHByaXZhdGUgYWRkcmVzc0NvbmZpZzogUnBjQ29uZmlnO1xuICBwcml2YXRlIGdycGNDbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBzZXJ2aWNlTmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBhZGRyZXNzIFxuICAgICAqIEBwYXJhbSBzZXJ2aWNlTmFtZSBcbj0gICAgKiBAcGFyYW0gcHJvdG9QYXRoIC5wcm90byBmaWxlIOi3r+W+hFxuICAgICAqIEBwYXJhbSBwYWNrYWdlTmFtZSAgcHJvdG/or7TmmI7mlofku7bkuK1wYWNrYWdl5ZCN56ewXG4gICAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGFkZHJlc3M6IFJwY0NvbmZpZyxcbiAgICBzZXJ2aWNlTmFtZTogc3RyaW5nLFxuICAgIHByb3RvUGF0aDogc3RyaW5nLFxuICAgIHBhY2thZ2VOYW1lOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5wcm90b1BhdGggPSBwcm90b1BhdGg7XG4gICAgdGhpcy5wYWNrYWdlTmFtZSA9IHBhY2thZ2VOYW1lO1xuICAgIHRoaXMuYWRkcmVzc0NvbmZpZyA9IGFkZHJlc3M7XG4gICAgdGhpcy5zZXJ2aWNlTmFtZSA9IHNlcnZpY2VOYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCkge1xuICAgIGxldCBpcEhvc3QgPSB0aGlzLmFkZHJlc3NDb25maWc7XG4gICAgdmFyIHByb3RvID0gZ3JwYy5sb2FkKHRoaXMucHJvdG9QYXRoKVt0aGlzLnBhY2thZ2VOYW1lXTtcbiAgICB0aGlzLmdycGNDbGllbnQgPSBwcm90b1t0aGlzLnNlcnZpY2VOYW1lXShcbiAgICAgIGlwSG9zdC5pcCArIFwiOlwiICsgaXBIb3N0LnBvcnQsXG4gICAgICBncnBjLmNyZWRlbnRpYWxzLmNyZWF0ZUluc2VjdXJlKClcbiAgICApO1xuICAgIHRoaXMubWFwZ1JwY1NlcnZpY2VUb1NlbGYoKTtcbiAgfVxuXG4gIC8qKiBcbiAqICBwcm90b2NvbCBidWZmZXJz5Y+v5Lul5a6a5LmJ5Zub56eN57G75Z6L55qE5pyN5YqhOiBodHRwczovL2dycGMuaW8vZG9jcy90dXRvcmlhbHMvYmFzaWMvbm9kZS5odG1sXG4gKiDvvIgx77yJ5LiA5LiqIOeugOWNlSBSUEMg77yMIOWuouaIt+err+S9v+eUqOWtmOagueWPkemAgeivt+axguWIsOacjeWKoeWZqOW5tuetieW+heWTjeW6lOi/lOWbnu+8jOWwseWDj+W5s+W4uOeahOWHveaVsOiwg+eUqOS4gOagt+OAglxuICogICAgLy8gT2J0YWlucyB0aGUgZmVhdHVyZSBhdCBhIGdpdmVuIHBvc2l0aW9uLlxuICAgICBycGMgR2V0RmVhdHVyZShQb2ludCkgcmV0dXJucyAoRmVhdHVyZSkge31cbiAqIO+8iDLvvInkuIDkuKog5pyN5Yqh5Zmo56uv5rWB5byPIFJQQyDvvIwg5a6i5oi356uv5Y+R6YCB6K+35rGC5Yiw5pyN5Yqh5Zmo77yM5ou/5Yiw5LiA5Liq5rWB5Y676K+75Y+W6L+U5Zue55qE5raI5oGv5bqP5YiX44CCIFxuICogICAgICDlrqLmiLfnq6/or7vlj5bov5Tlm57nmoTmtYHvvIznm7TliLDph4zpnaLmsqHmnInku7vkvZXmtojmga/jgILku47kvovlrZDkuK3lj6/ku6XnnIvlh7rvvIzpgJrov4flnKgg5ZON5bqUIOexu+Wei+WJjeaPkuWFpSBzdHJlYW0g5YWz6ZSu5a2X77yM5Y+v5Lul5oyH5a6a5LiA5Liq5pyN5Yqh5Zmo56uv55qE5rWB5pa55rOV44CCXG4gKiAgLy8gT2J0YWlucyB0aGUgRmVhdHVyZXMgYXZhaWxhYmxlIHdpdGhpbiB0aGUgZ2l2ZW4gUmVjdGFuZ2xlLiAgUmVzdWx0cyBhcmVcbiAgIC8vIHN0cmVhbWVkIHJhdGhlciB0aGFuIHJldHVybmVkIGF0IG9uY2UgKGUuZy4gaW4gYSByZXNwb25zZSBtZXNzYWdlIHdpdGggYVxuICAgLy8gcmVwZWF0ZWQgZmllbGQpLCBhcyB0aGUgcmVjdGFuZ2xlIG1heSBjb3ZlciBhIGxhcmdlIGFyZWEgYW5kIGNvbnRhaW4gYVxuICAgLy8gaHVnZSBudW1iZXIgb2YgZmVhdHVyZXMuXG4gICBycGMgTGlzdEZlYXR1cmVzKFJlY3RhbmdsZSkgcmV0dXJucyAoc3RyZWFtIEZlYXR1cmUpIHt9XG4gKiDvvIgz77yJ5LiA5LiqIOWuouaIt+err+a1geW8jyBSUEMg77yMIOWuouaIt+err+WGmeWFpeS4gOS4qua2iOaBr+W6j+WIl+W5tuWwhuWFtuWPkemAgeWIsOacjeWKoeWZqO+8jFxuICAgICAgIOWQjOagt+S5n+aYr+S9v+eUqOa1geOAguS4gOaXpuWuouaIt+err+WujOaIkOWGmeWFpea2iOaBr++8jOWug+etieW+heacjeWKoeWZqOWujOaIkOivu+WPlui/lOWbnuWug+eahOWTjeW6lOOAgumAmui/h+WcqCDor7fmsYIg57G75Z6L5YmN5oyH5a6aIHN0cmVhbSDlhbPplK7lrZfmnaXmjIflrprkuIDkuKrlrqLmiLfnq6/nmoTmtYHmlrnms5XjgIJcbiAgICAgICAvLyBBY2NlcHRzIGEgc3RyZWFtIG9mIFBvaW50cyBvbiBhIHJvdXRlIGJlaW5nIHRyYXZlcnNlZCwgcmV0dXJuaW5nIGFcbiAgIC8vIFJvdXRlU3VtbWFyeSB3aGVuIHRyYXZlcnNhbCBpcyBjb21wbGV0ZWQuXG4gICAgcnBjIFJlY29yZFJvdXRlKHN0cmVhbSBQb2ludCkgcmV0dXJucyAoUm91dGVTdW1tYXJ5KSB7fVxuICog77yINO+8iSDkuIDkuKog5Y+M5ZCR5rWB5byPIFJQQyDmmK/lj4zmlrnkvb/nlKjor7vlhpnmtYHljrvlj5HpgIHkuIDkuKrmtojmga/luo/liJfjgILkuKTkuKrmtYHni6znq4vmk43kvZzvvIxcbiAgICAgICDlm6DmraTlrqLmiLfnq6/lkozmnI3liqHlmajlj6/ku6Xku6Xku7vmhI/llpzmrKLnmoTpobrluo/or7vlhpnvvJrmr5TlpoLvvIwg5pyN5Yqh5Zmo5Y+v5Lul5Zyo5YaZ5YWl5ZON5bqU5YmN562J5b6F5o6l5pS25omA5pyJ55qE5a6i5oi356uv5raI5oGv77yM5oiW6ICF5Y+v5Lul5Lqk5pu/55qE6K+75Y+W5ZKM5YaZ5YWl5raI5oGv77yM5oiW6ICF5YW25LuW6K+75YaZ55qE57uE5ZCI44CCXG4gICAgICDmr4/kuKrmtYHkuK3nmoTmtojmga/pobrluo/ooqvpooTnlZnjgILkvaDlj6/ku6XpgJrov4flnKjor7fmsYLlkozlk43lupTliY3liqAgc3RyZWFtIOWFs+mUruWtl+WOu+WItuWumuaWueazleeahOexu+Wei+OAglxuICAgICAgLy8gQWNjZXB0cyBhIHN0cmVhbSBvZiBSb3V0ZU5vdGVzIHNlbnQgd2hpbGUgYSByb3V0ZSBpcyBiZWluZyB0cmF2ZXJzZWQsXG4gICAgLy8gd2hpbGUgcmVjZWl2aW5nIG90aGVyIFJvdXRlTm90ZXMgKGUuZy4gZnJvbSBvdGhlciB1c2VycykuXG4gICBycGMgUm91dGVDaGF0KHN0cmVhbSBSb3V0ZU5vdGUpIHJldHVybnMgKHN0cmVhbSBSb3V0ZU5vdGUpIHt9XG4gKi9cbiAgcHJpdmF0ZSBtYXBnUnBjU2VydmljZVRvU2VsZigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmtleXMoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNlbGYuZ3JwY0NsaWVudCkpLmZvckVhY2goZnVuY3Rpb24oXG4gICAgICBmdW5jdGlvbk5hbWVcbiAgICApIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSBzZWxmLmdycGNDbGllbnRbZnVuY3Rpb25OYW1lXTtcbiAgICAgIC8v5aaC5p6c5piv5pyN5Yqh5Zmo5o6l5Y+j5Ye95pWw77yM5pig5bCE5Yiw5b2T5YmN5a+56LGhXG4gICAgICBpZiAoXG4gICAgICAgIG9yaWdpbmFsRnVuY3Rpb24ucmVxdWVzdFN0cmVhbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIG9yaWdpbmFsRnVuY3Rpb24ucmVzcG9uc2VTdHJlYW0gIT09IHVuZGVmaW5lZFxuICAgICAgKSB7XG4gICAgICAgIC8v5Yik5pat5b2T5YmN5pyN5Yqh5o6l5Y+j55qE57G75Z6LXG4gICAgICAgIGNvbnN0IGdlbmVyaWNGdW5jdGlvblNlbGVjdG9yID1cbiAgICAgICAgICAob3JpZ2luYWxGdW5jdGlvbi5yZXF1ZXN0U3RyZWFtID8gMiA6IDApIHxcbiAgICAgICAgICAob3JpZ2luYWxGdW5jdGlvbi5yZXNwb25zZVN0cmVhbSA/IDEgOiAwKTtcbiAgICAgICAgbGV0IGdlbmVyaWNGdW5jdGlvbk5hbWU7XG4gICAgICAgIHN3aXRjaCAoZ2VuZXJpY0Z1bmN0aW9uU2VsZWN0b3IpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAvL+eugOWNlSBSUENcbiAgICAgICAgICAgIGdlbmVyaWNGdW5jdGlvbk5hbWUgPSBcIm1ha2VVbmFyeVJlcXVlc3RcIlxuICAgICAgICAgICAgc2VsZltmdW5jdGlvbk5hbWVdID0gVW5hcnlSZXF1ZXN0Lm1ha2VVbmFyeVJlcXVlc3R1bmN0aW9uKHNlbGYuZ3JwY0NsaWVudCwgb3JpZ2luYWxGdW5jdGlvbilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8g5LiA5LiqIOacjeWKoeWZqOerr+a1geW8jyBSUENcbiAgICAgICAgICAgIHNlbGZbZnVuY3Rpb25OYW1lXSA9IG9yaWdpbmFsRnVuY3Rpb25cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgLy/kuIDkuKog5a6i5oi356uv5rWB5byPIFJQQ1xuICAgICAgICAgICAgc2VsZltmdW5jdGlvbk5hbWVdID0gb3JpZ2luYWxGdW5jdGlvblxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAvL+S4gOS4qiDlj4zlkJHmtYHlvI8gUlBDXG4gICAgICAgICAgICBzZWxmW2Z1bmN0aW9uTmFtZV0gPSBvcmlnaW5hbEZ1bmN0aW9uXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLy/nrKzkuIDnp40g566A5Y2VIFJQQyDvvIzlrqLmiLfnq6/pgJrlrp7njrBQcm9taXNl5pa55byP6LCD55SoXG5jbGFzcyBVbmFyeVJlcXVlc3Qge1xuICBwcml2YXRlIGNsaWVudDogYW55O1xuICBwcml2YXRlIG9yaWdpbmFsRnVuY3Rpb246IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgb3JpZ2luYWxfZnVuY3Rpb24pIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLm9yaWdpbmFsRnVuY3Rpb24gPSBvcmlnaW5hbF9mdW5jdGlvbjtcbiAgfVxuICAvL+WPkemAgeaVsOaNruWIsOacjeWKoeWZqOerr1xuICBzZW5kTWVzc2FnZShjb250ZW50ID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5vcmlnaW5hbEZ1bmN0aW9uLmNhbGwodGhpcy5jbGllbnQsIGNvbnRlbnQsIGZ1bmN0aW9uKFxuICAgICAgICBlcnJvcixcbiAgICAgICAgcmVzcG9uc2VcbiAgICAgICkge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgbWFrZVVuYXJ5UmVxdWVzdHVuY3Rpb24oY2xpZW50LCBvcmlnaW5hbEZ1bmN0aW9uKTpVbmFyeVJlcXVlc3Qge1xuICAgICAgICByZXR1cm4gbmV3IFVuYXJ5UmVxdWVzdChjbGllbnQsIG9yaWdpbmFsRnVuY3Rpb24pXG4gIH1cbn1cblxuXG4iXX0=