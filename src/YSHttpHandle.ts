/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  基于express框架，发布http接口
******************************************************************************/
import { YSErrorType, YSErrorTabel, YSPurifyMessage } from "./YSError"

let httpMethod = ['post', 'get', 'delete', 'all']
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
 function reject(func: Function): Function {
    return function(req, res, next) {
            // let message = `收到请求-> ${req.originalUrl}`
            // if(req.body != null) {
            //     message +=  (typeof req.body === 'object')? `数据体: \n ${JSON.stringify(req.body)}`:`数据体: \n ${req.body}`
            // }
            // console.log(message)
            func(req, res, next)
    }
 }

export abstract class YSHttpHandle {
    prefix = ""
    constructor(prefix: string) {
        if (!prefix.hasPrefix('/')) {
            throw new Error(`${prefix} ：path is invalid.`);
        }
        //确保prefix '/'结尾
        if (prefix.hasSuffix('/')) {
            this.prefix = prefix
        } else {
            this.prefix = prefix + '/'
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
    public attach(app: any) {
        console.log(`==============>尧尚信息科技(wwww.yourshares.cn)<================`)
        let self = this
        let prototype = Object.getPrototypeOf(this)
        if (prototype != null) {
            Object.getOwnPropertyNames(prototype).forEach(httpFuncName => {
                let nameArray = httpFuncName.split('_')
                if (nameArray.length >= 2 && httpMethod.indexOf(nameArray[0].toLowerCase()) >= 0) {
                    let path = self.prefix + nameArray[1]
                    for (var index = 2; index < nameArray.length; index++) {
                        var element = nameArray[index];
                        path += '/' + element
                    }
                    app[nameArray[0].toLowerCase()](path, prototype[httpFuncName])
                    console.log(`http接口发布: ${nameArray[0]} -> ${path}`)
                    
                }
            })
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
   public static sendJSONData (response, error: YSErrorType, data?: any) {
        let obj:any = {};
        obj.code = error.code;
        obj.msg = YSPurifyMessage(error);
        if (data != null) {
            obj.data = data;
        }
        console.info(response.req.originalUrl + ' 返回数据包:' + JSON.stringify(obj));
        response.set('Content-Type', 'application/json')
        response.send(obj);
    }

}
