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

// Certain keys are arrays and rest original value types
type ArrayOrValue<T, K extends keyof T> = {
  [V in keyof T]: V extends K ? T[V][] : T[V]
}

/**
 * Combines the objects by a unique id, where the common properties are combined in an array
 * @param array array of objects to combine
 * @param id the unique key to combine the objects by
 * @param keys the keys of properties that will be combined
 * @returns array of unique objects, with properties combined
 */
export function combineBy<T, K extends keyof T, U extends (keyof T)[]>(
  array: T[],
  id: K,
  ...keys: U
): ArrayOrValue<T, U[number]>[] {
  // Form a combined object where the value of id serves as the key
  const combined = array.reduce((hashmap: any, obj: T) => {
    if (hashmap[JSON.stringify(obj[id])]) {
      keys.forEach(key => {
        if (obj[key] != undefined) {
          hashmap[JSON.stringify(obj[id])][key].add(obj[key])
        }
      })
    } else {
      hashmap[JSON.stringify(obj[id])] = obj
      keys.forEach(key => {
        if (hashmap[JSON.stringify(obj[id])][key] != undefined) {
          const temp = hashmap[JSON.stringify(obj[id])][key]
          hashmap[JSON.stringify(obj[id])][key] = new Set()
          hashmap[JSON.stringify(obj[id])][key].add(temp)
        } else {
          hashmap[JSON.stringify(obj[id])][key] = new Set()
        }
      })
    }
    return hashmap
  }, {} as any)

  return Object.keys(combined).map(k => {
    keys.forEach(key => {
      combined[k][key] = [...combined[k][key]]
    })
    return combined[k]
  })
}

/**
 * Combines the objects by a unique id, where the common properties are combined in an array
 * Same as @see [[combineBy]] but does not remove duplicates
 * @param array array of objects to combine
 * @param id the unique key to combine the objects by
 * @param keys the keys of properties that will be combined
 * @returns array of unique objects, with properties combined
 */
export function combineByAll<T, K extends keyof T, U extends (keyof T)[]>(
  array: T[],
  id: K,
  ...keys: U
): ArrayOrValue<T, U[number]>[] {
  // Form a combined object where the value of id serves as the key
  const combined = array.reduce((hashmap: any, obj: T) => {
    if (hashmap[JSON.stringify(obj[id])]) {
      keys.forEach(key => {
        if (obj[key] != undefined) {
          hashmap[JSON.stringify(obj[id])][key].push(obj[key])
        }
      })
    } else {
      hashmap[JSON.stringify(obj[id])] = obj
      keys.forEach(key => {
        if (hashmap[JSON.stringify(obj[id])][key] != undefined) {
          const temp = hashmap[JSON.stringify(obj[id])][key]
          hashmap[JSON.stringify(obj[id])][key] = [temp]
        } else {
          hashmap[JSON.stringify(obj[id])][key] = []
        }
      })
    }
    return hashmap
  }, {} as any)

  return Object.keys(combined).map(k => {
    return combined[k]
  })
}
