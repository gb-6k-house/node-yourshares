"use strict";
/****************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  RPC发布
***************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = require("grpc");
//log日志前缀
let LOG_PRE = 'RPC Service Log-->>>';
/**
 * RPC服务器启动程序
 *
 * @export
 * @abstract
 * @class RPCStartup
 */
class RPCStartup {
    /**
     *
     * @param adrees
=     * @param protoPath .proto file 路径
     * @param packageName  proto说明文件中package名称
     */
    constructor(address, protoPath, packageName) {
        this.rpclist = [];
        this.protoPath = protoPath;
        this.packageName = packageName;
        this.addressConfig = address;
    }
    //获取服务名关联的对象
    findService(name) {
        for (var i = 0; i < this.rpclist.length; i++) {
            if (this.rpclist[i].serviceName === name) {
                return this.rpclist[i];
            }
        }
    }
    /**
     * 发布服务
     */
    publish() {
        //获取IP信息
        let ipHost = this.addressConfig;
        this.server = new grpc.Server();
        var proto = grpc.load(this.protoPath)[this.packageName];
        //proto对象map了.proto文件信息
        //获取proto对象中类型为ServiceClient对象存在service属性。这种对象实际上对应.proto中的service节点
        //遍历proto获取service
        console.log(`==============>尧尚信息科技(wwww.yourshares.cn)<================\n>>>${ipHost.ip}:${ipHost.port}<<< publish api`);
        let self = this;
        Object.getOwnPropertyNames(proto).forEach(propertyName => {
            // if (typeof proto[property]. === 'function' && proto[property].name === 'ServiceClient'){ //通过判断方法名来获取service对象
            //通过判断是否存在service属性来获取service对象
            if (proto[propertyName].service !== undefined) {
                let serviceObject = self.findService(propertyName);
                console.log(`${LOG_PRE} service ${propertyName} publish api [Begin]`);
                if (serviceObject !== undefined && serviceObject.object !== undefined) {
                    let apiObject = serviceObject.object;
                    var routerObject = {};
                    Object.getOwnPropertyNames(apiObject).forEach(rpcFuncName => {
                        //发布classObject的所有static 方法 _开头的方法不会发布
                        if (typeof apiObject[rpcFuncName] === 'function' && !rpcFuncName.hasPrefix('_')) {
                            console.log(`${LOG_PRE} ${serviceObject.serviceName} 发布接口 ${rpcFuncName}`);
                            routerObject[rpcFuncName] = apiObject[rpcFuncName];
                        }
                    });
                    //grpc发布服务
                    self.server.addService(proto[propertyName].service, routerObject);
                }
                else {
                    //服务没有找到关联的对象
                    console.error(`${LOG_PRE} ${propertyName} have no map Object!!!!`);
                }
                console.log(`${LOG_PRE} service ${propertyName} publish api [End]`);
            }
        });
        this.server.bind(ipHost.ip + ':' + ipHost.port, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }
    //
    /**
     * 添加发布对象
     */
    addService(server) {
        this.rpclist.push(server);
    }
}
exports.RPCStartup = RPCStartup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1lTUnBjU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs0RUFNNEU7O0FBSzVFLDZCQUE2QjtBQUU3QixTQUFTO0FBQ1QsSUFBSSxPQUFPLEdBQUcsc0JBQXNCLENBQUE7QUFPcEM7Ozs7OztHQU1HO0FBQ0g7SUFNSTs7Ozs7T0FLRztJQUNILFlBQVksT0FBa0IsRUFBRSxTQUFpQixFQUFFLFdBQW1CO1FBVjlELFlBQU8sR0FBRyxFQUFFLENBQUE7UUFXaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7UUFDOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUE7SUFDaEMsQ0FBQztJQUNELFlBQVk7SUFDSixXQUFXLENBQUMsSUFBWTtRQUM1QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksT0FBTztRQUNWLFFBQVE7UUFDUixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZELHVCQUF1QjtRQUN2QixvRUFBb0U7UUFDcEUsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0VBQWtFLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQTtRQUN4SCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3JELGlIQUFpSDtZQUNqSCwrQkFBK0I7WUFDL0IsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBQztnQkFDMUMsSUFBSSxhQUFhLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sWUFBWSxZQUFZLHNCQUFzQixDQUFDLENBQUE7Z0JBQ3JFLElBQUksYUFBYSxLQUFLLFNBQVMsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDbkUsSUFBSSxTQUFTLEdBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQTtvQkFDckMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO29CQUNyQixNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUN4RCxzQ0FBc0M7d0JBQ3RDLElBQUksT0FBTyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBQzs0QkFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sSUFBSSxhQUFhLENBQUMsV0FBVyxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUE7NEJBQzFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBSSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7eUJBQ3REO29CQUNMLENBQUMsQ0FBQyxDQUFBO29CQUNGLFVBQVU7b0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQTtpQkFDcEU7cUJBQUk7b0JBQ0QsYUFBYTtvQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxJQUFJLFlBQVkseUJBQXlCLENBQUMsQ0FBQTtpQkFDckU7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sWUFBWSxZQUFZLG9CQUFvQixDQUFDLENBQUE7YUFFdEU7UUFFTCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUUsR0FBRyxHQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsRUFBRTtJQUNGOztPQUVHO0lBQ0ksVUFBVSxDQUFDLE1BQWtCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdCLENBQUM7Q0FDSjtBQTVFRCxnQ0E0RUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiog5bCn5bCa5L+h5oGv56eR5oqAKHd3d3cueW91cnNoYXJlcy5jbilcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy83XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICBSUEPlj5HluINcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLy8gaW1wb3J0IGhwcm9zZSA9IHJlcXVpcmUoJ2hwcm9zZScpO1xuXG5pbXBvcnQgeyBScGNDb25maWd9IGZyb20gXCIuL1lTUnBjQ29uZmlnXCJcbmltcG9ydCAqIGFzIGdycGMgIGZyb20gXCJncnBjXCJcblxuLy9sb2fml6Xlv5fliY3nvIBcbmxldCBMT0dfUFJFID0gJ1JQQyBTZXJ2aWNlIExvZy0tPj4+J1xuXG5leHBvcnQgaW50ZXJmYWNlIFJwY1NlcnZpY2Uge1xuICAgIHNlcnZpY2VOYW1lOiBzdHJpbmcsIC8v5a+55bqUcHJvdG/mlofku7bkuK1zZXJ2aWNlIOWQjeensFxuICAgIG9iamVjdDogYW55IC8v5YWz6IGU55qE57G75a+56LGhXG59XG5cbi8qKlxuICogUlBD5pyN5Yqh5Zmo5ZCv5Yqo56iL5bqPXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIFJQQ1N0YXJ0dXBcbiAqL1xuZXhwb3J0ICBjbGFzcyBSUENTdGFydHVwIHtcbiAgICBwcml2YXRlIHNlcnZlcjogYW55XG4gICAgcHJpdmF0ZSBycGNsaXN0ID0gW11cbiAgICBwcml2YXRlIHBhY2thZ2VOYW1lOiBzdHJpbmdcbiAgICBwcml2YXRlIHByb3RvUGF0aDogc3RyaW5nXG4gICAgcHJpdmF0ZSBhZGRyZXNzQ29uZmlnOiBScGNDb25maWdcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gYWRyZWVzIFxuPSAgICAgKiBAcGFyYW0gcHJvdG9QYXRoIC5wcm90byBmaWxlIOi3r+W+hFxuICAgICAqIEBwYXJhbSBwYWNrYWdlTmFtZSAgcHJvdG/or7TmmI7mlofku7bkuK1wYWNrYWdl5ZCN56ewXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYWRkcmVzczogUnBjQ29uZmlnLCBwcm90b1BhdGg6IHN0cmluZywgcGFja2FnZU5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnByb3RvUGF0aCA9IHByb3RvUGF0aFxuICAgICAgICB0aGlzLnBhY2thZ2VOYW1lID0gcGFja2FnZU5hbWVcbiAgICAgICAgdGhpcy5hZGRyZXNzQ29uZmlnID0gYWRkcmVzc1xuICAgIH1cbiAgICAvL+iOt+WPluacjeWKoeWQjeWFs+iBlOeahOWvueixoVxuICAgIHByaXZhdGUgZmluZFNlcnZpY2UobmFtZTogc3RyaW5nKTogUnBjU2VydmljZSB7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMucnBjbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMucnBjbGlzdFtpXS5zZXJ2aWNlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJwY2xpc3RbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPkeW4g+acjeWKoVxuICAgICAqL1xuICAgIHB1YmxpYyBwdWJsaXNoKCkge1xuICAgICAgICAvL+iOt+WPlklQ5L+h5oGvXG4gICAgICAgIGxldCBpcEhvc3QgPSB0aGlzLmFkZHJlc3NDb25maWdcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBuZXcgZ3JwYy5TZXJ2ZXIoKVxuICAgICAgICB2YXIgcHJvdG8gPSBncnBjLmxvYWQodGhpcy5wcm90b1BhdGgpW3RoaXMucGFja2FnZU5hbWVdXG4gICAgICAgIC8vcHJvdG/lr7nosaFtYXDkuoYucHJvdG/mlofku7bkv6Hmga9cbiAgICAgICAgLy/ojrflj5Zwcm90b+WvueixoeS4reexu+Wei+S4ulNlcnZpY2VDbGllbnTlr7nosaHlrZjlnKhzZXJ2aWNl5bGe5oCn44CC6L+Z56eN5a+56LGh5a6e6ZmF5LiK5a+55bqULnByb3Rv5Lit55qEc2VydmljZeiKgueCuVxuICAgICAgICAvL+mBjeWOhnByb3Rv6I635Y+Wc2VydmljZVxuICAgICAgICBjb25zb2xlLmxvZyhgPT09PT09PT09PT09PT0+5bCn5bCa5L+h5oGv56eR5oqAKHd3d3cueW91cnNoYXJlcy5jbik8PT09PT09PT09PT09PT09PVxcbj4+PiR7aXBIb3N0LmlwfToke2lwSG9zdC5wb3J0fTw8PCBwdWJsaXNoIGFwaWApXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaChwcm9wZXJ0eU5hbWUgPT4ge1xuICAgICAgICAgICAgLy8gaWYgKHR5cGVvZiBwcm90b1twcm9wZXJ0eV0uID09PSAnZnVuY3Rpb24nICYmIHByb3RvW3Byb3BlcnR5XS5uYW1lID09PSAnU2VydmljZUNsaWVudCcpeyAvL+mAmui/h+WIpOaWreaWueazleWQjeadpeiOt+WPlnNlcnZpY2Xlr7nosaFcbiAgICAgICAgICAgIC8v6YCa6L+H5Yik5pat5piv5ZCm5a2Y5Zyoc2VydmljZeWxnuaAp+adpeiOt+WPlnNlcnZpY2Xlr7nosaFcbiAgICAgICAgICAgIGlmIChwcm90b1twcm9wZXJ0eU5hbWVdLnNlcnZpY2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VPYmplY3QgPSAgc2VsZi5maW5kU2VydmljZShwcm9wZXJ0eU5hbWUpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7TE9HX1BSRX0gc2VydmljZSAke3Byb3BlcnR5TmFtZX0gcHVibGlzaCBhcGkgW0JlZ2luXWApXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VPYmplY3QgIT09IHVuZGVmaW5lZCAmJiBzZXJ2aWNlT2JqZWN0Lm9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcGlPYmplY3QgPSAgc2VydmljZU9iamVjdC5vYmplY3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdXRlck9iamVjdCA9IHt9XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFwaU9iamVjdCkuZm9yRWFjaChycGNGdW5jTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WPkeW4g2NsYXNzT2JqZWN055qE5omA5pyJc3RhdGljIOaWueazlSBf5byA5aS055qE5pa55rOV5LiN5Lya5Y+R5biDXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFwaU9iamVjdFtycGNGdW5jTmFtZV0gPT09ICdmdW5jdGlvbicgJiYgIXJwY0Z1bmNOYW1lLmhhc1ByZWZpeCgnXycpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtMT0dfUFJFfSAke3NlcnZpY2VPYmplY3Quc2VydmljZU5hbWV9IOWPkeW4g+aOpeWPoyAke3JwY0Z1bmNOYW1lfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyT2JqZWN0W3JwY0Z1bmNOYW1lXSA9ICBhcGlPYmplY3RbcnBjRnVuY05hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JwY+WPkeW4g+acjeWKoVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlcnZlci5hZGRTZXJ2aWNlKHByb3RvW3Byb3BlcnR5TmFtZV0uc2VydmljZSwgcm91dGVyT2JqZWN0KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvL+acjeWKoeayoeacieaJvuWIsOWFs+iBlOeahOWvueixoVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke0xPR19QUkV9ICR7cHJvcGVydHlOYW1lfSBoYXZlIG5vIG1hcCBPYmplY3QhISEhYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7TE9HX1BSRX0gc2VydmljZSAke3Byb3BlcnR5TmFtZX0gcHVibGlzaCBhcGkgW0VuZF1gKVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zZXJ2ZXIuYmluZChpcEhvc3QuaXArICc6JysgaXBIb3N0LnBvcnQsIGdycGMuU2VydmVyQ3JlZGVudGlhbHMuY3JlYXRlSW5zZWN1cmUoKSk7XG4gICAgICAgIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIC8vXG4gICAgLyoqXG4gICAgICog5re75Yqg5Y+R5biD5a+56LGhXG4gICAgICovXG4gICAgcHVibGljIGFkZFNlcnZpY2Uoc2VydmVyOiBScGNTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucnBjbGlzdC5wdXNoKHNlcnZlcilcbiAgICB9XG59XG4iXX0=