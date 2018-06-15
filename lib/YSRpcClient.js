"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var grpc = require("grpc");
var LOG_PRE = 'RPC Service Log-->>>';
/**
 * RPC客户端
 *
 * @export
 * @class RPCClient
 */
var RPCClient = /** @class */ (function () {
    /**
       *
       * @param address
       * @param serviceName
  =    * @param protoPath .proto file 路径
       * @param packageName  proto说明文件中package名称
       */
    function RPCClient(address, serviceName, protoPath, packageName) {
        this.protoPath = protoPath;
        this.packageName = packageName;
        this.addressConfig = address;
        this.serviceName = serviceName;
        this.init();
    }
    RPCClient.prototype.init = function () {
        var ipHost = this.addressConfig;
        var proto = grpc.load(this.protoPath)[this.packageName];
        var Service = proto[this.serviceName];
        if (Service === undefined) {
            console.error(LOG_PRE + " service [" + this.serviceName + "] not define in .proto file");
            return;
        }
        this.grpcClient = new Service(ipHost.ip + ":" + ipHost.port, grpc.credentials.createInsecure());
        this.mapgRpcServiceToSelf();
    };
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
    RPCClient.prototype.mapgRpcServiceToSelf = function () {
        var self = this;
        Object.keys(Object.getPrototypeOf(self.grpcClient)).forEach(function (functionName) {
            var originalFunction = self.grpcClient[functionName];
            //如果是服务器接口函数，映射到当前对象
            if (originalFunction.requestStream !== undefined &&
                originalFunction.responseStream !== undefined) {
                //判断当前服务接口的类型
                var genericFunctionSelector = (originalFunction.requestStream ? 2 : 0) |
                    (originalFunction.responseStream ? 1 : 0);
                var genericFunctionName = void 0;
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
                console.log(LOG_PRE + " find service " + functionName + " ");
            }
        });
    };
    return RPCClient;
}());
exports.RPCClient = RPCClient;
//第一种 简单 RPC ，客户端通实现Promise方式调用
var UnaryRequest = /** @class */ (function () {
    function UnaryRequest(client, original_function) {
        this.client = client;
        this.originalFunction = original_function;
    }
    //发送数据到服务器端
    UnaryRequest.prototype.sendMessage = function (content) {
        var _this = this;
        if (content === void 0) { content = {}; }
        return new Promise(function (resolve, reject) {
            _this.originalFunction.call(_this.client, content, function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    UnaryRequest.makeUnaryRequestunction = function (client, originalFunction) {
        return function () {
            return new UnaryRequest(client, originalFunction);
        };
    };
    return UnaryRequest;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvWVNScGNDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTQSxrQ0FBb0M7QUFDcEMsMkJBQTZCO0FBRzdCLElBQUksT0FBTyxHQUFHLHNCQUFzQixDQUFBO0FBRXBDOzs7OztHQUtHO0FBQ0g7SUFPRTs7Ozs7O1NBTUs7SUFDTCxtQkFDRSxPQUFrQixFQUNsQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixXQUFtQjtRQUVuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBRU8sd0JBQUksR0FBWjtRQUNFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUksT0FBTyxHQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdkMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUksT0FBTyxrQkFBYSxJQUFJLENBQUMsV0FBVyxnQ0FBNkIsQ0FBQyxDQUFBO1lBQ25GLE9BQU07U0FDUDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUksSUFBSSxPQUFPLENBQzVCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQ2xDLENBQUM7UUFD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QkQsSUE0QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiogYXV0aDogbGl1a2FpXG4gKiogZGF0ZTogMjAxNy85XG4gKiogdmVyIDogMS4wXG4gKiogZGVzYzogIOivtOaYjlxuICoqIENvcHlyaWdodCDCqSAyMDE35bm0IOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pLiBBbGwgcmlnaHRzIHJlc2VydmVkXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJncnBjXCIgLz5cbmltcG9ydCB7IFJwY0NvbmZpZyB9IGZyb20gXCIuL1lTUnBjQ29uZmlnXCI7XG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuaW1wb3J0ICogYXMgZ3JwYyAgZnJvbSBcImdycGNcIlxuXG5cbmxldCBMT0dfUFJFID0gJ1JQQyBTZXJ2aWNlIExvZy0tPj4+J1xuXG4vKipcbiAqIFJQQ+WuouaIt+err1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSUENDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFJQQ0NsaWVudCB7XG4gIHByaXZhdGUgcGFja2FnZU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBwcm90b1BhdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBhZGRyZXNzQ29uZmlnOiBScGNDb25maWc7XG4gIHByaXZhdGUgZ3JwY0NsaWVudDogYW55O1xuICBwcml2YXRlIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGFkZHJlc3MgXG4gICAgICogQHBhcmFtIHNlcnZpY2VOYW1lIFxuPSAgICAqIEBwYXJhbSBwcm90b1BhdGggLnByb3RvIGZpbGUg6Lev5b6EXG4gICAgICogQHBhcmFtIHBhY2thZ2VOYW1lICBwcm90b+ivtOaYjuaWh+S7tuS4rXBhY2thZ2XlkI3np7BcbiAgICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYWRkcmVzczogUnBjQ29uZmlnLFxuICAgIHNlcnZpY2VOYW1lOiBzdHJpbmcsXG4gICAgcHJvdG9QYXRoOiBzdHJpbmcsXG4gICAgcGFja2FnZU5hbWU6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnByb3RvUGF0aCA9IHByb3RvUGF0aDtcbiAgICB0aGlzLnBhY2thZ2VOYW1lID0gcGFja2FnZU5hbWU7XG4gICAgdGhpcy5hZGRyZXNzQ29uZmlnID0gYWRkcmVzcztcbiAgICB0aGlzLnNlcnZpY2VOYW1lID0gc2VydmljZU5hbWU7XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpIHtcbiAgICBsZXQgaXBIb3N0ID0gdGhpcy5hZGRyZXNzQ29uZmlnO1xuICAgIHZhciBwcm90byA9IGdycGMubG9hZCh0aGlzLnByb3RvUGF0aClbdGhpcy5wYWNrYWdlTmFtZV07XG4gICAgbGV0IFNlcnZpY2UgPSAgIHByb3RvW3RoaXMuc2VydmljZU5hbWVdXG4gICAgaWYgKFNlcnZpY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5lcnJvcihgJHtMT0dfUFJFfSBzZXJ2aWNlIFske3RoaXMuc2VydmljZU5hbWV9XSBub3QgZGVmaW5lIGluIC5wcm90byBmaWxlYClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmdycGNDbGllbnQgPSAgbmV3IFNlcnZpY2UoXG4gICAgICBpcEhvc3QuaXAgKyBcIjpcIiArIGlwSG9zdC5wb3J0LFxuICAgICAgZ3JwYy5jcmVkZW50aWFscy5jcmVhdGVJbnNlY3VyZSgpXG4gICAgKTtcbiAgICB0aGlzLm1hcGdScGNTZXJ2aWNlVG9TZWxmKCk7XG4gIH1cblxuICAvKiogXG4gKiAgcHJvdG9jb2wgYnVmZmVyc+WPr+S7peWumuS5ieWbm+enjeexu+Wei+eahOacjeWKoTogaHR0cHM6Ly9ncnBjLmlvL2RvY3MvdHV0b3JpYWxzL2Jhc2ljL25vZGUuaHRtbFxuICog77yIMe+8ieS4gOS4qiDnroDljZUgUlBDIO+8jCDlrqLmiLfnq6/kvb/nlKjlrZjmoLnlj5HpgIHor7fmsYLliLDmnI3liqHlmajlubbnrYnlvoXlk43lupTov5Tlm57vvIzlsLHlg4/lubPluLjnmoTlh73mlbDosIPnlKjkuIDmoLfjgIJcbiAqICAgIC8vIE9idGFpbnMgdGhlIGZlYXR1cmUgYXQgYSBnaXZlbiBwb3NpdGlvbi5cbiAgICAgcnBjIEdldEZlYXR1cmUoUG9pbnQpIHJldHVybnMgKEZlYXR1cmUpIHt9XG4gKiDvvIgy77yJ5LiA5LiqIOacjeWKoeWZqOerr+a1geW8jyBSUEMg77yMIOWuouaIt+err+WPkemAgeivt+axguWIsOacjeWKoeWZqO+8jOaLv+WIsOS4gOS4qua1geWOu+ivu+WPlui/lOWbnueahOa2iOaBr+W6j+WIl+OAgiBcbiAqICAgICAg5a6i5oi356uv6K+75Y+W6L+U5Zue55qE5rWB77yM55u05Yiw6YeM6Z2i5rKh5pyJ5Lu75L2V5raI5oGv44CC5LuO5L6L5a2Q5Lit5Y+v5Lul55yL5Ye677yM6YCa6L+H5ZyoIOWTjeW6lCDnsbvlnovliY3mj5LlhaUgc3RyZWFtIOWFs+mUruWtl++8jOWPr+S7peaMh+WumuS4gOS4quacjeWKoeWZqOerr+eahOa1geaWueazleOAglxuICogIC8vIE9idGFpbnMgdGhlIEZlYXR1cmVzIGF2YWlsYWJsZSB3aXRoaW4gdGhlIGdpdmVuIFJlY3RhbmdsZS4gIFJlc3VsdHMgYXJlXG4gICAvLyBzdHJlYW1lZCByYXRoZXIgdGhhbiByZXR1cm5lZCBhdCBvbmNlIChlLmcuIGluIGEgcmVzcG9uc2UgbWVzc2FnZSB3aXRoIGFcbiAgIC8vIHJlcGVhdGVkIGZpZWxkKSwgYXMgdGhlIHJlY3RhbmdsZSBtYXkgY292ZXIgYSBsYXJnZSBhcmVhIGFuZCBjb250YWluIGFcbiAgIC8vIGh1Z2UgbnVtYmVyIG9mIGZlYXR1cmVzLlxuICAgcnBjIExpc3RGZWF0dXJlcyhSZWN0YW5nbGUpIHJldHVybnMgKHN0cmVhbSBGZWF0dXJlKSB7fVxuICog77yIM++8ieS4gOS4qiDlrqLmiLfnq6/mtYHlvI8gUlBDIO+8jCDlrqLmiLfnq6/lhpnlhaXkuIDkuKrmtojmga/luo/liJflubblsIblhbblj5HpgIHliLDmnI3liqHlmajvvIxcbiAgICAgICDlkIzmoLfkuZ/mmK/kvb/nlKjmtYHjgILkuIDml6blrqLmiLfnq6/lrozmiJDlhpnlhaXmtojmga/vvIzlroPnrYnlvoXmnI3liqHlmajlrozmiJDor7vlj5bov5Tlm57lroPnmoTlk43lupTjgILpgJrov4flnKgg6K+35rGCIOexu+Wei+WJjeaMh+WumiBzdHJlYW0g5YWz6ZSu5a2X5p2l5oyH5a6a5LiA5Liq5a6i5oi356uv55qE5rWB5pa55rOV44CCXG4gICAgICAgLy8gQWNjZXB0cyBhIHN0cmVhbSBvZiBQb2ludHMgb24gYSByb3V0ZSBiZWluZyB0cmF2ZXJzZWQsIHJldHVybmluZyBhXG4gICAvLyBSb3V0ZVN1bW1hcnkgd2hlbiB0cmF2ZXJzYWwgaXMgY29tcGxldGVkLlxuICAgIHJwYyBSZWNvcmRSb3V0ZShzdHJlYW0gUG9pbnQpIHJldHVybnMgKFJvdXRlU3VtbWFyeSkge31cbiAqIO+8iDTvvIkg5LiA5LiqIOWPjOWQkea1geW8jyBSUEMg5piv5Y+M5pa55L2/55So6K+75YaZ5rWB5Y675Y+R6YCB5LiA5Liq5raI5oGv5bqP5YiX44CC5Lik5Liq5rWB54us56uL5pON5L2c77yMXG4gICAgICAg5Zug5q2k5a6i5oi356uv5ZKM5pyN5Yqh5Zmo5Y+v5Lul5Lul5Lu75oSP5Zac5qyi55qE6aG65bqP6K+75YaZ77ya5q+U5aaC77yMIOacjeWKoeWZqOWPr+S7peWcqOWGmeWFpeWTjeW6lOWJjeetieW+heaOpeaUtuaJgOacieeahOWuouaIt+err+a2iOaBr++8jOaIluiAheWPr+S7peS6pOabv+eahOivu+WPluWSjOWGmeWFpea2iOaBr++8jOaIluiAheWFtuS7luivu+WGmeeahOe7hOWQiOOAglxuICAgICAg5q+P5Liq5rWB5Lit55qE5raI5oGv6aG65bqP6KKr6aKE55WZ44CC5L2g5Y+v5Lul6YCa6L+H5Zyo6K+35rGC5ZKM5ZON5bqU5YmN5YqgIHN0cmVhbSDlhbPplK7lrZfljrvliLblrprmlrnms5XnmoTnsbvlnovjgIJcbiAgICAgIC8vIEFjY2VwdHMgYSBzdHJlYW0gb2YgUm91dGVOb3RlcyBzZW50IHdoaWxlIGEgcm91dGUgaXMgYmVpbmcgdHJhdmVyc2VkLFxuICAgIC8vIHdoaWxlIHJlY2VpdmluZyBvdGhlciBSb3V0ZU5vdGVzIChlLmcuIGZyb20gb3RoZXIgdXNlcnMpLlxuICAgcnBjIFJvdXRlQ2hhdChzdHJlYW0gUm91dGVOb3RlKSByZXR1cm5zIChzdHJlYW0gUm91dGVOb3RlKSB7fVxuICovXG4gIHByaXZhdGUgbWFwZ1JwY1NlcnZpY2VUb1NlbGYoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKE9iamVjdC5nZXRQcm90b3R5cGVPZihzZWxmLmdycGNDbGllbnQpKS5mb3JFYWNoKGZ1bmN0aW9uKFxuICAgICAgZnVuY3Rpb25OYW1lXG4gICAgKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uID0gc2VsZi5ncnBjQ2xpZW50W2Z1bmN0aW9uTmFtZV07XG4gICAgICAvL+WmguaenOaYr+acjeWKoeWZqOaOpeWPo+WHveaVsO+8jOaYoOWwhOWIsOW9k+WJjeWvueixoVxuICAgICAgaWYgKFxuICAgICAgICBvcmlnaW5hbEZ1bmN0aW9uLnJlcXVlc3RTdHJlYW0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBvcmlnaW5hbEZ1bmN0aW9uLnJlc3BvbnNlU3RyZWFtICE9PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICAvL+WIpOaWreW9k+WJjeacjeWKoeaOpeWPo+eahOexu+Wei1xuICAgICAgICBjb25zdCBnZW5lcmljRnVuY3Rpb25TZWxlY3RvciA9XG4gICAgICAgICAgKG9yaWdpbmFsRnVuY3Rpb24ucmVxdWVzdFN0cmVhbSA/IDIgOiAwKSB8XG4gICAgICAgICAgKG9yaWdpbmFsRnVuY3Rpb24ucmVzcG9uc2VTdHJlYW0gPyAxIDogMCk7XG4gICAgICAgIGxldCBnZW5lcmljRnVuY3Rpb25OYW1lO1xuICAgICAgICBzd2l0Y2ggKGdlbmVyaWNGdW5jdGlvblNlbGVjdG9yKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgLy/nroDljZUgUlBDXG4gICAgICAgICAgICBnZW5lcmljRnVuY3Rpb25OYW1lID0gXCJtYWtlVW5hcnlSZXF1ZXN0XCJcbiAgICAgICAgICAgIHNlbGZbZnVuY3Rpb25OYW1lXSA9IFVuYXJ5UmVxdWVzdC5tYWtlVW5hcnlSZXF1ZXN0dW5jdGlvbihzZWxmLmdycGNDbGllbnQsIG9yaWdpbmFsRnVuY3Rpb24pXG5cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8g5LiA5LiqIOacjeWKoeWZqOerr+a1geW8jyBSUENcbiAgICAgICAgICAgIHNlbGZbZnVuY3Rpb25OYW1lXSA9IG9yaWdpbmFsRnVuY3Rpb25cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgLy/kuIDkuKog5a6i5oi356uv5rWB5byPIFJQQ1xuICAgICAgICAgICAgc2VsZltmdW5jdGlvbk5hbWVdID0gb3JpZ2luYWxGdW5jdGlvblxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAvL+S4gOS4qiDlj4zlkJHmtYHlvI8gUlBDXG4gICAgICAgICAgICBzZWxmW2Z1bmN0aW9uTmFtZV0gPSBvcmlnaW5hbEZ1bmN0aW9uXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGAke0xPR19QUkV9IGZpbmQgc2VydmljZSAke2Z1bmN0aW9uTmFtZX0gYClcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG59XG5cbi8v56ys5LiA56eNIOeugOWNlSBSUEMg77yM5a6i5oi356uv6YCa5a6e546wUHJvbWlzZeaWueW8j+iwg+eUqFxuY2xhc3MgVW5hcnlSZXF1ZXN0IHtcbiAgcHJpdmF0ZSBjbGllbnQ6IGFueTtcbiAgcHJpdmF0ZSBvcmlnaW5hbEZ1bmN0aW9uOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihjbGllbnQsIG9yaWdpbmFsX2Z1bmN0aW9uKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy5vcmlnaW5hbEZ1bmN0aW9uID0gb3JpZ2luYWxfZnVuY3Rpb247XG4gIH1cbiAgLy/lj5HpgIHmlbDmja7liLDmnI3liqHlmajnq69cbiAgc2VuZE1lc3NhZ2UoY29udGVudCA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMub3JpZ2luYWxGdW5jdGlvbi5jYWxsKHRoaXMuY2xpZW50LCBjb250ZW50LCBmdW5jdGlvbihcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIHJlc3BvbnNlXG4gICAgICApIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIG1ha2VVbmFyeVJlcXVlc3R1bmN0aW9uKGNsaWVudCwgb3JpZ2luYWxGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFVuYXJ5UmVxdWVzdChjbGllbnQsIG9yaWdpbmFsRnVuY3Rpb24pO1xuICAgICAgICB9XG4gIH1cbn1cblxuXG4iXX0=