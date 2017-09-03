/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明

******************************************************************************/
//扩展String 需要先声明String为内部模块，不然无法编译， 参照https://basarat.gitbooks.io/typescript/content/docs/types/lib.d.ts.html
// Ensure this is treated as a module
export default {}
declare global {
  interface String {
    hasPrefix(str: String): boolean
    hasSuffix(suffix: String): boolean
  }
}

String.prototype.hasSuffix = function (suffix: string): boolean {
  var str: string = this;
  return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}
String.prototype.hasPrefix = function (prefix: string) {
  var str: string = this;
  return str.slice(0, prefix.length) == prefix;
}


