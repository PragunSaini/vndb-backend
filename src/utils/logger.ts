// Custom implementation for modified console printing and debugging
import { Color, colorString } from './colors'
import { config } from './config'

/**
 * Logs a database query
 * @param text Query text
 * @param start Query initiation timestamp
 * @param end Query completed timestamp
 */
function query(text: string, start: number, end: number): void {
  if (config.NODE_ENV == 'development') {
    console.log()
    console.log(colorString(Color.FgYellow, `${new Date(start).toString()}`))
    console.log(colorString(Color.FgYellow, `Query: ${text}`))
    console.log(colorString(Color.FgYellow, `Time taken: ${end - start} ms`))
    console.log()
  }
}

/**
 * Logs error messages
 * @param text error to be logged
 */
function error(...text: any[]): void {
  if (config.NODE_ENV == 'development' || config.NODE_ENV == 'testing') {
    console.error(colorString(Color.FgRed, ...text))
  }
}

/**
 * Logs general messages
 * @param text message to be logged
 */
function log(...text: any[]): void {
  if (config.NODE_ENV == 'development') {
    console.log(colorString(Color.FgGreen, ...text))
  }
}

/**
 * Logs information
 * @param text information to be logged
 */
function info(...text: any[]): void {
  if (config.NODE_ENV == 'development') {
    console.info(colorString(Color.FgCyan, ...text))
  }
}

export const logger = {
  query: query,
  error: error,
  log: log,
  info: info,
}
