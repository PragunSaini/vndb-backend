declare type keymap = (obj: any) => any[];
/**
 * Groups together objects in an array based on one or more properties
 * @param array Array of objects to be grouped
 * @param keyFunc function that returns the values to group the objects by, in an array
 */
export declare function groupBy(array: any[], keyFunc: keymap): any[];
export declare function ohyeah(): void;
export {};
