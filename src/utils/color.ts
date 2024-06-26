const colors = {
  // Foreground Colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  // Background Colors
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",

  // Reset
  reset: "\x1b[0m",
};

// styles
const styles = {
  bold: "\x1b[1m",
  underline: "\x1b[4m",
  inverted: "\x1b[7m",
};

export const cprint = (
  text: string,
  color: keyof typeof colors,
  style?: keyof typeof styles
) => {
  const styleCode = style ? styles[style] : "";
  const colorCode = colors[color] || "";

  console.log(styleCode + colorCode + text + colors.reset);
};
