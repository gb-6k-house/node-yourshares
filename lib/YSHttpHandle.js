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
                    app[nameArray[0].toLowerCase()](path, prototype[httpFuncName]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNIdHRwSGFuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1lTSHR0cEhhbmRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7K0VBTStFO0FBQy9FLHVDQUFzRTtBQUV0RSxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ2pEOzs7Ozs7Ozs7OztHQVdHO0FBR0g7SUFFSSxZQUFZLE1BQWM7UUFEMUIsV0FBTSxHQUFHLEVBQUUsQ0FBQTtRQUVQLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLE1BQU0sb0JBQW9CLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0QsZ0JBQWdCO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUdEOzs7Ozs7Ozs7T0FTRztJQUNJLE1BQU0sQ0FBQyxHQUFRO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNERBQTRELENBQUMsQ0FBQTtRQUN6RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWTtnQkFDdEQsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7d0JBQ3BELElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUE7b0JBQ3pCLENBQUM7b0JBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtvQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBO2dCQUV2RCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQUdEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNHLE1BQU0sQ0FBQyxZQUFZLENBQUUsUUFBUSxFQUFFLEtBQWtCLEVBQUUsSUFBSTtRQUN6RCxJQUFJLEdBQUcsR0FBTyxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLEdBQUcseUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1AsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRSxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2hELFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUVKO0FBeEVELG9DQXdFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pXG4qKiBhdXRoOiBsaXVrYWlcbioqIGRhdGU6IDIwMTcvN1xuKiogdmVyIDogMS4wXG4qKiBkZXNjOiAg5Z+65LqOZXhwcmVzc+ahhuaetu+8jOWPkeW4g2h0dHDmjqXlj6NcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmltcG9ydCB7IFlTRXJyb3JUeXBlLCBZU0Vycm9yVGFiZWwsIFlTUHVyaWZ5TWVzc2FnZSB9IGZyb20gXCIuL1lTRXJyb3JcIlxuXG5sZXQgaHR0cE1ldGhvZCA9IFsncG9zdCcsICdnZXQnLCAnZGVsZXRlJywgJ0FMTCddXG4vKipcbiAqIGh0dHDlj5HluIPvvIwg5Y+R5biD5Ye95pWw5ZCN5qC85byPIHtNZXRob2R9X3tGdW5jdGlvbk5hbWV955qE5pa55rOVIFxuICog5YW25LitOiBNZXRob2TmmK8gaHR0cOivt+axgueahOaWueazlVxuICogRnVuY3Rpb25OYW1l5piv5pa55rOV55qE6Lev5b6E77yM5pyA57uI6Lev5b6EPSBwcmVmaXgvRnVuY3Rpb25OYW1lLCAgRnVuY3Rpb25OYW1l5LiN6IO95YyF5ZCrJ18n56ym5ZCI77yM5L6L5aaCcG9zdF90ZWFoY2VyX2FkZOaYr+mdnuazleWRveWQje+8jOS4jeS8muacgOe7iOW3smh0dHDmjqXlj6Plj5HluINcbiAqIDHjgIHkvovlpoLlh73mlbBwb3N0X3RlYWNoZXIoKSDliJnmnIDnu4jlj5HluIPnmoRodHRw5o6l5Y+j5pivIHBvc3QgL3ByZWZpeC90ZWFjaGVyXG4gKiAy44CB5Ye95pWw5ZCN5Lmf5Y+v5Lul5Y+q5pivIGh0dHDor7fmsYLnmoTmlrnms5XlkI3jgILkvovlpoJcbiAqIOWHveaVsOWQjWdldCgp77yM5YiZ5pyA57uI5Y+R5biD55qEaHR0cOaOpeWPo+aYryBnZXQgL3ByZWZpeFxuICogXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBZU0h0dHBIYW5kbGVcbiAqL1xuXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBZU0h0dHBIYW5kbGUge1xuICAgIHByZWZpeCA9IFwiXCJcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXg6IHN0cmluZykge1xuICAgICAgICBpZiAoIXByZWZpeC5oYXNQcmVmaXgoJy8nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3ByZWZpeH0g77yacGF0aCBpcyBpbnZhbGlkLmApO1xuICAgICAgICB9XG4gICAgICAgIC8v56Gu5L+dcHJlZml4ICcvJ+e7k+WwvlxuICAgICAgICBpZiAocHJlZml4Lmhhc1N1ZmZpeCgnLycpKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXggKyAnLydcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqIGFwcCA9IGV4cHJlc3MoKVxuICAgICAqIGh0dHDlj5HluIPvvIwg5Y+R5biD5Ye95pWw5ZCN5qC85byPIHtNZXRob2R9X3tGdW5jdGlvbk5hbWV955qE5pa55rOVIFxuICAgICAqIOWFtuS4rTogTWV0aG9k5pivIGh0dHDor7fmsYLnmoTmlrnms5VcbiAgICAgKiBGdW5jdGlvbk5hbWXmmK/mlrnms5XnmoTot6/lvoTvvIzmnIDnu4jot6/lvoQ9IHByZWZpeC9GdW5jdGlvbk5hbWUsICBGdW5jdGlvbk5hbWXlj6/ku6XljIXlkKsnXyfnrKblkIjvvIzkvovlpoJwb3N0X3RlYWhjZXJfYWRkXG4gICAgICogMeOAgeS+i+WmguWHveaVsHBvc3RfdGVhY2hlcigpIOWImeacgOe7iOWPkeW4g+eahGh0dHDmjqXlj6PmmK8gcG9zdCAvcHJlZml4L3RlYWNoZXLvvIwg5aaC5p6c5Ye95pWw5ZCN5Li6cG9zdF90ZWFjaGVyX2FkZO+8jOWImeacgOe7iOWPkeW4g+aOpeWPo+aYry9wcmVmaXgvdGVhY2hlci9hZGRcbiAgICAgKiAy44CB5Ye95pWw5ZCN5LiN6IO95Y+q5pivIGh0dHDor7fmsYLnmoTmlrnms5XlkI3jgILkvovlpoJcbiAgICAgKiDlh73mlbDlkI1nZXQoKe+8jOivpeWHveaVsOS4jeS8muWPkeW4g1xuICAgICAqIFxuICAgICogQHBhcmFtIGFwcCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXR0YWNoKGFwcDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGA9PT09PT09PT09PT09PT7lsKflsJrkv6Hmga/np5HmioAod3d3dy55b3Vyc2hhcmVzLmNuKTw9PT09PT09PT09PT09PT09YClcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcylcbiAgICAgICAgaWYgKHByb3RvdHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90b3R5cGUpLmZvckVhY2goaHR0cEZ1bmNOYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUFycmF5ID0gaHR0cEZ1bmNOYW1lLnNwbGl0KCdfJylcbiAgICAgICAgICAgICAgICBpZiAobmFtZUFycmF5Lmxlbmd0aCA+PSAyICYmIGh0dHBNZXRob2QuaW5kZXhPZihuYW1lQXJyYXlbMF0udG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IHNlbGYucHJlZml4ICsgbmFtZUFycmF5WzFdXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMjsgaW5kZXggPCBuYW1lQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IG5hbWVBcnJheVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoICs9ICcvJyArIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcHBbbmFtZUFycmF5WzBdLnRvTG93ZXJDYXNlKCldKHBhdGgsIHByb3RvdHlwZVtodHRwRnVuY05hbWVdKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgaHR0cOaOpeWPo+WPkeW4gzogJHtuYW1lQXJyYXlbMF19IC0+ICR7cGF0aH1gKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDov5Tlm55KU09O5qC85byP5pWw5o2u5Yiw5a6i5oi356uvXG4gICAgICoge1xuICAgICAqICAgY29kZSA6IDAsXG4gICAgICogICBtc2cgIDogJ+aTjeS9nOaIkOWKnycsXG4gICAgICogICBkYXRhIDogYW55IFxuICAgICAqIH1cbiAgICAgKiBAcGFyYW0ge2FueX0gcmVzcG9uc2UgXG4gICAgICogQHBhcmFtIHthbnl9IGVycmNvZGUgXG4gICAgICogQHBhcmFtIHthbnl9IG1zZyBcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YSBcbiAgICAgKiBAbWVtYmVyb2YgWVNIdHRwSGFuZGxlXG4gICAgICovXG4gICBwdWJsaWMgc3RhdGljIHNlbmRKU09ORGF0YSAocmVzcG9uc2UsIGVycm9yOiBZU0Vycm9yVHlwZSwgZGF0YSkge1xuICAgICAgICBsZXQgb2JqOmFueSA9IHt9O1xuICAgICAgICBvYmouY29kZSA9IGVycm9yLmNvZGU7XG4gICAgICAgIG9iai5tc2cgPSBZU1B1cmlmeU1lc3NhZ2UoZXJyb3IpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgb2JqLmRhdGEgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuaW5mbyhyZXNwb25zZS5yZXEudXJsICsgJyDov5Tlm57mlbDmja7ljIU6JyArIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICByZXNwb25zZS5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJylcbiAgICAgICAgcmVzcG9uc2Uuc2VuZChvYmopO1xuICAgIH1cblxufVxuIl19