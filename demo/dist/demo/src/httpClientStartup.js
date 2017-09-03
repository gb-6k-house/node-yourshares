"use strict";
/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
// import hprose = require('hprose');
let config1 = { host: "tcp://127.0.0.1:9001", name: 'Test' };
let config2 = { host: "tcp://127.0.0.1:9002", name: 'Test' };
let rpc = new src_1.RPCClient(config1);
rpc.call(romote => {
    romote.helloWorld().then(data => {
        console.log(data);
    });
});
rpc.call(romote => {
    romote.good('abc', function (data) {
        console.log(data);
    });
});
// var hprose = require("hprose");
// var client = hprose.Client.create(config1.host);
// var proxy = client.useService();
// proxy.helloWorld("world").then(data => {
//     console.log(data)
// })
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudFN0YXJ0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaHR0cENsaWVudFN0YXJ0dXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7K0VBTStFOztBQUcvRSxtQ0FBc0Y7QUFDdEYscUNBQXFDO0FBRXJDLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQTtBQUM1RCxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUE7QUFFNUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxlQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO0lBQ1gsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtJQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVMsSUFBSTtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JCLENBQUMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQyxDQUFDLENBQUE7QUFFSCxrQ0FBa0M7QUFDbEMsbURBQW1EO0FBQ25ELG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0Msd0JBQXdCO0FBRXhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qKiDlsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKVxuKiogYXV0aDogbGl1a2FpXG4qKiBkYXRlOiAyMDE3LzdcbioqIHZlciA6IDEuMFxuKiogZGVzYzogIOivtOaYjlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBNeVJlcXVlc3QgfSBmcm9tIFwiLi9teVJlcXVlc3RcIlxuaW1wb3J0IHsgUnBjU2VydmljZSwgUlBDU3RhcnR1cCwgWVNIdHRwSGFuZGxlLCBSUENDbGllbnQsIFJwY0NvbmZpZyB9IGZyb20gXCIuLi8uLi9zcmNcIlxuLy8gaW1wb3J0IGhwcm9zZSA9IHJlcXVpcmUoJ2hwcm9zZScpO1xuXG5sZXQgY29uZmlnMSA9IHsgaG9zdDogXCJ0Y3A6Ly8xMjcuMC4wLjE6OTAwMVwiLCBuYW1lOiAnVGVzdCcgfVxubGV0IGNvbmZpZzIgPSB7IGhvc3Q6IFwidGNwOi8vMTI3LjAuMC4xOjkwMDJcIiwgbmFtZTogJ1Rlc3QnIH1cblxubGV0IHJwYyA9IG5ldyBSUENDbGllbnQoY29uZmlnMSlcblxucnBjLmNhbGwocm9tb3RlID0+IHtcbiAgICByb21vdGUuaGVsbG9Xb3JsZCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgfSlcbiB9KVxuIHJwYy5jYWxsKHJvbW90ZSA9PiB7XG4gICAgcm9tb3RlLmdvb2QoJ2FiYycsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKSAgICAgICAgXG4gICAgfSlcbiB9KVxuXG4vLyB2YXIgaHByb3NlID0gcmVxdWlyZShcImhwcm9zZVwiKTtcbi8vIHZhciBjbGllbnQgPSBocHJvc2UuQ2xpZW50LmNyZWF0ZShjb25maWcxLmhvc3QpO1xuLy8gdmFyIHByb3h5ID0gY2xpZW50LnVzZVNlcnZpY2UoKTtcbi8vIHByb3h5LmhlbGxvV29ybGQoXCJ3b3JsZFwiKS50aGVuKGRhdGEgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpXG5cbi8vIH0pXG4iXX0=