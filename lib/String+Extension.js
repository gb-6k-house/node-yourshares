"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************
** 尧尚信息科技(wwww.yourshares.cn)
** auth: liukai
** date: 2017/7
** ver : 1.0
** desc:  说明

******************************************************************************/
//扩展String 需要先声明String为内部模块，不然无法编译， 参照https://basarat.gitbooks.io/typescript/content/docs/types/lib.d.ts.html
// Ensure this is treated as a module
exports.default = {};
String.prototype.hasSuffix = function (suffix) {
    var str = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
};
String.prototype.hasPrefix = function (prefix) {
    var str = this;
    return str.slice(0, prefix.length) == prefix;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nK0V4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TdHJpbmcrRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7K0VBTytFO0FBQy9FLDZHQUE2RztBQUM3RyxxQ0FBcUM7QUFDckMsa0JBQWUsRUFBRSxDQUFBO0FBUWpCLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsTUFBYztJQUNuRCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7SUFDdkIsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdkUsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsVUFBVSxNQUFjO0lBQ25ELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQztJQUN2QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUM7QUFDL0MsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiog5bCn5bCa5L+h5oGv56eR5oqAKHd3d3cueW91cnNoYXJlcy5jbilcbioqIGF1dGg6IGxpdWthaVxuKiogZGF0ZTogMjAxNy83XG4qKiB2ZXIgOiAxLjBcbioqIGRlc2M6ICDor7TmmI5cblxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLy/mianlsZVTdHJpbmcg6ZyA6KaB5YWI5aOw5piOU3RyaW5n5Li65YaF6YOo5qih5Z2X77yM5LiN54S25peg5rOV57yW6K+R77yMIOWPgueFp2h0dHBzOi8vYmFzYXJhdC5naXRib29rcy5pby90eXBlc2NyaXB0L2NvbnRlbnQvZG9jcy90eXBlcy9saWIuZC50cy5odG1sXG4vLyBFbnN1cmUgdGhpcyBpcyB0cmVhdGVkIGFzIGEgbW9kdWxlXG5leHBvcnQgZGVmYXVsdCB7fVxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgU3RyaW5nIHtcbiAgICBoYXNQcmVmaXgoc3RyOiBTdHJpbmcpOiBib29sZWFuXG4gICAgaGFzU3VmZml4KHN1ZmZpeDogU3RyaW5nKTogYm9vbGVhblxuICB9XG59XG5cblN0cmluZy5wcm90b3R5cGUuaGFzU3VmZml4ID0gZnVuY3Rpb24gKHN1ZmZpeDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHZhciBzdHI6IHN0cmluZyA9IHRoaXM7XG4gIHJldHVybiBzdHIgJiYgc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xufVxuU3RyaW5nLnByb3RvdHlwZS5oYXNQcmVmaXggPSBmdW5jdGlvbiAocHJlZml4OiBzdHJpbmcpIHtcbiAgdmFyIHN0cjogc3RyaW5nID0gdGhpcztcbiAgcmV0dXJuIHN0ci5zbGljZSgwLCBwcmVmaXgubGVuZ3RoKSA9PSBwcmVmaXg7XG59XG5cblxuIl19