/**
 * Color/Style Presets
 */
export const Color = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
}

/**
 * Returns a styled string made of given values and color/style presets
 * @param color A single/array of Color/Style Presets
 * @param string Array of values to be printed
 */
export function colorString(color: string | string[], ...string: any[]): string {
  return `${typeof color == 'string' ? color : color.join(' ')}${string.join(' ')}${Color.Reset}`
}

/**
 * Styles and prints the given values to the console and resets the console
 * @param color A single/array of Color/Style Presets
 * @param string Array of values to be printed
 */
export function colorLog(color: string | string[], ...string: any[]): void {
  console.log(colorString(color, ...string))
}
