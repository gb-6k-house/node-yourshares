"use strict";
/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  基于sequelize ORM的简单封装
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表模型的管理类，负责表模型与数据库同步
 *
 * @export
 * @class YSDBManager
 */
var YSDBManager = /** @class */ (function () {
    function YSDBManager() {
        this.tables = [];
    }
    YSDBManager.prototype.addTable = function (table) {
        var index = this.tables.indexOf(table);
        if (index >= 0) {
            return index;
        }
        else {
            return this.tables.push(table) - 1;
        }
    };
    /**
     * 同步模型到数据库
     *
     *
     * @memberof DBManager
     */
    YSDBManager.prototype.sync = function (before) {
        typeof before === 'function' && before();
        this.tables.forEach(function (element) {
            element.beforeAync();
            element.model.sync({ force: false }).then(function () {
                element.afterAync();
            });
        });
    };
    YSDBManager.Instance = new YSDBManager();
    return YSDBManager;
}());
exports.YSDBManager = YSDBManager;
/**
 * 数据库表模型定义基础的基类
 *
 */
var YSTable = /** @class */ (function () {
    function YSTable() {
    }
    /**
     * 连接数据库之后执行的操作
     *
     *
     * @memberof Table
     */
    YSTable.prototype.afterAync = function () {
        console.info("Table", "afterAync");
    };
    ;
    /**
     *
     *同步数据之前，处理操作
     *
     *
     * @memberof Table
     */
    YSTable.prototype.beforeAync = function () {
        console.info("Table ", "beforeAync");
    };
    YSTable.createModel = function () {
        var table = Object.create(this.prototype);
        table.model = table.newModel();
        YSDBManager.Instance.addTable(table);
        return table.model;
    };
    return YSTable;
}());
exports.YSTable = YSTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ZU1RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OytFQU0rRTs7QUFJL0U7Ozs7O0dBS0c7QUFDSDtJQUFBO1FBRUksV0FBTSxHQUFjLEVBQUUsQ0FBQTtJQXdCMUIsQ0FBQztJQXZCVSw4QkFBUSxHQUFmLFVBQWdCLEtBQWM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osT0FBTyxLQUFLLENBQUE7U0FDZjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDckM7SUFDTCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSwwQkFBSSxHQUFYLFVBQVksTUFBZTtRQUN2QixPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBeEJzQixvQkFBUSxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO0lBeUJyRSxrQkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLGtDQUFXO0FBOEJ4Qjs7O0dBR0c7QUFDSDtJQUVJO0lBQ0EsQ0FBQztJQWtCRDs7Ozs7T0FLRztJQUNJLDJCQUFTLEdBQWhCO1FBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUFBLENBQUM7SUFDRjs7Ozs7O09BTUc7SUFDSSw0QkFBVSxHQUFqQjtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFFYSxtQkFBVyxHQUF6QjtRQUNJLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzlCLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUN0QixDQUFDO0lBRUwsY0FBQztBQUFELENBQUMsQUFoREQsSUFnREM7QUFoRHFCLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiogYXV0aDogbGl1a2FpXG4qKiBkYXRlOiAyMDE3LzdcbioqIHZlciA6IDEuMFxuKiogZGVzYzogIOWfuuS6jnNlcXVlbGl6ZSBPUk3nmoTnroDljZXlsIHoo4VcbioqIENvcHlyaWdodCDCqSAyMDE35bm0IOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pLiBBbGwgcmlnaHRzIHJlc2VydmVkXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCAqIGFzIFNlcXVlbGl6ZSBmcm9tICdzZXF1ZWxpemUnO1xuXG4vKipcbiAqIOihqOaooeWei+eahOeuoeeQhuexu++8jOi0n+i0o+ihqOaooeWei+S4juaVsOaNruW6k+WQjOatpVxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgWVNEQk1hbmFnZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFlTREJNYW5hZ2VyIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEluc3RhbmNlOiBZU0RCTWFuYWdlciA9IG5ldyBZU0RCTWFuYWdlcigpO1xuICAgIHRhYmxlczogWVNUYWJsZVtdID0gW11cbiAgICBwdWJsaWMgYWRkVGFibGUodGFibGU6IFlTVGFibGUpOiBudW1iZXIge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnRhYmxlcy5pbmRleE9mKHRhYmxlKVxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWJsZXMucHVzaCh0YWJsZSkgLSAxXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCM5q2l5qih5Z6L5Yiw5pWw5o2u5bqTXG4gICAgICogXG4gICAgICogXG4gICAgICogQG1lbWJlcm9mIERCTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBzeW5jKGJlZm9yZTooKT0+dm9pZCkge1xuICAgICAgICB0eXBlb2YgYmVmb3JlID09PSAnZnVuY3Rpb24nICYmIGJlZm9yZSgpO1xuICAgICAgICB0aGlzLnRhYmxlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5iZWZvcmVBeW5jKClcbiAgICAgICAgICAgIGVsZW1lbnQubW9kZWwuc3luYyh7IGZvcmNlOiBmYWxzZSB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFmdGVyQXluYygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqXG4gKiDmlbDmja7lupPooajmqKHlnovlrprkuYnln7rnoYDnmoTln7rnsbtcbiAqIFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgWVNUYWJsZSB7XG4gICAgcHVibGljIG1vZGVsOiBTZXF1ZWxpemUuTW9kZWw8YW55LCBhbnk+O1xuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yib5bu6ICBTZXF1ZWxpemUuTW9kZWzmqKHlnosg5L6L5aaCXG4gICAgICogXG4gICAgIHByb3RlY3RlZCAgbmV3TW9kZWwoKTogU2VxdWVsaXplLk1vZGVsPGFueSwgYW55PiB7XG4gICAgICAgIHJldHVybiBNeXNxbC5JbnN0YW5jZS5kZWZpbmUoJ3RVc2VyJywge1xuICAgICAgICAgICAgdXNlck5hbWU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HKDIwKSwgLy/mlbDmja7nsbvlnotcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgfVxuICAgICAqIFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBAbWVtYmVyb2YgWVNUYWJsZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBuZXdNb2RlbCgpOiBTZXF1ZWxpemUuTW9kZWw8YW55LCBhbnk+XG5cbiAgICAvKipcbiAgICAgKiDov57mjqXmlbDmja7lupPkuYvlkI7miafooYznmoTmk43kvZxcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyb2YgVGFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWZ0ZXJBeW5jKCkge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJUYWJsZVwiLCBcImFmdGVyQXluY1wiKVxuICAgIH07XG4gICAgLyoqXG4gICAgICogXG4gICAgICrlkIzmraXmlbDmja7kuYvliY3vvIzlpITnkIbmk43kvZxcbiAgICAgKiBcbiAgICAgKiBcbiAgICAgKiBAbWVtYmVyb2YgVGFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgYmVmb3JlQXluYygpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKFwiVGFibGUgXCIsIFwiYmVmb3JlQXluY1wiKVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlTW9kZWwoKTogU2VxdWVsaXplLk1vZGVsPGFueSwgYW55PiB7XG4gICAgICAgIGxldCB0YWJsZSA9IE9iamVjdC5jcmVhdGUodGhpcy5wcm90b3R5cGUpO1xuICAgICAgICB0YWJsZS5tb2RlbCA9IHRhYmxlLm5ld01vZGVsKClcbiAgICAgICAgWVNEQk1hbmFnZXIuSW5zdGFuY2UuYWRkVGFibGUodGFibGUpO1xuICAgICAgICByZXR1cm4gdGFibGUubW9kZWxcbiAgICB9XG5cbn0iXX0=