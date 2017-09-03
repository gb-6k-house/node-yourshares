"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  基于express框架，发布http接口
******************************************************************************/
const YSError_1 = require("./YSError");
let httpMethod = ['post', 'get', 'delete', 'ALL'];
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
function reject(func) {
    return function (req, res, next) {
        let message = `收到请求${req.originalUrl}`;
        if (req.body != null) {
            message += `数据体: \n ${req.body}`;
        }
        console.log(message);
        func(req, res, next);
    };
}
class YSHttpHandle {
    constructor(prefix) {
        this.prefix = "";
        if (!prefix.hasPrefix('/')) {
            throw new Error(`${prefix} ：path is invalid.`);
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
    attach(app) {
        console.log(`==============>尧尚信息科技(wwww.yourshares.cn)<================`);
        let self = this;
        let prototype = Object.getPrototypeOf(this);
        if (prototype != null) {
            Object.getOwnPropertyNames(prototype).forEach(httpFuncName => {
                let nameArray = httpFuncName.split('_');
                if (nameArray.length >= 2 && httpMethod.indexOf(nameArray[0].toLowerCase()) >= 0) {
                    let path = self.prefix + nameArray[1];
                    for (var index = 2; index < nameArray.length; index++) {
                        var element = nameArray[index];
                        path += '/' + element;
                    }
                    app[nameArray[0].toLowerCase()](path, reject(prototype[httpFuncName]));
                    console.log(`http接口发布: ${nameArray[0]} -> ${path}`);
                }
            });
        }
    }
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
    static sendJSONData(response, error, data) {
        let obj = {};
        obj.code = error.code;
        obj.msg = YSError_1.YSPurifyMessage(error);
        if (data) {
            obj.data = data;
        }
        console.info(response.req.url + ' 返回数据包:' + JSON.stringify(obj));
        response.set('Content-Type', 'application/json');
        response.send(obj);
    }
}
exports.YSHttpHandle = YSHttpHandle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNIdHRwSGFuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL1lTSHR0cEhhbmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7K0VBTStFO0FBQy9FLHVDQUFzRTtBQUV0RSxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2pEOzs7Ozs7Ozs7OztHQVdHO0FBRUYsZ0JBQWdCLElBQWM7SUFFM0IsTUFBTSxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ3RCLElBQUksT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3RDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLElBQUksV0FBVyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDcEMsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVGO0lBRUksWUFBWSxNQUFjO1FBRDFCLFdBQU0sR0FBRyxFQUFFLENBQUE7UUFFUCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxNQUFNLG9CQUFvQixDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELGdCQUFnQjtRQUNoQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDOUIsQ0FBQztJQUNMLENBQUM7SUFHRDs7Ozs7Ozs7O09BU0c7SUFDSSxNQUFNLENBQUMsR0FBUTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDREQUE0RCxDQUFDLENBQUE7UUFDekUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVk7Z0JBQ3RELElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ3JDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO3dCQUNwRCxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQy9CLElBQUksSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFBO29CQUN6QixDQUFDO29CQUNELEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFFdkQsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFHRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDRyxNQUFNLENBQUMsWUFBWSxDQUFFLFFBQVEsRUFBRSxLQUFrQixFQUFFLElBQUk7UUFDekQsSUFBSSxHQUFHLEdBQU8sRUFBRSxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxHQUFHLHlCQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtRQUNoRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FFSjtBQXhFRCxvQ0F3RUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qKiDlsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKVxuKiogYXV0aDogbGl1a2FpXG4qKiBkYXRlOiAyMDE3LzdcbioqIHZlciA6IDEuMFxuKiogZGVzYzogIOWfuuS6jmV4cHJlc3PmoYbmnrbvvIzlj5HluINodHRw5o6l5Y+jXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5pbXBvcnQgeyBZU0Vycm9yVHlwZSwgWVNFcnJvclRhYmVsLCBZU1B1cmlmeU1lc3NhZ2UgfSBmcm9tIFwiLi9ZU0Vycm9yXCJcblxubGV0IGh0dHBNZXRob2QgPSBbJ3Bvc3QnLCAnZ2V0JywgJ2RlbGV0ZScsICdBTEwnXVxuLyoqXG4gKiBodHRw5Y+R5biD77yMIOWPkeW4g+WHveaVsOWQjeagvOW8jyB7TWV0aG9kfV97RnVuY3Rpb25OYW1lfeeahOaWueazlSBcbiAqIOWFtuS4rTogTWV0aG9k5pivIGh0dHDor7fmsYLnmoTmlrnms5VcbiAqIEZ1bmN0aW9uTmFtZeaYr+aWueazleeahOi3r+W+hO+8jOacgOe7iOi3r+W+hD0gcHJlZml4L0Z1bmN0aW9uTmFtZSwgIEZ1bmN0aW9uTmFtZeS4jeiDveWMheWQqydfJ+espuWQiO+8jOS+i+WmgnBvc3RfdGVhaGNlcl9hZGTmmK/pnZ7ms5Xlkb3lkI3vvIzkuI3kvJrmnIDnu4jlt7JodHRw5o6l5Y+j5Y+R5biDXG4gKiAx44CB5L6L5aaC5Ye95pWwcG9zdF90ZWFjaGVyKCkg5YiZ5pyA57uI5Y+R5biD55qEaHR0cOaOpeWPo+aYryBwb3N0IC9wcmVmaXgvdGVhY2hlclxuICogMuOAgeWHveaVsOWQjeS5n+WPr+S7peWPquaYryBodHRw6K+35rGC55qE5pa55rOV5ZCN44CC5L6L5aaCXG4gKiDlh73mlbDlkI1nZXQoKe+8jOWImeacgOe7iOWPkeW4g+eahGh0dHDmjqXlj6PmmK8gZ2V0IC9wcmVmaXhcbiAqIFxuICogQGV4cG9ydFxuICogQGFic3RyYWN0XG4gKiBAY2xhc3MgWVNIdHRwSGFuZGxlXG4gKi9cblxuIGZ1bmN0aW9uIHJlamVjdChmdW5jOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBcbiAgICByZXR1cm4gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gYOaUtuWIsOivt+axgiR7cmVxLm9yaWdpbmFsVXJsfWBcbiAgICAgICAgICAgIGlmKHJlcS5ib2R5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlICs9IGDmlbDmja7kvZM6IFxcbiAke3JlcS5ib2R5fWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gICAgICAgICAgICBmdW5jKHJlcSwgcmVzLCBuZXh0KVxuICAgIH1cbiB9XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBZU0h0dHBIYW5kbGUge1xuICAgIHByZWZpeCA9IFwiXCJcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXg6IHN0cmluZykge1xuICAgICAgICBpZiAoIXByZWZpeC5oYXNQcmVmaXgoJy8nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ByZWZpeH0g77yacGF0aCBpcyBpbnZhbGlkLmApO1xuICAgICAgICB9XG4gICAgICAgIC8v56Gu5L+dcHJlZml4ICcvJ+e7k+WwvlxuICAgICAgICBpZiAocHJlZml4Lmhhc1N1ZmZpeCgnLycpKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXggKyAnLydcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqIGFwcCA9IGV4cHJlc3MoKVxuICAgICAqIGh0dHDlj5HluIPvvIwg5Y+R5biD5Ye95pWw5ZCN5qC85byPIHtNZXRob2R9X3tGdW5jdGlvbk5hbWV955qE5pa55rOVIFxuICAgICAqIOWFtuS4rTogTWV0aG9k5pivIGh0dHDor7fmsYLnmoTmlrnms5VcbiAgICAgKiBGdW5jdGlvbk5hbWXmmK/mlrnms5XnmoTot6/lvoTvvIzmnIDnu4jot6/lvoQ9IHByZWZpeC9GdW5jdGlvbk5hbWUsICBGdW5jdGlvbk5hbWXlj6/ku6XljIXlkKsnXyfnrKblkIjvvIzkvovlpoJwb3N0X3RlYWhjZXJfYWRkXG4gICAgICogMeOAgeS+i+WmguWHveaVsHBvc3RfdGVhY2hlcigpIOWImeacgOe7iOWPkeW4g+eahGh0dHDmjqXlj6PmmK8gcG9zdCAvcHJlZml4L3RlYWNoZXLvvIwg5aaC5p6c5Ye95pWw5ZCN5Li6cG9zdF90ZWFjaGVyX2FkZO+8jOWImeacgOe7iOWPkeW4g+aOpeWPo+aYry9wcmVmaXgvdGVhY2hlci9hZGRcbiAgICAgKiAy44CB5Ye95pWw5ZCN5LiN6IO95Y+q5pivIGh0dHDor7fmsYLnmoTmlrnms5XlkI3jgILkvovlpoJcbiAgICAgKiDlh73mlbDlkI1nZXQoKe+8jOivpeWHveaVsOS4jeS8muWPkeW4g1xuICAgICAqIFxuICAgICogQHBhcmFtIGFwcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNoKGFwcDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGA9PT09PT09PT09PT09PT7lsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKTw9PT09PT09PT09PT09PT09YClcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcylcbiAgICAgICAgaWYgKHByb3RvdHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpLmZvckVhY2goaHR0cEZ1bmNOYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFycmF5ID0gaHR0cEZ1bmNOYW1lLnNwbGl0KCdfJylcbiAgICAgICAgICAgICAgICBpZiAobmFtZUFycmF5Lmxlbmd0aCA+PSAyICYmIGh0dHBNZXRob2QuaW5kZXhPZihuYW1lQXJyYXlbMF0udG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHNlbGYucHJlZml4ICsgbmFtZUFycmF5WzFdXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMjsgaW5kZXggPCBuYW1lQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IG5hbWVBcnJheVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoICs9ICcvJyArIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcHBbbmFtZUFycmF5WzBdLnRvTG93ZXJDYXNlKCldKHBhdGgsIHJlamVjdChwcm90b3R5cGVbaHR0cEZ1bmNOYW1lXSkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBodHRw5o6l5Y+j5Y+R5biDOiAke25hbWVBcnJheVswXX0gLT4gJHtwYXRofWApXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOi/lOWbnkpTT07moLzlvI/mlbDmja7liLDlrqLmiLfnq69cbiAgICAgKiB7XG4gICAgICogICBjb2RlIDogMCxcbiAgICAgKiAgIG1zZyAgOiAn5pON5L2c5oiQ5YqfJyxcbiAgICAgKiAgIGRhdGEgOiBhbnkgXG4gICAgICogfVxuICAgICAqIEBwYXJhbSB7YW55fSByZXNwb25zZSBcbiAgICAgKiBAcGFyYW0ge2FueX0gZXJyY29kZSBcbiAgICAgKiBAcGFyYW0ge2FueX0gbXNnIFxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhIFxuICAgICAqIEBtZW1iZXJvZiBZU0h0dHBIYW5kbGVcbiAgICAgKi9cbiAgIHB1YmxpYyBzdGF0aWMgc2VuZEpTT05EYXRhIChyZXNwb25zZSwgZXJyb3I6IFlTRXJyb3JUeXBlLCBkYXRhKSB7XG4gICAgICAgIGxldCBvYmo6YW55ID0ge307XG4gICAgICAgIG9iai5jb2RlID0gZXJyb3IuY29kZTtcbiAgICAgICAgb2JqLm1zZyA9IFlTUHVyaWZ5TWVzc2FnZShlcnJvcik7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5pbmZvKHJlc3BvbnNlLnJlcS51cmwgKyAnIOi/lOWbnuaVsOaNruWMhTonICsgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIHJlc3BvbnNlLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgICAgICByZXNwb25zZS5zZW5kKG9iaik7XG4gICAgfVxuXG59XG4iXX0=