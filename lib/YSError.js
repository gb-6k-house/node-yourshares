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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVNFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ZU0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OytFQU0rRTs7QUFVL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSDtDQUVDO0FBRkQsb0NBRUM7QUFDRCx5QkFBZ0MsS0FBaUIsRUFBRSxJQUFZO0lBQzNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBO0lBQ3pCLENBQUM7SUFBQSxJQUFJLENBQUEsQ0FBQztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEYsQ0FBQztBQUNMLENBQUM7QUFORCwwQ0FNQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy83XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICDor7TmmI5cbioqIENvcHlyaWdodCDCqSAyMDE35bm0IOWwp+WwmuS/oeaBr+enkeaKgCh3d3d3LnlvdXJzaGFyZXMuY24pLiBBbGwgcmlnaHRzIHJlc2VydmVkXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmV4cG9ydCBpbnRlcmZhY2UgWVNFcnJvclR5cGUge1xuICAgIG1lc3NhZ2VzOiB7XG4gICAgICAgICd6aC1DTic6IHN0cmluZyxcbiAgICAgICAgJ2VuLVVTJz86IHN0cmluZ1xuICAgIH18U3RyaW5nLFxuICAgIGNvZGU6IG51bWJlcixcbiAgICBsb2NhbGU/OiBzdHJpbmcsXG59XG4vKipcbiAqIOmUmeivr+WumuS5iSDkvovlpoJcbiAqICBcbiAqIGNsYXNzIE15RXJyb3IxIGV4dGVuZHMgWVNFcnJvclRhYmVse1xuICAgIHN1Y2Vzc2UgPSB7XG4gICAgICAgIG1lc3NhZ2VzIDoge1xuICAgICAgICAgICAgJ3poLUNOJzogJ+aIkOWKnycsXG4gICAgICAgICAgICAnZW4tVVMnOiAn5aSx6LSlJ1xuICAgICAgICB9LFxuICAgICAgICBjb2RlIDogMCxcbiAgICAgICAgbG9jYWxlIDogJ3poLUNOJ1xuICAgIH1cbn0g5oiW6ICFIFxuY2xhc3MgTXlFcnJvcjIgZXh0ZW5kcyBZU0Vycm9yVGFiZWx7XG4gICAgc3VjZXNzZSA9IHtcbiAgICAgICAgbWVzc2FnZXMgOiAn5oiQ5YqfJyxcbiAgICAgICAgY29kZSA6IDAsXG4gICAgfVxufVxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgWVNFcnJvclRhYmVsXG4gKi9cbmV4cG9ydCBjbGFzcyBZU0Vycm9yVGFiZWx7XG4gICAgW2ZpZWxkOiBzdHJpbmddOllTRXJyb3JUeXBlXG59XG5leHBvcnQgZnVuY3Rpb24gWVNQdXJpZnlNZXNzYWdlKGVycm9yOllTRXJyb3JUeXBlLCBpMThuPzpzdHJpbmcpOnN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlcyA9PT0gJ3N0cmluZycpe1xuICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZXNcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2VzW2kxOG4gfHwgZXJyb3IubG9jYWxlXSB8fCBlcnJvci5tZXNzYWdlc1tlcnJvci5sb2NhbGVdO1xuICAgIH1cbn1cbiJdfQ==