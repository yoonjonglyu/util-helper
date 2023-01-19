export declare const isArray: typeof import("./typecheck/isArray/isArray").default, isFunction: typeof import("./typecheck/isFunction/isFunction").default, isNumber: typeof import("./typecheck/isNumber/isNumber").default, isString: typeof import("./typecheck/isString/isString").default;
export declare const getQuery: typeof import("./querystring/getQuery/getQuery").default, setQuery: typeof import("./querystring/setQuery/setQuery").default;
export declare const addComma: typeof import("./format/addComma/addComma").default;
declare const UtilHelper: Readonly<{
    TypeCheck: Readonly<{
        isFunction: typeof import("./typecheck/isFunction/isFunction").default;
        isArray: typeof import("./typecheck/isArray/isArray").default;
        isString: typeof import("./typecheck/isString/isString").default;
        isNumber: typeof import("./typecheck/isNumber/isNumber").default;
    }>;
    QueryString: Readonly<{
        getQuery: typeof import("./querystring/getQuery/getQuery").default;
        setQuery: typeof import("./querystring/setQuery/setQuery").default;
    }>;
    Format: Readonly<{
        addComma: typeof import("./format/addComma/addComma").default;
    }>;
}>;
export default UtilHelper;
