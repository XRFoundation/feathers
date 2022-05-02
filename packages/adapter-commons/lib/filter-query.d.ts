export declare const FILTERS: {
    $sort: (value: any) => any;
    $limit: (value: any, options: any) => any;
    $skip: (value: any) => number;
    $select: (value: any) => any;
};
export declare const OPERATORS: string[];
export declare function filterQuery(query: any, options?: any): {
    [key: string]: any;
};
