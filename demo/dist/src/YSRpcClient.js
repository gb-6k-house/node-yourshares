"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hprose = require("hprose");
/**
 * RPC客户端
 *
 * @export
 * @class RPCClient
 */
class RPCClient {
    constructor(config) {
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
    call(f) {
        try {
            f(this.proxy);
        }
        catch (e) {
            console.error(e);
        }
    }
}
exports.RPCClient = RPCClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNScGNDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvWVNScGNDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQSxpQ0FBa0M7QUFFbEM7Ozs7O0dBS0c7QUFDSDtJQUdJLFlBQVksTUFBaUI7UUFGN0IsV0FBTSxHQUFHLElBQUksQ0FBQTtRQUNiLFVBQUssR0FBRyxJQUFJLENBQUE7UUFHUixxQ0FBcUM7UUFDckMsc0JBQXNCO1FBQ3RCLEtBQUs7UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3hDLENBQUM7SUFDTSxJQUFJLENBQUMsQ0FBVztRQUNuQixJQUFJLENBQUM7WUFDRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBdkJELDhCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy85XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICDor7TmmI5cbioqIENvcHlyaWdodCDCqSAyMDE35bm0IOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pLiBBbGwgcmlnaHRzIHJlc2VydmVkXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQgeyBScGNDb25maWcgfSBmcm9tIFwiLi9ZU1JwY0NvbmZpZ1wiXG5pbXBvcnQgaHByb3NlID0gcmVxdWlyZSgnaHByb3NlJyk7XG5cbi8qKlxuICogUlBD5a6i5oi356uvXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSUENDbGllbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFJQQ0NsaWVudCB7XG4gICAgY2xpZW50ID0gbnVsbFxuICAgIHByb3h5ID0gbnVsbFxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogUnBjQ29uZmlnKSB7XG5cbiAgICAgICAgLy8gbGV0IGhvc3RsaXN0ID0gY29uZmlnLm1hcChyb3cgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHJvdy5ob3N0XG4gICAgICAgIC8vIH0pXG4gICAgICAgIHRoaXMuY2xpZW50ID0gaHByb3NlLkNsaWVudC5jcmVhdGUoY29uZmlnLmhvc3QpO1xuICAgICAgICB0aGlzLmNsaWVudC5mdWxsRHVwbGV4ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGllbnQubWF4UG9vbFNpemUgPSAyO1xuICAgICAgICB0aGlzLmNsaWVudC5vbignZXJyb3InLCBmdW5jdGlvbiAoZnVuYywgZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmdW5jLCBlKTtcbiAgICAgICAgfSk7XG4gICAgICAgdGhpcy5wcm94eSA9IHRoaXMuY2xpZW50LnVzZVNlcnZpY2UoKVxuICAgIH1cbiAgICBwdWJsaWMgY2FsbChmOiBGdW5jdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZih0aGlzLnByb3h5KVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==