"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hprose = require("hprose");
/**
 * RPC客户端
 *
 * @export
 * @class RPCClient
 */
var RPCClient = (function () {
    function RPCClient(config) {
        this.client = null;
        this.proxy = null;
        // let hostlist = config.map(row => {
        //     return row.host
        // })
        this.client = hprose.Client.create(config.host);
        this.client.fullDuplex = true;
        this.client.maxPoolSize = 2;
        this.client.on('error', function (func, e) {
            console.error(func, e);
        });
        this.proxy = this.client.useService();
    }
    RPCClient.prototype.call = function (f) {
        try {
            f(this.proxy);
        }
        catch (e) {
            console.error(e);
        }
    };
    return RPCClient;
}());
exports.RPCClient = RPCClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvWVNScGNDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSwrQkFBa0M7QUFFbEM7Ozs7O0dBS0c7QUFDSDtJQUdJLG1CQUFZLE1BQWlCO1FBRjdCLFdBQU0sR0FBRyxJQUFJLENBQUE7UUFDYixVQUFLLEdBQUcsSUFBSSxDQUFBO1FBR1IscUNBQXFDO1FBQ3JDLHNCQUFzQjtRQUN0QixLQUFLO1FBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQztZQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUN4QyxDQUFDO0lBQ00sd0JBQUksR0FBWCxVQUFZLENBQVc7UUFDbkIsSUFBSSxDQUFDO1lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNqQixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2QlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qKiBhdXRoOiBsaXVrYWlcbioqIGRhdGU6IDIwMTcvOVxuKiogdmVyIDogMS4wXG4qKiBkZXNjOiAg6K+05piOXG4qKiBDb3B5cmlnaHQgwqkgMjAxN+W5tCDlsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKS4gQWxsIHJpZ2h0cyByZXNlcnZlZFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuaW1wb3J0IHsgUnBjQ29uZmlnIH0gZnJvbSBcIi4vWVNScGNDb25maWdcIlxuaW1wb3J0IGhwcm9zZSA9IHJlcXVpcmUoJ2hwcm9zZScpO1xuXG4vKipcbiAqIFJQQ+WuouaIt+err1xuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUlBDQ2xpZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBSUENDbGllbnQge1xuICAgIGNsaWVudCA9IG51bGxcbiAgICBwcm94eSA9IG51bGxcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFJwY0NvbmZpZykge1xuXG4gICAgICAgIC8vIGxldCBob3N0bGlzdCA9IGNvbmZpZy5tYXAocm93ID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiByb3cuaG9zdFxuICAgICAgICAvLyB9KVxuICAgICAgICB0aGlzLmNsaWVudCA9IGhwcm9zZS5DbGllbnQuY3JlYXRlKGNvbmZpZy5ob3N0KTtcbiAgICAgICAgdGhpcy5jbGllbnQuZnVsbER1cGxleCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xpZW50Lm1heFBvb2xTaXplID0gMjtcbiAgICAgICAgdGhpcy5jbGllbnQub24oJ2Vycm9yJywgZnVuY3Rpb24gKGZ1bmMsIGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZnVuYywgZSk7XG4gICAgICAgIH0pO1xuICAgICAgIHRoaXMucHJveHkgPSB0aGlzLmNsaWVudC51c2VTZXJ2aWNlKClcbiAgICB9XG4gICAgcHVibGljIGNhbGwoZjogRnVuY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGYodGhpcy5wcm94eSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=