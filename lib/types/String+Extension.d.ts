declare var _default: {};
export default _default;
declare global  {
    interface String {
        hasPrefix(str: String): boolean;
        hasSuffix(suffix: String): boolean;
    }
}
export {};
