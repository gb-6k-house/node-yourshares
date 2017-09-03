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
var httpMethod = ['post', 'get', 'delete', 'ALL'];
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
var YSHttpHandle = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNIdHRwSGFuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1lTSHR0cEhhbmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7K0VBTStFO0FBQy9FLHFDQUFzRTtBQUV0RSxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2pEOzs7Ozs7Ozs7OztHQVdHO0FBRUYsU0FBUztBQUNULGdCQUFnQixJQUFjO0lBQzNCLE1BQU0sQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUN0Qiw0Q0FBNEM7UUFDNUMseUJBQXlCO1FBQ3pCLDhHQUE4RztRQUM5RyxJQUFJO1FBQ0osdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFRjtJQUVJLHNCQUFZLE1BQWM7UUFEMUIsV0FBTSxHQUFHLEVBQUUsQ0FBQTtRQUVQLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBSSxNQUFNLDRCQUFvQixDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELGdCQUFnQjtRQUNoQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFHRDs7Ozs7Ozs7O09BU0c7SUFDSSw2QkFBTSxHQUFiLFVBQWMsR0FBUTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDBGQUE0RCxDQUFDLENBQUE7UUFDekUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsWUFBWTtnQkFDdEQsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7d0JBQ3BELElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUE7b0JBQ3pCLENBQUM7b0JBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtvQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBYSxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQU8sSUFBTSxDQUFDLENBQUE7Z0JBRXZELENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFDTCxDQUFDO0lBR0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ1UseUJBQVksR0FBMUIsVUFBNEIsUUFBUSxFQUFFLEtBQWtCLEVBQUUsSUFBVTtRQUMvRCxJQUFJLEdBQUcsR0FBTyxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcseUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtRQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUF4RUQsSUF3RUM7QUF4RXFCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiog5bCn5bCa5L+h5oGv56eR5oqAKHd3d3cueW91cnNoYXJlcy5jbilcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy83XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICDln7rkuo5leHByZXNz5qGG5p6277yM5Y+R5biDaHR0cOaOpeWPo1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuaW1wb3J0IHsgWVNFcnJvclR5cGUsIFlTRXJyb3JUYWJlbCwgWVNQdXJpZnlNZXNzYWdlIH0gZnJvbSBcIi4vWVNFcnJvclwiXG5cbmxldCBodHRwTWV0aG9kID0gWydwb3N0JywgJ2dldCcsICdkZWxldGUnLCAnQUxMJ11cbi8qKlxuICogaHR0cOWPkeW4g++8jCDlj5HluIPlh73mlbDlkI3moLzlvI8ge01ldGhvZH1fe0Z1bmN0aW9uTmFtZX3nmoTmlrnms5UgXG4gKiDlhbbkuK06IE1ldGhvZOaYryBodHRw6K+35rGC55qE5pa55rOVXG4gKiBGdW5jdGlvbk5hbWXmmK/mlrnms5XnmoTot6/lvoTvvIzmnIDnu4jot6/lvoQ9IHByZWZpeC9GdW5jdGlvbk5hbWUsICBGdW5jdGlvbk5hbWXkuI3og73ljIXlkKsnXyfnrKblkIjvvIzkvovlpoJwb3N0X3RlYWhjZXJfYWRk5piv6Z2e5rOV5ZG95ZCN77yM5LiN5Lya5pyA57uI5beyaHR0cOaOpeWPo+WPkeW4g1xuICogMeOAgeS+i+WmguWHveaVsHBvc3RfdGVhY2hlcigpIOWImeacgOe7iOWPkeW4g+eahGh0dHDmjqXlj6PmmK8gcG9zdCAvcHJlZml4L3RlYWNoZXJcbiAqIDLjgIHlh73mlbDlkI3kuZ/lj6/ku6Xlj6rmmK8gaHR0cOivt+axgueahOaWueazleWQjeOAguS+i+WmglxuICog5Ye95pWw5ZCNZ2V0KCnvvIzliJnmnIDnu4jlj5HluIPnmoRodHRw5o6l5Y+j5pivIGdldCAvcHJlZml4XG4gKiBcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIFlTSHR0cEhhbmRsZVxuICovXG5cbiAvL+ivt+axgueahOWfuuacrOS/oeaBr1xuIGZ1bmN0aW9uIHJlamVjdChmdW5jOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgICAgIC8vIGxldCBtZXNzYWdlID0gYOaUtuWIsOivt+axgi0+ICR7cmVxLm9yaWdpbmFsVXJsfWBcbiAgICAgICAgICAgIC8vIGlmKHJlcS5ib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vICAgICBtZXNzYWdlICs9ICAodHlwZW9mIHJlcS5ib2R5ID09PSAnb2JqZWN0Jyk/IGDmlbDmja7kvZM6IFxcbiAke0pTT04uc3RyaW5naWZ5KHJlcS5ib2R5KX1gOmDmlbDmja7kvZM6IFxcbiAke3JlcS5ib2R5fWBcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gICAgICAgICAgICBmdW5jKHJlcSwgcmVzLCBuZXh0KVxuICAgIH1cbiB9XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBZU0h0dHBIYW5kbGUge1xuICAgIHByZWZpeCA9IFwiXCJcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXg6IHN0cmluZykge1xuICAgICAgICBpZiAoIXByZWZpeC5oYXNQcmVmaXgoJy8nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ByZWZpeH0g77yacGF0aCBpcyBpbnZhbGlkLmApO1xuICAgICAgICB9XG4gICAgICAgIC8v56Gu5L+dcHJlZml4ICcvJ+e7k+WwvlxuICAgICAgICBpZiAocHJlZml4Lmhhc1N1ZmZpeCgnLycpKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXggKyAnLydcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqIGFwcCA9IGV4cHJlc3MoKVxuICAgICAqIGh0dHDlj5HluIPvvIwg5Y+R5biD5Ye95pWw5ZCN5qC85byPIHtNZXRob2R9X3tGdW5jdGlvbk5hbWV955qE5pa55rOVIFxuICAgICAqIOWFtuS4rTogTWV0aG9k5pivIGh0dHDor7fmsYLnmoTmlrnms5VcbiAgICAgKiBGdW5jdGlvbk5hbWXmmK/mlrnms5XnmoTot6/lvoTvvIzmnIDnu4jot6/lvoQ9IHByZWZpeC9GdW5jdGlvbk5hbWUsICBGdW5jdGlvbk5hbWXlj6/ku6XljIXlkKsnXyfnrKblkIjvvIzkvovlpoJwb3N0X3RlYWhjZXJfYWRkXG4gICAgICogMeOAgeS+i+WmguWHveaVsHBvc3RfdGVhY2hlcigpIOWImeacgOe7iOWPkeW4g+eahGh0dHDmjqXlj6PmmK8gcG9zdCAvcHJlZml4L3RlYWNoZXLvvIwg5aaC5p6c5Ye95pWw5ZCN5Li6cG9zdF90ZWFjaGVyX2FkZO+8jOWImeacgOe7iOWPkeW4g+aOpeWPo+aYry9wcmVmaXgvdGVhY2hlci9hZGRcbiAgICAgKiAy44CB5Ye95pWw5ZCN5LiN6IO95Y+q5pivIGh0dHDor7fmsYLnmoTmlrnms5XlkI3jgILkvovlpoJcbiAgICAgKiDlh73mlbDlkI1nZXQoKe+8jOivpeWHveaVsOS4jeS8muWPkeW4g1xuICAgICAqIFxuICAgICogQHBhcmFtIGFwcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNoKGFwcDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGA9PT09PT09PT09PT09PT7lsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKTw9PT09PT09PT09PT09PT09YClcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcylcbiAgICAgICAgaWYgKHByb3RvdHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpLmZvckVhY2goaHR0cEZ1bmNOYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFycmF5ID0gaHR0cEZ1bmNOYW1lLnNwbGl0KCdfJylcbiAgICAgICAgICAgICAgICBpZiAobmFtZUFycmF5Lmxlbmd0aCA+PSAyICYmIGh0dHBNZXRob2QuaW5kZXhPZihuYW1lQXJyYXlbMF0udG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHNlbGYucHJlZml4ICsgbmFtZUFycmF5WzFdXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMjsgaW5kZXggPCBuYW1lQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IG5hbWVBcnJheVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoICs9ICcvJyArIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcHBbbmFtZUFycmF5WzBdLnRvTG93ZXJDYXNlKCldKHBhdGgsIHByb3RvdHlwZVtodHRwRnVuY05hbWVdKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgaHR0cOaOpeWPo+WPkeW4gzogJHtuYW1lQXJyYXlbMF19IC0+ICR7cGF0aH1gKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDov5Tlm55KU09O5qC85byP5pWw5o2u5Yiw5a6i5oi356uvXG4gICAgICoge1xuICAgICAqICAgY29kZSA6IDAsXG4gICAgICogICBtc2cgIDogJ+aTjeS9nOaIkOWKnycsXG4gICAgICogICBkYXRhIDogYW55IFxuICAgICAqIH1cbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzcG9uc2UgXG4gICAgICogQHBhcmFtIHthbnl9IGVycmNvZGUgXG4gICAgICogQHBhcmFtIHthbnl9IG1zZyBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YSBcbiAgICAgKiBAbWVtYmVyb2YgWVNIdHRwSGFuZGxlXG4gICAgICovXG4gICBwdWJsaWMgc3RhdGljIHNlbmRKU09ORGF0YSAocmVzcG9uc2UsIGVycm9yOiBZU0Vycm9yVHlwZSwgZGF0YT86IGFueSkge1xuICAgICAgICBsZXQgb2JqOmFueSA9IHt9O1xuICAgICAgICBvYmouY29kZSA9IGVycm9yLmNvZGU7XG4gICAgICAgIG9iai5tc2cgPSBZU1B1cmlmeU1lc3NhZ2UoZXJyb3IpO1xuICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5pbmZvKHJlc3BvbnNlLnJlcS5vcmlnaW5hbFVybCArICcg6L+U5Zue5pWw5o2u5YyFOicgKyBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgcmVzcG9uc2Uuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgIHJlc3BvbnNlLnNlbmQob2JqKTtcbiAgICB9XG5cbn1cbiJdfQ==