// Custom implementation for modified console printing and logging
import { Color, colorLog } from './colors'

/**
 * Logs a database query
 * @param text Query text
 * @param start Query initiation timestamp
 * @param end Query completed timestamp
 */
function query(text: string, start: number, end: number): void {
  console.log()
  colorLog(Color.FgYellow, `${new Date(start).toString()}`)
  colorLog(Color.FgYellow, `Query: ${text}`)
  colorLog(Color.FgYellow, `Time taken: ${end - start} ms`)
  console.log()
}

/**
 * Logs error messages
 * @param text error to be logged
 */
function error(...text: any[]): void {
  colorLog(Color.FgRed, ...text)
}

/**
 * Logs general messages
 * @param text message to be logged
 */
function log(...text: any[]): void {
  colorLog(Color.FgGreen, ...text)
}

/**
 * Logs information
 * @param text information to be logged
 */
function info(...text: any[]): void {
  colorLog(Color.FgCyan, ...text)
}

export const logger = {
  query: query,
  error: error,
  log: log,
  info: info,
}
