declare type ValueOf<T> = T[keyof T];
/**
 * Groups together objects in an array based on one or more properties
 * @param array Array of objects to be grouped
 * @param keyFunc function that returns the values to group the objects by, in an array
 */
export declare function groupBy<T, V extends ValueOf<T>>(array: T[], keyFunc: (obj: T) => V[]): T[][];
export {};
