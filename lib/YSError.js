"use strict";
/******************************************************************************
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明
** Copyright © 2017年 尧尚信息科技(wwww.yourshares.cn). All rights reserved
******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
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
class YSErrorTabel {
}
exports.YSErrorTabel = YSErrorTabel;
function YSPurifyMessage(error, i18n) {
    if (typeof error.messages === 'string') {
        return error.messages;
    }
    else {
        return error.messages[i18n || error.locale] || error.messages[error.locale];
    }
}
exports.YSPurifyMessage = YSPurifyMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ZU0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OytFQU0rRTs7QUFVL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSDtDQUVDO0FBRkQsb0NBRUM7QUFDRCx5QkFBZ0MsS0FBaUIsRUFBRSxJQUFZO0lBQzNELElBQUksT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBQztRQUNuQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUE7S0FDeEI7U0FBSTtRQUNELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9FO0FBQ0wsQ0FBQztBQU5ELDBDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiogYXV0aDogbGl1a2FpXG4qKiBkYXRlOiAyMDE3LzdcbioqIHZlciA6IDEuMFxuKiogZGVzYzogIOivtOaYjlxuKiogQ29weXJpZ2h0IMKpIDIwMTflubQg5bCn5bCa5L+h5oGv56eR5oqAKHd3d3cueW91cnNoYXJlcy5jbikuIEFsbCByaWdodHMgcmVzZXJ2ZWRcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZXhwb3J0IGludGVyZmFjZSBZU0Vycm9yVHlwZSB7XG4gICAgbWVzc2FnZXM6IHtcbiAgICAgICAgJ3poLUNOJzogc3RyaW5nLFxuICAgICAgICAnZW4tVVMnPzogc3RyaW5nXG4gICAgfXxTdHJpbmcsXG4gICAgY29kZTogbnVtYmVyLFxuICAgIGxvY2FsZT86IHN0cmluZyxcbn1cbi8qKlxuICog6ZSZ6K+v5a6a5LmJIOS+i+WmglxuICogIFxuICogY2xhc3MgTXlFcnJvcjEgZXh0ZW5kcyBZU0Vycm9yVGFiZWx7XG4gICAgc3VjZXNzZSA9IHtcbiAgICAgICAgbWVzc2FnZXMgOiB7XG4gICAgICAgICAgICAnemgtQ04nOiAn5oiQ5YqfJyxcbiAgICAgICAgICAgICdlbi1VUyc6ICflpLHotKUnXG4gICAgICAgIH0sXG4gICAgICAgIGNvZGUgOiAwLFxuICAgICAgICBsb2NhbGUgOiAnemgtQ04nXG4gICAgfVxufSDmiJbogIUgXG5jbGFzcyBNeUVycm9yMiBleHRlbmRzIFlTRXJyb3JUYWJlbHtcbiAgICBzdWNlc3NlID0ge1xuICAgICAgICBtZXNzYWdlcyA6ICfmiJDlip8nLFxuICAgICAgICBjb2RlIDogMCxcbiAgICB9XG59XG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBZU0Vycm9yVGFiZWxcbiAqL1xuZXhwb3J0IGNsYXNzIFlTRXJyb3JUYWJlbHtcbiAgICBbZmllbGQ6IHN0cmluZ106WVNFcnJvclR5cGVcbn1cbmV4cG9ydCBmdW5jdGlvbiBZU1B1cmlmeU1lc3NhZ2UoZXJyb3I6WVNFcnJvclR5cGUsIGkxOG4/OnN0cmluZyk6c3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2VzID09PSAnc3RyaW5nJyl7XG4gICAgICAgIHJldHVybiBlcnJvci5tZXNzYWdlc1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZXNbaTE4biB8fCBlcnJvci5sb2NhbGVdIHx8IGVycm9yLm1lc3NhZ2VzW2Vycm9yLmxvY2FsZV07XG4gICAgfVxufVxuIl19