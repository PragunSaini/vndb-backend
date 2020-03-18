"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Groups together objects in an array based on one or more properties
 * @param array Array of objects to be grouped
 * @param keyFunc function that returns the values to group the objects by, in an array
 */
function groupBy(array, keyFunc) {
    // To hold the groups
    const groups = {};
    // For each group
    array.forEach(obj => {
        // Get the unique key to group by
        const groupKey = JSON.stringify(keyFunc(obj));
        // and add to the group by that key
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(obj);
    });
    // Return the groups in an array
    return Object.keys(groups).map(groupKey => groups[groupKey]);
}
exports.groupBy = groupBy;
const objs = [
    { name: '1', lastname: 'foo1', age: '16' },
    { name: '2', lastname: 'foo', age: '13' },
    { name: '3', lastname: 'foo1', age: '11' },
    { name: '4', lastname: 'foo', age: '11' },
    { name: '5', lastname: 'foo1', age: '16' },
    { name: '6', lastname: 'foo', age: '16' },
    { name: '7', lastname: 'foo1', age: '13' },
    { name: '8', lastname: 'foo1', age: '16' },
    { name: '9', lastname: 'foo', age: '13' },
    { name: '0', lastname: 'foo', age: '16' },
];
function ohyeah() {
    console.log(groupBy(objs, ()));
}
exports.ohyeah = ohyeah;
