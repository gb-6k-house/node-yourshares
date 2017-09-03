"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hprose = require("hprose");
/**
 * RPC服务器启动程序
 *
 * @export
 * @abstract
 * @class RPCStartup
 */
class RPCStartup {
    constructor() {
        this.rpclist = [];
    }
    startup() {
        this.server = hprose.Server.create(this.serverHost().host);
        this.rpclist = this.rpcClass();
        this.publishAPI();
        this.server.start();
    }
    /**
     * 发布rpcClass类型的所有static 方法 _开头的方法不会发布
     *
     * @memberof RPCStartup
     */
    publishAPI() {
        console.log(`==============>尧尚信息科技(wwww.yourshares.cn)<================\n>>>${this.serverHost().host}<<<发布接口`);
        if (this.rpclist != null) {
            this.rpclist.forEach(rpc => {
                Object.getOwnPropertyNames(rpc).forEach(rpcFuncName => {
                    if (typeof rpc[rpcFuncName] === 'function' && !rpcFuncName.hasPrefix('_')) {
                        console.log(`${rpc['name']} 发布接口 ${rpcFuncName}`);
                        this.server.addFunction(rpc[rpcFuncName], rpcFuncName);
                    }
                });
            });
        }
    }
    /**
     * 启动Service
     *
     * @static
     * @returns {number}
     * @memberof RPCStartup
     */
    static main() {
        let rpc = Object.create(this.prototype);
        rpc.startup();
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
exports.RPCStartup = RPCStartup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1lTUnBjU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLGlDQUFrQztBQU9sQzs7Ozs7O0dBTUc7QUFDSDtJQUFBO1FBRVksWUFBTyxHQUFHLEVBQUUsQ0FBQTtJQTREeEIsQ0FBQztJQTFEVyxPQUFPO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWFEOzs7O09BSUc7SUFDSyxVQUFVO1FBRWQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrRUFBa0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUE7UUFFOUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ3BCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVztvQkFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7d0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsV0FBVyxFQUFFLENBQUMsQ0FBQTt3QkFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO29CQUMxRCxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2IsMkVBQTJFO1FBQzNFLHdDQUF3QztRQUN4QyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsR0FBRztZQUN6QyxPQUFPO1lBQ1AsbUJBQW1CO1lBQ25CLGVBQWU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNKO0FBOURELGdDQThEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qKiDlsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKVxuKiogYXV0aDogbGl1a2FpXG4qKiBkYXRlOiAyMDE3LzdcbioqIHZlciA6IDEuMFxuKiogZGVzYzogIFJQQ+WPkeW4g1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZGVjbGFyZSB2YXIgcHJvY2Vzc1xuaW1wb3J0IGhwcm9zZSA9IHJlcXVpcmUoJ2hwcm9zZScpO1xuaW1wb3J0IHsgUnBjQ29uZmlnfSBmcm9tIFwiLi9ZU1JwY0NvbmZpZ1wiXG5cbmV4cG9ydCBpbnRlcmZhY2UgUnBjU2VydmljZSB7XG59XG5cblxuLyoqXG4gKiBSUEPmnI3liqHlmajlkK/liqjnqIvluo9cbiAqIFxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgUlBDU3RhcnR1cFxuICovXG5leHBvcnQgIGFic3RyYWN0IGNsYXNzIFJQQ1N0YXJ0dXAge1xuICAgIHByaXZhdGUgc2VydmVyOiBhbnlcbiAgICBwcml2YXRlIHJwY2xpc3QgPSBbXVxuXG4gICAgcHJpdmF0ZSBzdGFydHVwKCkge1xuICAgICAgICB0aGlzLnNlcnZlciA9IGhwcm9zZS5TZXJ2ZXIuY3JlYXRlKHRoaXMuc2VydmVySG9zdCgpLmhvc3QpO1xuICAgICAgICB0aGlzLnJwY2xpc3QgPSB0aGlzLnJwY0NsYXNzKClcbiAgICAgICAgdGhpcy5wdWJsaXNoQVBJKCk7XG4gICAgICAgIHRoaXMuc2VydmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIC8v5pyN5Yqh5Zmo5Zyw5Z2A77yM5a2Q57G75b+F6aG75a6e546wXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNlcnZlckhvc3QoKTogUnBjQ29uZmlnXG4gICAgLyoqXG4gICAgICog6ZyA6KaB5Y+R5biD55qE5a+56LGhIFxuICAgICAqIFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAcmV0dXJucyB7UnBjU2VydmljZX0gXG4gICAgICogQG1lbWJlcm9mIFJQQ1N0YXJ0dXBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcnBjQ2xhc3MoKTogW1JwY1NlcnZpY2VdXG5cbiAgICAvKipcbiAgICAgKiDlj5HluINycGNDbGFzc+exu+Wei+eahOaJgOaciXN0YXRpYyDmlrnms5UgX+W8gOWktOeahOaWueazleS4jeS8muWPkeW4g1xuICAgICAqIFxuICAgICAqIEBtZW1iZXJvZiBSUENTdGFydHVwXG4gICAgICovXG4gICAgcHJpdmF0ZSBwdWJsaXNoQVBJKCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGA9PT09PT09PT09PT09PT7lsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKTw9PT09PT09PT09PT09PT09XFxuPj4+JHt0aGlzLnNlcnZlckhvc3QoKS5ob3N0fTw8POWPkeW4g+aOpeWPo2ApXG5cbiAgICAgICAgaWYgKHRoaXMucnBjbGlzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJwY2xpc3QuZm9yRWFjaChycGMgPT4ge1xuICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJwYykuZm9yRWFjaChycGNGdW5jTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcnBjW3JwY0Z1bmNOYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiAhcnBjRnVuY05hbWUuaGFzUHJlZml4KCdfJykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cnBjWyduYW1lJ119IOWPkeW4g+aOpeWPoyAke3JwY0Z1bmNOYW1lfWApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZlci5hZGRGdW5jdGlvbihycGNbcnBjRnVuY05hbWVdLCBycGNGdW5jTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWQr+WKqFNlcnZpY2VcbiAgICAgKiBcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge251bWJlcn0gXG4gICAgICogQG1lbWJlcm9mIFJQQ1N0YXJ0dXBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1haW4oKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJwYyA9IE9iamVjdC5jcmVhdGUodGhpcy5wcm90b3R5cGUpO1xuICAgICAgICBycGMuc3RhcnR1cCgpXG4gICAgICAgIC8v5oiR5Lus5Y+v5LuldW5jYXVnaHRFeGNlcHRpb27mnaXlhajlsYDmjZXojrfmnKrmjZXojrfnmoRFcnJvcu+8jOWQjOaXtuS9oOi/mOWPr+S7peWwhuatpOWHveaVsOeahOiwg+eUqOagiOaJk+WNsOWHuuadpe+8jOaNleiOt+S5i+WQjuWPr+S7peacieaViOmYsuatom5vZGXov5vnqIvpgIDlh7pcbiAgICAgICAgLy/miJHku6zkuZ/lj6/ku6XnlKhub2RlLWZvcmV2ZXIg5o+Q5L6b5LqG5a6I5oqk55qE5Yqf6IO95ZKMTE9H5pel5b+X6K6w5b2V5Yqf6IO944CCXG4gICAgICAgIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgLy/miZPljbDlh7rplJnor69cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIC8v5omT5Y2w5Ye66ZSZ6K+v55qE6LCD55So5qCI5pa55L6/6LCD6K+VXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVyci5zdGFjaykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuIl19