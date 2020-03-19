// Gets the union type made up of an object T's value's types
type ValueOf<T> = T[keyof T]
type Rows<T> = { rows: T[] }
type Groups<T, K extends keyof T> = { [V in K]: T[V] } & Rows<T>

/**
 * Groups together objects in an array based on one or more properties
 * @param array Array of objects to be grouped
 * @param keyFunc Either a key of the objects to filter by or function that returns array of values to group the objects by
 */
export function groupBy<T, K extends keyof T>(array: T[], key: K): Groups<T, K>[]
export function groupBy<T, V extends ValueOf<T>>(array: T[], key: (obj: T) => V[]): T[][]
export function groupBy<T>(array: T[], key: any): any {
  // To hold the groups
  const groups: { [key: string]: any[] } = {}

  // For each group
  array.forEach((obj: any) => {
    // Get the key to group by
    const groupKey = typeof key == 'string' ? obj[key] : JSON.stringify(key(obj))

    groups[groupKey] = groups[groupKey] || []
    groups[groupKey].push(obj)
  })

  if (typeof key == 'function') {
    // Return the groups in an arrays
    return Object.keys(groups).map(groupKey => groups[groupKey])
  } else {
    // Return groups in arrays of objects
    return Object.keys(groups).map(groupKey => {
      return {
        [key]: groups[groupKey][0][key],
        rows: groups[groupKey],
      }
    })
  }
}
