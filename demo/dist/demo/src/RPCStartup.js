"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
const src_1 = require("../../src");
const Promise = require("bluebird");
let config1 = { host: "tcp://127.0.0.1:9001", name: 'Test' };
let config2 = { host: "tcp://127.0.0.1:9002", name: 'Test2' };
class HelloRpcImpl {
    static helloWorld() {
        return new Promise(function (resolve, reject) {
            resolve('hello world');
        });
    }
}
class MainRpcImpl {
    static good() {
        return new Promise(function (resolve, reject) {
            resolve('good');
        });
    }
}
class Startup extends src_1.RPCStartup {
    serverHost() {
        return config1;
    }
    rpcClass() {
        return [HelloRpcImpl, MainRpcImpl];
    }
}
class Startup2 extends src_1.RPCStartup {
    serverHost() {
        return config2;
    }
    rpcClass() {
        return [MainRpcImpl];
    }
}
Startup.main();
Startup2.main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlBDU3RhcnR1cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SUENTdGFydHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OzsrRUFNK0U7QUFDL0UsbUNBQXNGO0FBQ3RGLG9DQUFvQztBQUdwQyxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFDNUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFBO0FBRTdEO0lBQ1MsTUFBTSxDQUFDLFVBQVU7UUFDdEIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07WUFDMUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3hCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBRUQ7SUFDUyxNQUFNLENBQUMsSUFBSTtRQUNoQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUMxQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFHRCxhQUFjLFNBQVEsZ0JBQVU7SUFFcEIsVUFBVTtRQUNsQixNQUFNLENBQUMsT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFFUyxRQUFRO1FBQ2hCLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0NBRUY7QUFDRCxjQUFlLFNBQVEsZ0JBQVU7SUFFckIsVUFBVTtRQUNsQixNQUFNLENBQUMsT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFFUyxRQUFRO1FBQ2hCLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3RCLENBQUM7Q0FFRjtBQUdELE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUNkLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy83XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICDor7TmmI5cbioqIENvcHlyaWdodCDCqSAyMDE35bm0IOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pLiBBbGwgcmlnaHRzIHJlc2VydmVkXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQgeyBScGNTZXJ2aWNlLCBSUENTdGFydHVwLCBZU0h0dHBIYW5kbGUsIFJQQ0NsaWVudCwgUnBjQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NyY1wiXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuXG5sZXQgY29uZmlnMSA9IHsgaG9zdDogXCJ0Y3A6Ly8xMjcuMC4wLjE6OTAwMVwiLCBuYW1lOiAnVGVzdCcgfVxubGV0IGNvbmZpZzIgPSB7IGhvc3Q6IFwidGNwOi8vMTI3LjAuMC4xOjkwMDJcIiwgbmFtZTogJ1Rlc3QyJyB9XG5cbmNsYXNzIEhlbGxvUnBjSW1wbCBpbXBsZW1lbnRzIFJwY1NlcnZpY2Uge1xuICBwdWJsaWMgc3RhdGljIGhlbGxvV29ybGQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlc29sdmUoJ2hlbGxvIHdvcmxkJylcbiAgICB9KVxuICB9XG59XG5cbmNsYXNzIE1haW5ScGNJbXBsIGltcGxlbWVudHMgUnBjU2VydmljZSB7XG4gIHB1YmxpYyBzdGF0aWMgZ29vZCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVzb2x2ZSgnZ29vZCcpXG4gICAgfSlcbiAgfVxufVxuXG5cbmNsYXNzIFN0YXJ0dXAgZXh0ZW5kcyBSUENTdGFydHVwIHtcblxuICBwcm90ZWN0ZWQgc2VydmVySG9zdCgpOiBScGNDb25maWcge1xuICAgIHJldHVybiBjb25maWcxXG4gIH1cblxuICBwcm90ZWN0ZWQgcnBjQ2xhc3MoKTogW1JwY1NlcnZpY2VdIHtcbiAgICByZXR1cm4gW0hlbGxvUnBjSW1wbCwgTWFpblJwY0ltcGxdXG4gIH1cblxufVxuY2xhc3MgU3RhcnR1cDIgZXh0ZW5kcyBSUENTdGFydHVwIHtcblxuICBwcm90ZWN0ZWQgc2VydmVySG9zdCgpOiBScGNDb25maWcge1xuICAgIHJldHVybiBjb25maWcyXG4gIH1cblxuICBwcm90ZWN0ZWQgcnBjQ2xhc3MoKTogW1JwY1NlcnZpY2VdIHtcbiAgICByZXR1cm4gW01haW5ScGNJbXBsXVxuICB9XG5cbn1cblxuXG5TdGFydHVwLm1haW4oKVxuU3RhcnR1cDIubWFpbigpXG5cblxuXG4iXX0=