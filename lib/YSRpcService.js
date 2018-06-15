"use strict";
/****************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  RPC发布
***************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
//log日志前缀
var LOG_PRE = 'RPC Service Log-->>>';
/**
 * RPC服务器启动程序
 *
 * @export
 * @abstract
 * @class RPCStartup
 */
var RPCStartup = /** @class */ (function () {
    /**
     *
     * @param adrees
=     * @param protoPath .proto file 路径
     * @param packageName  proto说明文件中package名称
     */
    function RPCStartup(address, protoPath, packageName) {
        this.rpclist = [];
        this.protoPath = protoPath;
        this.packageName = packageName;
        this.addressConfig = address;
    }
    //获取服务名关联的对象
    RPCStartup.prototype.findService = function (name) {
        for (var i = 0; i < this.rpclist.length; i++) {
            if (this.rpclist[i].serviceName === name) {
                return this.rpclist[i];
            }
        }
    };
    /**
     * 发布服务
     */
    RPCStartup.prototype.publish = function () {
        //获取IP信息
        var ipHost = this.addressConfig;
        this.server = new grpc.Server();
        var proto = grpc.load(this.protoPath)[this.packageName];
        //proto对象map了.proto文件信息
        //获取proto对象中类型为ServiceClient对象存在service属性。这种对象实际上对应.proto中的service节点
        //遍历proto获取service
        console.log("==============>\u5C27\u5C1A\u4FE1\u606F\u79D1\u6280(wwww.yourshares.cn)<================\n>>>" + ipHost.ip + ":" + ipHost.port + "<<< publish api");
        var self = this;
        Object.getOwnPropertyNames(proto).forEach(function (propertyName) {
            // if (typeof proto[property]. === 'function' && proto[property].name === 'ServiceClient'){ //通过判断方法名来获取service对象
            //通过判断是否存在service属性来获取service对象
            if (proto[propertyName].service !== undefined) {
                var serviceObject_1 = self.findService(propertyName);
                console.log(LOG_PRE + " service " + propertyName + " publish api [Begin]");
                if (serviceObject_1 !== undefined && serviceObject_1.object !== undefined) {
                    var apiObject_1 = serviceObject_1.object;
                    var routerObject = {};
                    //Object.keys(Object.getPrototypeOf(apiObject))
                    //获取自己本身的属性
                    Object.getOwnPropertyNames(apiObject_1).forEach(function (rpcFuncName) {
                        //发布apiObject 方法 
                        //所有未在.proto中定义和_开头的方法不会发布
                        // console.log(`${LOG_PRE} find object ${serviceObject.serviceName} function: ${rpcFuncName}`)
                        if (proto[propertyName].service[rpcFuncName] !== undefined
                            && typeof apiObject_1[rpcFuncName] === 'function'
                            && !rpcFuncName.hasPrefix('_')) {
                            console.log(LOG_PRE + " " + serviceObject_1.serviceName + " \u53D1\u5E03\u63A5\u53E3 " + rpcFuncName);
                            routerObject[rpcFuncName] = apiObject_1[rpcFuncName];
                        }
                    });
                    //获取原型连上的方法
                    Object.getOwnPropertyNames(Object.getPrototypeOf(apiObject_1)).forEach(function (rpcFuncName) {
                        //发布apiObject 方法 
                        //所有未在.proto中定义和_开头的方法不会发布
                        // console.log(`${LOG_PRE} find object ${serviceObject.serviceName} function: ${rpcFuncName}`)
                        if (rpcFuncName !== 'constructor' && proto[propertyName].service[rpcFuncName] !== undefined
                            && typeof apiObject_1[rpcFuncName] === 'function'
                            && !rpcFuncName.hasPrefix('_')) {
                            console.log(LOG_PRE + " " + serviceObject_1.serviceName + " \u53D1\u5E03\u63A5\u53E3 " + rpcFuncName);
                            routerObject[rpcFuncName] = apiObject_1[rpcFuncName];
                        }
                    });
                    //grpc发布服务
                    self.server.addService(proto[propertyName].service, routerObject);
                }
                else {
                    //服务没有找到关联的对象
                    console.error(LOG_PRE + " " + propertyName + " have no map Object!!!!");
                }
                console.log(LOG_PRE + " service " + propertyName + " publish api [End]");
            }
        });
        this.server.bind(ipHost.ip + ':' + ipHost.port, grpc.ServerCredentials.createInsecure());
        this.server.start();
    };
    //
    /**
     * 添加发布对象
     */
    RPCStartup.prototype.addService = function (server) {
        this.rpclist.push(server);
    };
    return RPCStartup;
}());
exports.RPCStartup = RPCStartup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1lTUnBjU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs0RUFNNEU7O0FBSzVFLDJCQUE2QjtBQUU3QixTQUFTO0FBQ1QsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUE7QUFPcEM7Ozs7OztHQU1HO0FBQ0g7SUFNSTs7Ozs7T0FLRztJQUNILG9CQUFZLE9BQWtCLEVBQUUsU0FBaUIsRUFBRSxXQUFtQjtRQVY5RCxZQUFPLEdBQUcsRUFBRSxDQUFBO1FBV2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFBO0lBQ2hDLENBQUM7SUFDRCxZQUFZO0lBQ0osZ0NBQVcsR0FBbkIsVUFBb0IsSUFBWTtRQUM1QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNEJBQU8sR0FBZDtRQUNJLFFBQVE7UUFDUixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZE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QUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxFQUFFO0lBQ0Y7O09BRUc7SUFDSSwrQkFBVSxHQUFqQixVQUFrQixNQUFrQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBOUZELElBOEZDO0FBOUZhLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pXG4qKiBhdXRoOiBsaXVrYWlcbioqIGRhdGU6IDIwMTcvN1xuKiogdmVyIDogMS4wXG4qKiBkZXNjOiAgUlBD5Y+R5biDXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8vIGltcG9ydCBocHJvc2UgPSByZXF1aXJlKCdocHJvc2UnKTtcblxuaW1wb3J0IHsgUnBjQ29uZmlnfSBmcm9tIFwiLi9ZU1JwY0NvbmZpZ1wiXG5pbXBvcnQgKiBhcyBncnBjICBmcm9tIFwiZ3JwY1wiXG5cbi8vbG9n5pel5b+X5YmN57yAXG5sZXQgTE9HX1BSRSA9ICdSUEMgU2VydmljZSBMb2ctLT4+PidcblxuZXhwb3J0IGludGVyZmFjZSBScGNTZXJ2aWNlIHtcbiAgICBzZXJ2aWNlTmFtZTogc3RyaW5nLCAvL+WvueW6lHByb3Rv5paH5Lu25Litc2VydmljZSDlkI3np7BcbiAgICBvYmplY3Q6IGFueSAvL+WFs+iBlOeahOexu+WvueixoVxufVxuXG4vKipcbiAqIFJQQ+acjeWKoeWZqOWQr+WKqOeoi+W6j1xuICogXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBSUENTdGFydHVwXG4gKi9cbmV4cG9ydCAgY2xhc3MgUlBDU3RhcnR1cCB7XG4gICAgcHJpdmF0ZSBzZXJ2ZXI6IGFueVxuICAgIHByaXZhdGUgcnBjbGlzdCA9IFtdXG4gICAgcHJpdmF0ZSBwYWNrYWdlTmFtZTogc3RyaW5nXG4gICAgcHJpdmF0ZSBwcm90b1BhdGg6IHN0cmluZ1xuICAgIHByaXZhdGUgYWRkcmVzc0NvbmZpZzogUnBjQ29uZmlnXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGFkcmVlcyBcbj0gICAgICogQHBhcmFtIHByb3RvUGF0aCAucHJvdG8gZmlsZSDot6/lvoRcbiAgICAgKiBAcGFyYW0gcGFja2FnZU5hbWUgIHByb3Rv6K+05piO5paH5Lu25LitcGFja2FnZeWQjeensFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGFkZHJlc3M6IFJwY0NvbmZpZywgcHJvdG9QYXRoOiBzdHJpbmcsIHBhY2thZ2VOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wcm90b1BhdGggPSBwcm90b1BhdGhcbiAgICAgICAgdGhpcy5wYWNrYWdlTmFtZSA9IHBhY2thZ2VOYW1lXG4gICAgICAgIHRoaXMuYWRkcmVzc0NvbmZpZyA9IGFkZHJlc3NcbiAgICB9XG4gICAgLy/ojrflj5bmnI3liqHlkI3lhbPogZTnmoTlr7nosaFcbiAgICBwcml2YXRlIGZpbmRTZXJ2aWNlKG5hbWU6IHN0cmluZyk6IFJwY1NlcnZpY2Uge1xuICAgICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLnJwY2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJwY2xpc3RbaV0uc2VydmljZU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ycGNsaXN0W2ldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5HluIPmnI3liqFcbiAgICAgKi9cbiAgICBwdWJsaWMgcHVibGlzaCgpIHtcbiAgICAgICAgLy/ojrflj5ZJUOS/oeaBr1xuICAgICAgICBsZXQgaXBIb3N0ID0gdGhpcy5hZGRyZXNzQ29uZmlnXG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IGdycGMuU2VydmVyKClcbiAgICAgICAgdmFyIHByb3RvID0gZ3JwYy5sb2FkKHRoaXMucHJvdG9QYXRoKVt0aGlzLnBhY2thZ2VOYW1lXVxuICAgICAgICAvL3Byb3Rv5a+56LGhbWFw5LqGLnByb3Rv5paH5Lu25L+h5oGvXG4gICAgICAgIC8v6I635Y+WcHJvdG/lr7nosaHkuK3nsbvlnovkuLpTZXJ2aWNlQ2xpZW505a+56LGh5a2Y5Zyoc2VydmljZeWxnuaAp+OAgui/meenjeWvueixoeWunumZheS4iuWvueW6lC5wcm90b+S4reeahHNlcnZpY2XoioLngrlcbiAgICAgICAgLy/pgY3ljoZwcm90b+iOt+WPlnNlcnZpY2VcbiAgICAgICAgY29uc29sZS5sb2coYD09PT09PT09PT09PT09PuWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pPD09PT09PT09PT09PT09PT1cXG4+Pj4ke2lwSG9zdC5pcH06JHtpcEhvc3QucG9ydH08PDwgcHVibGlzaCBhcGlgKVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2gocHJvcGVydHlOYW1lID0+IHtcbiAgICAgICAgICAgIC8vIGlmICh0eXBlb2YgcHJvdG9bcHJvcGVydHldLiA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm90b1twcm9wZXJ0eV0ubmFtZSA9PT0gJ1NlcnZpY2VDbGllbnQnKXsgLy/pgJrov4fliKTmlq3mlrnms5XlkI3mnaXojrflj5ZzZXJ2aWNl5a+56LGhXG4gICAgICAgICAgICAvL+mAmui/h+WIpOaWreaYr+WQpuWtmOWcqHNlcnZpY2XlsZ7mgKfmnaXojrflj5ZzZXJ2aWNl5a+56LGhXG4gICAgICAgICAgICBpZiAocHJvdG9bcHJvcGVydHlOYW1lXS5zZXJ2aWNlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNlT2JqZWN0ID0gIHNlbGYuZmluZFNlcnZpY2UocHJvcGVydHlOYW1lKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke0xPR19QUkV9IHNlcnZpY2UgJHtwcm9wZXJ0eU5hbWV9IHB1Ymxpc2ggYXBpIFtCZWdpbl1gKVxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlT2JqZWN0ICE9PSB1bmRlZmluZWQgJiYgc2VydmljZU9iamVjdC5vYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXBpT2JqZWN0ID0gIHNlcnZpY2VPYmplY3Qub2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3V0ZXJPYmplY3QgPSB7fVxuICAgICAgICAgICAgICAgICAgICAvL09iamVjdC5rZXlzKE9iamVjdC5nZXRQcm90b3R5cGVPZihhcGlPYmplY3QpKVxuICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluiHquW3seacrOi6q+eahOWxnuaAp1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcGlPYmplY3QpLmZvckVhY2gocnBjRnVuY05hbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HluINhcGlPYmplY3Qg5pa55rOVIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy/miYDmnInmnKrlnKgucHJvdG/kuK3lrprkuYnlkoxf5byA5aS055qE5pa55rOV5LiN5Lya5Y+R5biDXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtMT0dfUFJFfSBmaW5kIG9iamVjdCAke3NlcnZpY2VPYmplY3Quc2VydmljZU5hbWV9IGZ1bmN0aW9uOiAke3JwY0Z1bmNOYW1lfWApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG9bcHJvcGVydHlOYW1lXS5zZXJ2aWNlW3JwY0Z1bmNOYW1lXSAhPT0gdW5kZWZpbmVkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHR5cGVvZiBhcGlPYmplY3RbcnBjRnVuY05hbWVdID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICFycGNGdW5jTmFtZS5oYXNQcmVmaXgoJ18nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7TE9HX1BSRX0gJHtzZXJ2aWNlT2JqZWN0LnNlcnZpY2VOYW1lfSDlj5HluIPmjqXlj6MgJHtycGNGdW5jTmFtZX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlck9iamVjdFtycGNGdW5jTmFtZV0gPSAgYXBpT2JqZWN0W3JwY0Z1bmNOYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAvL+iOt+WPluWOn+Wei+i/nuS4iueahOaWueazlVxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXBpT2JqZWN0KSkuZm9yRWFjaChycGNGdW5jTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WPkeW4g2FwaU9iamVjdCDmlrnms5UgXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aJgOacieacquWcqC5wcm90b+S4reWumuS5ieWSjF/lvIDlpLTnmoTmlrnms5XkuI3kvJrlj5HluINcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke0xPR19QUkV9IGZpbmQgb2JqZWN0ICR7c2VydmljZU9iamVjdC5zZXJ2aWNlTmFtZX0gZnVuY3Rpb246ICR7cnBjRnVuY05hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChycGNGdW5jTmFtZSAhPT0gJ2NvbnN0cnVjdG9yJyAmJiBwcm90b1twcm9wZXJ0eU5hbWVdLnNlcnZpY2VbcnBjRnVuY05hbWVdICE9PSB1bmRlZmluZWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgdHlwZW9mIGFwaU9iamVjdFtycGNGdW5jTmFtZV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgIXJwY0Z1bmNOYW1lLmhhc1ByZWZpeCgnXycpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtMT0dfUFJFfSAke3NlcnZpY2VPYmplY3Quc2VydmljZU5hbWV9IOWPkeW4g+aOpeWPoyAke3JwY0Z1bmNOYW1lfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyT2JqZWN0W3JwY0Z1bmNOYW1lXSA9ICBhcGlPYmplY3RbcnBjRnVuY05hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JwY+WPkeW4g+acjeWKoVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlcnZlci5hZGRTZXJ2aWNlKHByb3RvW3Byb3BlcnR5TmFtZV0uc2VydmljZSwgcm91dGVyT2JqZWN0KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvL+acjeWKoeayoeacieaJvuWIsOWFs+iBlOeahOWvueixoVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke0xPR19QUkV9ICR7cHJvcGVydHlOYW1lfSBoYXZlIG5vIG1hcCBPYmplY3QhISEhYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7TE9HX1BSRX0gc2VydmljZSAke3Byb3BlcnR5TmFtZX0gcHVibGlzaCBhcGkgW0VuZF1gKVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZXJ2ZXIuYmluZChpcEhvc3QuaXArICc6JysgaXBIb3N0LnBvcnQsIGdycGMuU2VydmVyQ3JlZGVudGlhbHMuY3JlYXRlSW5zZWN1cmUoKSk7XG4gICAgICAgIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIC8vXG4gICAgLyoqXG4gICAgICog5re75Yqg5Y+R5biD5a+56LGhXG4gICAgICovXG4gICAgcHVibGljIGFkZFNlcnZpY2Uoc2VydmVyOiBScGNTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucnBjbGlzdC5wdXNoKHNlcnZlcilcbiAgICB9XG59XG4iXX0=