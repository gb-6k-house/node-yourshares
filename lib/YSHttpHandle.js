"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  基于express框架，发布http接口
******************************************************************************/
var YSError_1 = require("./YSError");
var httpMethod = ['post', 'get', 'delete', 'all'];
/**
 * http发布， 发布函数名格式 {Method}_{FunctionName}的方法
 * 其中: Method是 http请求的方法
 * FunctionName是方法的路径，最终路径= prefix/FunctionName,  FunctionName不能包含'_'符合，例如post_teahcer_add是非法命名，不会最终已http接口发布
 * 1、例如函数post_teacher() 则最终发布的http接口是 post /prefix/teacher
 * 2、函数名也可以只是 http请求的方法名。例如
 * 函数名get()，则最终发布的http接口是 get /prefix
 *
 * @export
 * @abstract
 * @class YSHttpHandle
 */
//请求的基本信息
function reject(func) {
    return function (req, res, next) {
        // let message = `收到请求-> ${req.originalUrl}`
        // if(req.body != null) {
        //     message +=  (typeof req.body === 'object')? `数据体: \n ${JSON.stringify(req.body)}`:`数据体: \n ${req.body}`
        // }
        // console.log(message)
        func(req, res, next);
    };
}
var YSHttpHandle = /** @class */ (function () {
    function YSHttpHandle(prefix) {
        this.prefix = "";
        if (!prefix.hasPrefix('/')) {
            throw new Error(prefix + " \uFF1Apath is invalid.");
        }
        //确保prefix '/'结尾
        if (prefix.hasSuffix('/')) {
            this.prefix = prefix;
        }
        else {
            this.prefix = prefix + '/';
        }
    }
    /** app = express()
     * http发布， 发布函数名格式 {Method}_{FunctionName}的方法
     * 其中: Method是 http请求的方法
     * FunctionName是方法的路径，最终路径= prefix/FunctionName,  FunctionName可以包含'_'符合，例如post_teahcer_add
     * 1、例如函数post_teacher() 则最终发布的http接口是 post /prefix/teacher， 如果函数名为post_teacher_add，则最终发布接口是/prefix/teacher/add
     * 2、函数名不能只是 http请求的方法名。例如
     * 函数名get()，该函数不会发布
     *
    * @param app
     */
    YSHttpHandle.prototype.attach = function (app) {
        console.log("==============>\u5C27\u5C1A\u4FE1\u606F\u79D1\u6280(wwww.yourshares.cn)<================");
        var self = this;
        var prototype = Object.getPrototypeOf(this);
        if (prototype != null) {
            Object.getOwnPropertyNames(prototype).forEach(function (httpFuncName) {
                var nameArray = httpFuncName.split('_');
                if (nameArray.length >= 2 && httpMethod.indexOf(nameArray[0].toLowerCase()) >= 0) {
                    var path = self.prefix + nameArray[1];
                    for (var index = 2; index < nameArray.length; index++) {
                        var element = nameArray[index];
                        path += '/' + element;
                    }
                    app[nameArray[0].toLowerCase()](path, prototype[httpFuncName]);
                    console.log("http\u63A5\u53E3\u53D1\u5E03: " + nameArray[0] + " -> " + path);
                }
            });
        }
    };
    /**
     * 返回JSON格式数据到客户端
     * {
     *   code : 0,
     *   msg  : '操作成功',
     *   data : any
     * }
     * @param {any} response
     * @param {any} errcode
     * @param {any} msg
     * @param {any} data
     * @memberof YSHttpHandle
     */
    YSHttpHandle.sendJSONData = function (response, error, data) {
        var obj = {};
        obj.code = error.code;
        obj.msg = YSError_1.YSPurifyMessage(error);
        if (data != null) {
            obj.data = data;
        }
        console.info(response.req.originalUrl + ' 返回数据包:' + JSON.stringify(obj));
        response.set('Content-Type', 'application/json');
        response.send(obj);
    };
    return YSHttpHandle;
}());
exports.YSHttpHandle = YSHttpHandle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNIdHRwSGFuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1lTSHR0cEhhbmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7K0VBTStFO0FBQy9FLHFDQUFzRTtBQUV0RSxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2pEOzs7Ozs7Ozs7OztHQVdHO0FBRUYsU0FBUztBQUNULGdCQUFnQixJQUFjO0lBQzNCLE9BQU8sVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDdEIsNENBQTRDO1FBQzVDLHlCQUF5QjtRQUN6Qiw4R0FBOEc7UUFDOUcsSUFBSTtRQUNKLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM1QixDQUFDLENBQUE7QUFDSixDQUFDO0FBRUY7SUFFSSxzQkFBWSxNQUFjO1FBRDFCLFdBQU0sR0FBRyxFQUFFLENBQUE7UUFFUCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFJLE1BQU0sNEJBQW9CLENBQUMsQ0FBQztTQUNsRDtRQUNELGdCQUFnQjtRQUNoQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7U0FDdkI7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQTtTQUM3QjtJQUNMLENBQUM7SUFHRDs7Ozs7Ozs7O09BU0c7SUFDSSw2QkFBTSxHQUFiLFVBQWMsR0FBUTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDBGQUE0RCxDQUFDLENBQUE7UUFDekUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDbkIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVk7Z0JBQ3RELElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZDLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzlFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNyQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDbkQsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMvQixJQUFJLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQTtxQkFDeEI7b0JBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtvQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBYSxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQU8sSUFBTSxDQUFDLENBQUE7aUJBRXREO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFHRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDVSx5QkFBWSxHQUExQixVQUE0QixRQUFRLEVBQUUsS0FBa0IsRUFBRSxJQUFVO1FBQy9ELElBQUksR0FBRyxHQUFPLEVBQUUsQ0FBQztRQUNqQixHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsR0FBRyx5QkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7UUFDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDO0FBeEVxQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pXG4qKiBhdXRoOiBsaXVrYWlcbioqIGRhdGU6IDIwMTcvN1xuKiogdmVyIDogMS4wXG4qKiBkZXNjOiAg5Z+65LqOZXhwcmVzc+ahhuaetu+8jOWPkeW4g2h0dHDmjqXlj6NcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmltcG9ydCB7IFlTRXJyb3JUeXBlLCBZU0Vycm9yVGFiZWwsIFlTUHVyaWZ5TWVzc2FnZSB9IGZyb20gXCIuL1lTRXJyb3JcIlxuXG5sZXQgaHR0cE1ldGhvZCA9IFsncG9zdCcsICdnZXQnLCAnZGVsZXRlJywgJ2FsbCddXG4vKipcbiAqIGh0dHDlj5HluIPvvIwg5Y+R5biD5Ye95pWw5ZCN5qC85byPIHtNZXRob2R9X3tGdW5jdGlvbk5hbWV955qE5pa55rOVIFxuICog5YW25LitOiBNZXRob2TmmK8gaHR0cOivt+axgueahOaWueazlVxuICogRnVuY3Rpb25OYW1l5piv5pa55rOV55qE6Lev5b6E77yM5pyA57uI6Lev5b6EPSBwcmVmaXgvRnVuY3Rpb25OYW1lLCAgRnVuY3Rpb25OYW1l5LiN6IO95YyF5ZCrJ18n56ym5ZCI77yM5L6L5aaCcG9zdF90ZWFoY2VyX2FkZOaYr+mdnuazleWRveWQje+8jOS4jeS8muacgOe7iOW3smh0dHDmjqXlj6Plj5HluINcbiAqIDHjgIHkvovlpoLlh73mlbBwb3N0X3RlYWNoZXIoKSDliJnmnIDnu4jlj5HluIPnmoRodHRw5o6l5Y+j5pivIHBvc3QgL3ByZWZpeC90ZWFjaGVyXG4gKiAy44CB5Ye95pWw5ZCN5Lmf5Y+v5Lul5Y+q5pivIGh0dHDor7fmsYLnmoTmlrnms5XlkI3jgILkvovlpoJcbiAqIOWHveaVsOWQjWdldCgp77yM5YiZ5pyA57uI5Y+R5biD55qEaHR0cOaOpeWPo+aYryBnZXQgL3ByZWZpeFxuICogXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBZU0h0dHBIYW5kbGVcbiAqL1xuXG4gLy/or7fmsYLnmoTln7rmnKzkv6Hmga9cbiBmdW5jdGlvbiByZWplY3QoZnVuYzogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICAgICAgICAvLyBsZXQgbWVzc2FnZSA9IGDmlLbliLDor7fmsYItPiAke3JlcS5vcmlnaW5hbFVybH1gXG4gICAgICAgICAgICAvLyBpZihyZXEuYm9keSAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgbWVzc2FnZSArPSAgKHR5cGVvZiByZXEuYm9keSA9PT0gJ29iamVjdCcpPyBg5pWw5o2u5L2TOiBcXG4gJHtKU09OLnN0cmluZ2lmeShyZXEuYm9keSl9YDpg5pWw5o2u5L2TOiBcXG4gJHtyZXEuYm9keX1gXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKVxuICAgICAgICAgICAgZnVuYyhyZXEsIHJlcywgbmV4dClcbiAgICB9XG4gfVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWVNIdHRwSGFuZGxlIHtcbiAgICBwcmVmaXggPSBcIlwiXG4gICAgY29uc3RydWN0b3IocHJlZml4OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFwcmVmaXguaGFzUHJlZml4KCcvJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwcmVmaXh9IO+8mnBhdGggaXMgaW52YWxpZC5gKTtcbiAgICAgICAgfVxuICAgICAgICAvL+ehruS/nXByZWZpeCAnLyfnu5PlsL5cbiAgICAgICAgaWYgKHByZWZpeC5oYXNTdWZmaXgoJy8nKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4ICsgJy8nXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKiBhcHAgPSBleHByZXNzKClcbiAgICAgKiBodHRw5Y+R5biD77yMIOWPkeW4g+WHveaVsOWQjeagvOW8jyB7TWV0aG9kfV97RnVuY3Rpb25OYW1lfeeahOaWueazlSBcbiAgICAgKiDlhbbkuK06IE1ldGhvZOaYryBodHRw6K+35rGC55qE5pa55rOVXG4gICAgICogRnVuY3Rpb25OYW1l5piv5pa55rOV55qE6Lev5b6E77yM5pyA57uI6Lev5b6EPSBwcmVmaXgvRnVuY3Rpb25OYW1lLCAgRnVuY3Rpb25OYW1l5Y+v5Lul5YyF5ZCrJ18n56ym5ZCI77yM5L6L5aaCcG9zdF90ZWFoY2VyX2FkZFxuICAgICAqIDHjgIHkvovlpoLlh73mlbBwb3N0X3RlYWNoZXIoKSDliJnmnIDnu4jlj5HluIPnmoRodHRw5o6l5Y+j5pivIHBvc3QgL3ByZWZpeC90ZWFjaGVy77yMIOWmguaenOWHveaVsOWQjeS4unBvc3RfdGVhY2hlcl9hZGTvvIzliJnmnIDnu4jlj5HluIPmjqXlj6PmmK8vcHJlZml4L3RlYWNoZXIvYWRkXG4gICAgICogMuOAgeWHveaVsOWQjeS4jeiDveWPquaYryBodHRw6K+35rGC55qE5pa55rOV5ZCN44CC5L6L5aaCXG4gICAgICog5Ye95pWw5ZCNZ2V0KCnvvIzor6Xlh73mlbDkuI3kvJrlj5HluINcbiAgICAgKiBcbiAgICAqIEBwYXJhbSBhcHAgXG4gICAgICovXG4gICAgcHVibGljIGF0dGFjaChhcHA6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgPT09PT09PT09PT09PT0+5bCn5bCa5L+h5oGv56eR5oqAKHd3d3cueW91cnNoYXJlcy5jbik8PT09PT09PT09PT09PT09PWApXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpXG4gICAgICAgIGlmIChwcm90b3R5cGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG90eXBlKS5mb3JFYWNoKGh0dHBGdW5jTmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWVBcnJheSA9IGh0dHBGdW5jTmFtZS5zcGxpdCgnXycpXG4gICAgICAgICAgICAgICAgaWYgKG5hbWVBcnJheS5sZW5ndGggPj0gMiAmJiBodHRwTWV0aG9kLmluZGV4T2YobmFtZUFycmF5WzBdLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSBzZWxmLnByZWZpeCArIG5hbWVBcnJheVsxXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDI7IGluZGV4IDwgbmFtZUFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBuYW1lQXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCArPSAnLycgKyBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXBwW25hbWVBcnJheVswXS50b0xvd2VyQ2FzZSgpXShwYXRoLCBwcm90b3R5cGVbaHR0cEZ1bmNOYW1lXSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGh0dHDmjqXlj6Plj5HluIM6ICR7bmFtZUFycmF5WzBdfSAtPiAke3BhdGh9YClcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog6L+U5ZueSlNPTuagvOW8j+aVsOaNruWIsOWuouaIt+err1xuICAgICAqIHtcbiAgICAgKiAgIGNvZGUgOiAwLFxuICAgICAqICAgbXNnICA6ICfmk43kvZzmiJDlip8nLFxuICAgICAqICAgZGF0YSA6IGFueSBcbiAgICAgKiB9XG4gICAgICogQHBhcmFtIHthbnl9IHJlc3BvbnNlIFxuICAgICAqIEBwYXJhbSB7YW55fSBlcnJjb2RlIFxuICAgICAqIEBwYXJhbSB7YW55fSBtc2cgXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGEgXG4gICAgICogQG1lbWJlcm9mIFlTSHR0cEhhbmRsZVxuICAgICAqL1xuICAgcHVibGljIHN0YXRpYyBzZW5kSlNPTkRhdGEgKHJlc3BvbnNlLCBlcnJvcjogWVNFcnJvclR5cGUsIGRhdGE/OiBhbnkpIHtcbiAgICAgICAgbGV0IG9iajphbnkgPSB7fTtcbiAgICAgICAgb2JqLmNvZGUgPSBlcnJvci5jb2RlO1xuICAgICAgICBvYmoubXNnID0gWVNQdXJpZnlNZXNzYWdlKGVycm9yKTtcbiAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgb2JqLmRhdGEgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuaW5mbyhyZXNwb25zZS5yZXEub3JpZ2luYWxVcmwgKyAnIOi/lOWbnuaVsOaNruWMhTonICsgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIHJlc3BvbnNlLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgICAgICByZXNwb25zZS5zZW5kKG9iaik7XG4gICAgfVxuXG59XG4iXX0=