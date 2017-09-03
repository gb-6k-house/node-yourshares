/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  基于express框架，发布http接口
******************************************************************************/
import { YSErrorType } from "./YSError";
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
export declare abstract class YSHttpHandle {
    prefix: string;
    constructor(prefix: string);
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
    attach(app: any): void;
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
    static sendJSONData(response: any, error: YSErrorType, data: any): void;
}
