/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/

export interface YSErrorType {
    messages: {
        'zh-CN': string,
        'en-US'?: string
    }|String,
    code: number,
    locale?: string,
}
/**
 * 错误定义 例如
 *  
 * class MyError1 extends YSErrorTabel{
    sucesse = {
        messages : {
            'zh-CN': '成功',
            'en-US': '失败'
        },
        code : 0,
        locale : 'zh-CN'
    }
} 或者 
class MyError2 extends YSErrorTabel{
    sucesse = {
        messages : '成功',
        code : 0,
    }
}
 * 
 * @export
 * @class YSErrorTabel
 */
export class YSErrorTabel{
    [field: string]:YSErrorType
}
export function YSPurifyMessage(error:YSErrorType, i18n?:string):string {
    if (typeof error.messages === 'string'){
        return error.messages
    }else{
        return error.messages[i18n || error.locale] || error.messages[error.locale];
    }
}
