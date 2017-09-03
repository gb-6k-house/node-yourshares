/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  基于sequelize ORM的简单封装
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
import * as Sequelize from 'sequelize';
/**
 * 表模型的管理类，负责表模型与数据库同步
 *
 * @export
 * @class YSDBManager
 */
export declare class YSDBManager {
    static readonly Instance: YSDBManager;
    tables: YSTable[];
    addTable(table: YSTable): number;
    /**
     * 同步模型到数据库
     *
     *
     * @memberof DBManager
     */
    sync(before: () => void): void;
}
/**
 * 数据库表模型定义基础的基类
 *
 */
export declare abstract class YSTable {
    model: Sequelize.Model<any, any>;
    protected constructor();
    /**
     * 创建  Sequelize.Model模型 例如
     *
     protected  newModel(): Sequelize.Model<any, any> {
        return Mysql.Instance.define('tUser', {
            userName: {
                type: Sequelize.STRING(20), //数据类型
            }
        })
     }
     *
     * @protected
     * @abstract
     * @memberof YSTable
     */
    protected abstract newModel(): Sequelize.Model<any, any>;
    /**
     * 连接数据库之后执行的操作
     *
     *
     * @memberof Table
     */
    afterAync(): void;
    /**
     *
     *同步数据之前，处理操作
     *
     *
     * @memberof Table
     */
    beforeAync(): void;
    static createModel(): Sequelize.Model<any, any>;
}
