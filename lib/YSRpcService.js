"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hprose = require("hprose");
/**
 * RPC服务器启动程序
 *
 * @export
 * @abstract
 * @class RPCStartup
 */
var RPCStartup = (function () {
    function RPCStartup() {
        this.rpclist = [];
    }
    RPCStartup.prototype.startup = function () {
        this.server = hprose.Server.create(this.serverHost().host);
        this.rpclist = this.rpcClass();
        this.publishAPI();
        this.server.start();
    };
    /**
     * 发布rpcClass类型的所有static 方法 _开头的方法不会发布
     *
     * @memberof RPCStartup
     */
    RPCStartup.prototype.publishAPI = function () {
        var _this = this;
        console.log("==============>\u5C27\u5C1A\u4FE1\u606F\u79D1\u6280(wwww.yourshares.cn)<================\n>>>" + this.serverHost().host + "<<<\u53D1\u5E03\u63A5\u53E3");
        if (this.rpclist != null) {
            this.rpclist.forEach(function (rpc) {
                Object.getOwnPropertyNames(rpc).forEach(function (rpcFuncName) {
                    if (typeof rpc[rpcFuncName] === 'function' && !rpcFuncName.hasPrefix('_')) {
                        console.log(rpc['name'] + " \u53D1\u5E03\u63A5\u53E3 " + rpcFuncName);
                        _this.server.addFunction(rpc[rpcFuncName], rpcFuncName);
                    }
                });
            });
        }
    };
    /**
     * 启动Service
     *
     * @static
     * @returns {number}
     * @memberof RPCStartup
     */
    RPCStartup.main = function () {
        var rpc = Object.create(this.prototype);
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
    };
    return RPCStartup;
}());
exports.RPCStartup = RPCStartup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1lTUnBjU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLCtCQUFrQztBQU9sQzs7Ozs7O0dBTUc7QUFDSDtJQUFBO1FBRVksWUFBTyxHQUFHLEVBQUUsQ0FBQTtJQTREeEIsQ0FBQztJQTFEVyw0QkFBTyxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWFEOzs7O09BSUc7SUFDSywrQkFBVSxHQUFsQjtRQUFBLGlCQWNDO1FBWkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrR0FBa0UsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksZ0NBQVMsQ0FBQyxDQUFBO1FBRTlHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ3BCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxXQUFXO29CQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGtDQUFTLFdBQWEsQ0FBQyxDQUFBO3dCQUNqRCxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7b0JBQzFELENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFDTCxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csZUFBSSxHQUFsQjtRQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNiLDJFQUEyRTtRQUMzRSx3Q0FBd0M7UUFDeEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLEdBQUc7WUFDekMsT0FBTztZQUNQLG1CQUFtQjtZQUNuQixlQUFlO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUE5REQsSUE4REM7QUE5RHNCLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pXG4qKiBhdXRoOiBsaXVrYWlcbioqIGRhdGU6IDIwMTcvN1xuKiogdmVyIDogMS4wXG4qKiBkZXNjOiAgUlBD5Y+R5biDXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5kZWNsYXJlIHZhciBwcm9jZXNzXG5pbXBvcnQgaHByb3NlID0gcmVxdWlyZSgnaHByb3NlJyk7XG5pbXBvcnQgeyBScGNDb25maWd9IGZyb20gXCIuL1lTUnBjQ29uZmlnXCJcblxuZXhwb3J0IGludGVyZmFjZSBScGNTZXJ2aWNlIHtcbn1cblxuXG4vKipcbiAqIFJQQ+acjeWKoeWZqOWQr+WKqOeoi+W6j1xuICogXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBSUENTdGFydHVwXG4gKi9cbmV4cG9ydCAgYWJzdHJhY3QgY2xhc3MgUlBDU3RhcnR1cCB7XG4gICAgcHJpdmF0ZSBzZXJ2ZXI6IGFueVxuICAgIHByaXZhdGUgcnBjbGlzdCA9IFtdXG5cbiAgICBwcml2YXRlIHN0YXJ0dXAoKSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gaHByb3NlLlNlcnZlci5jcmVhdGUodGhpcy5zZXJ2ZXJIb3N0KCkuaG9zdCk7XG4gICAgICAgIHRoaXMucnBjbGlzdCA9IHRoaXMucnBjQ2xhc3MoKVxuICAgICAgICB0aGlzLnB1Ymxpc2hBUEkoKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgLy/mnI3liqHlmajlnLDlnYDvvIzlrZDnsbvlv4Xpobvlrp7njrBcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2VydmVySG9zdCgpOiBScGNDb25maWdcbiAgICAvKipcbiAgICAgKiDpnIDopoHlj5HluIPnmoTlr7nosaEgXG4gICAgICogXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIEByZXR1cm5zIHtScGNTZXJ2aWNlfSBcbiAgICAgKiBAbWVtYmVyb2YgUlBDU3RhcnR1cFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBycGNDbGFzcygpOiBbUnBjU2VydmljZV1cblxuICAgIC8qKlxuICAgICAqIOWPkeW4g3JwY0NsYXNz57G75Z6L55qE5omA5pyJc3RhdGljIOaWueazlSBf5byA5aS055qE5pa55rOV5LiN5Lya5Y+R5biDXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIFJQQ1N0YXJ0dXBcbiAgICAgKi9cbiAgICBwcml2YXRlIHB1Ymxpc2hBUEkoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc29sZS5sb2coYD09PT09PT09PT09PT09PuWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pPD09PT09PT09PT09PT09PT1cXG4+Pj4ke3RoaXMuc2VydmVySG9zdCgpLmhvc3R9PDw85Y+R5biD5o6l5Y+jYClcblxuICAgICAgICBpZiAodGhpcy5ycGNsaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucnBjbGlzdC5mb3JFYWNoKHJwYyA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocnBjKS5mb3JFYWNoKHJwY0Z1bmNOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBycGNbcnBjRnVuY05hbWVdID09PSAnZnVuY3Rpb24nICYmICFycGNGdW5jTmFtZS5oYXNQcmVmaXgoJ18nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtycGNbJ25hbWUnXX0g5Y+R5biD5o6l5Y+jICR7cnBjRnVuY05hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyLmFkZEZ1bmN0aW9uKHJwY1tycGNGdW5jTmFtZV0sIHJwY0Z1bmNOYW1lKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCv5YqoU2VydmljZVxuICAgICAqIFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBcbiAgICAgKiBAbWVtYmVyb2YgUlBDU3RhcnR1cFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbWFpbigpOiBudW1iZXIge1xuICAgICAgICBsZXQgcnBjID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnByb3RvdHlwZSk7XG4gICAgICAgIHJwYy5zdGFydHVwKClcbiAgICAgICAgLy/miJHku6zlj6/ku6V1bmNhdWdodEV4Y2VwdGlvbuadpeWFqOWxgOaNleiOt+acquaNleiOt+eahEVycm9y77yM5ZCM5pe25L2g6L+Y5Y+v5Lul5bCG5q2k5Ye95pWw55qE6LCD55So5qCI5omT5Y2w5Ye65p2l77yM5o2V6I635LmL5ZCO5Y+v5Lul5pyJ5pWI6Ziy5q2ibm9kZei/m+eoi+mAgOWHulxuICAgICAgICAvL+aIkeS7rOS5n+WPr+S7peeUqG5vZGUtZm9yZXZlciDmj5DkvpvkuoblrojmiqTnmoTlip/og73lkoxMT0fml6Xlv5forrDlvZXlip/og73jgIJcbiAgICAgICAgcHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAvL+aJk+WNsOWHuumUmeivr1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgLy/miZPljbDlh7rplJnor6/nmoTosIPnlKjmoIjmlrnkvr/osIPor5VcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyLnN0YWNrKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59XG4iXX0=