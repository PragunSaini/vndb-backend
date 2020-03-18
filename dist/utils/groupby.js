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
