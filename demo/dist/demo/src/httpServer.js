"use strict";
/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const Express = require("express");
let config1 = { host: "tcp://127.0.0.1:9001", name: 'Test' };
let rpc = new src_1.RPCClient(config1);
let app = Express();
class TestHttpHandle extends src_1.YSHttpHandle {
    post_teacher(req, res, next) {
        console.log(`post_teacher body: ${req.body}`);
        console.log(`post_teacher query:`, req.query);
        // console.log('req.paramer==>>', req.params.id)
    }
    get_hello_world(req, res) {
        console.log(req.query);
        console.log('get_hello req.paramer==>>', req.query.id);
        res.send('hello world');
    }
    delete_hello(req, res) {
        console.log(`delete_hello:===>`);
        console.log(req.query);
        res.send('hello world');
    }
}
let http = new TestHttpHandle('/api/v1');
app.set('port', (process.env.PORT || 8080));
http.attach(app);
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odHRwU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OytFQU0rRTs7QUFFL0UsbUNBQWtEO0FBRWxELG1DQUFvQztBQUdwQyxJQUFJLE9BQU8sR0FBRyxFQUFDLElBQUksRUFBQyxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUE7QUFFekQsSUFBSSxHQUFHLEdBQUksSUFBSSxlQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFakMsSUFBSSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUE7QUFDbkIsb0JBQXFCLFNBQVEsa0JBQVk7SUFDOUIsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QyxnREFBZ0Q7SUFFbEQsQ0FBQztJQUNNLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUV6QixDQUFDO0lBQ00sWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7Q0FDRjtBQUVELElBQUksSUFBSSxHQUFHLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRXhDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRWhCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy83XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICDor7TmmI5cbioqIENvcHlyaWdodCDCqSAyMDE35bm0IOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pLiBBbGwgcmlnaHRzIHJlc2VydmVkXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7WVNIdHRwSGFuZGxlLCBSUENDbGllbnQgfSBmcm9tIFwiLi4vLi4vc3JjXCJcblxuaW1wb3J0IEV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5cblxubGV0IGNvbmZpZzEgPSB7aG9zdDpcInRjcDovLzEyNy4wLjAuMTo5MDAxXCIsIG5hbWU6ICdUZXN0J31cblxubGV0IHJwYyA9ICBuZXcgUlBDQ2xpZW50KGNvbmZpZzEpXG5cbmxldCBhcHAgPSBFeHByZXNzKClcbmNsYXNzIFRlc3RIdHRwSGFuZGxlIGV4dGVuZHMgWVNIdHRwSGFuZGxlIHtcbiAgICBwdWJsaWMgcG9zdF90ZWFjaGVyKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICBjb25zb2xlLmxvZyhgcG9zdF90ZWFjaGVyIGJvZHk6ICR7cmVxLmJvZHl9YClcbiAgICAgIGNvbnNvbGUubG9nKGBwb3N0X3RlYWNoZXIgcXVlcnk6YCwgcmVxLnF1ZXJ5KVxuICAgICAgLy8gY29uc29sZS5sb2coJ3JlcS5wYXJhbWVyPT0+PicsIHJlcS5wYXJhbXMuaWQpXG4gIFxuICAgIH1cbiAgICBwdWJsaWMgZ2V0X2hlbGxvX3dvcmxkKHJlcSwgcmVzKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXEucXVlcnkpXG4gICAgICBjb25zb2xlLmxvZygnZ2V0X2hlbGxvIHJlcS5wYXJhbWVyPT0+PicsIHJlcS5xdWVyeS5pZClcbiAgICAgIHJlcy5zZW5kKCdoZWxsbyB3b3JsZCcpXG4gICAgICBcbiAgICB9XG4gICAgcHVibGljIGRlbGV0ZV9oZWxsbyhyZXEsIHJlcykge1xuICAgICAgY29uc29sZS5sb2coYGRlbGV0ZV9oZWxsbzo9PT0+YClcbiAgICAgIGNvbnNvbGUubG9nKHJlcS5xdWVyeSlcbiAgICAgIHJlcy5zZW5kKCdoZWxsbyB3b3JsZCcpXG4gICAgfVxuICB9XG4gIFxuICBsZXQgaHR0cCA9IG5ldyBUZXN0SHR0cEhhbmRsZSgnL2FwaS92MScpXG4gIFxuICBhcHAuc2V0KCdwb3J0JywgKHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MCkpXG4gIGh0dHAuYXR0YWNoKGFwcClcbiAgXG4gIGFwcC5saXN0ZW4oYXBwLmdldCgncG9ydCcpLCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ05vZGUgYXBwIGlzIHJ1bm5pbmcgb24gcG9ydCcsIGFwcC5nZXQoJ3BvcnQnKSk7XG4gIH0pOyJdfQ==