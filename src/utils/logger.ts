// Custom implementation for modified console printing and logging
import { Color, colorLog } from './colors'

function query(text: string, start: number, end: number): void {
  console.log()
  colorLog(Color.FgYellow, `${new Date(start).toString()}`)
  colorLog(Color.FgYellow, `Query: ${text}`)
  colorLog(Color.FgYellow, `Time taken: ${end - start} ms`)
  console.log()
}

function error(...text: any[]): void {
  colorLog(Color.FgRed, ...text)
}

function log(...text: any[]): void {
  colorLog(Color.FgGreen, ...text)
}

function info(...text: any[]): void {
  colorLog(Color.FgCyan, ...text)
}

export const Console = {
  query: query,
  error: error,
  log: log,
  info: info,
}
