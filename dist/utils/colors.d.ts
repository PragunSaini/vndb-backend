/**
 * Color/Style Presets
 */
export declare const Color: {
    Reset: string;
    Bright: string;
    Dim: string;
    Underscore: string;
    Blink: string;
    Reverse: string;
    Hidden: string;
    FgBlack: string;
    FgRed: string;
    FgGreen: string;
    FgYellow: string;
    FgBlue: string;
    FgMagenta: string;
    FgCyan: string;
    FgWhite: string;
    BgBlack: string;
    BgRed: string;
    BgGreen: string;
    BgYellow: string;
    BgBlue: string;
    BgMagenta: string;
    BgCyan: string;
    BgWhite: string;
};
/**
 * Returns a styled string made of given values and color/style presets
 * @param color A single/array of Color/Style Presets
 * @param string Array of values to be printed
 */
export declare function colorString(color: string | string[], ...string: any[]): string;
/**
 * Styles and prints the given values to the console and resets the console
 * @param color A single/array of Color/Style Presets
 * @param string Array of values to be printed
 */
export declare function colorLog(color: string | string[], ...string: any[]): void;
