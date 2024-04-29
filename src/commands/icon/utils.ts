function transformToReactJSX(jsx: string) {
  const reactJSX = jsx.replace(/(class|(stroke-\w+)|(\w+:\w+))=/g, (i) => {
    if (i === "class=") return "className=";
    return i
      .split(/[\:\-]/)
      .map((i, idx) =>
        idx === 0
          ? i.toLowerCase()
          : i[0].toUpperCase() + i.slice(1).toLowerCase()
      )
      .join("");
  });
  return reactJSX;
}

export function HtmlToJSX(html: string, reactJSX = true) {
  const jsx = html.replace(/([\w-]+)=/g, (i) => {
    const words = i.split("-");
    if (words.length === 1 || words[0] === "stroke") return i;
    return words
      .map((i, idx) =>
        idx === 0
          ? i.toLowerCase()
          : i[0].toUpperCase() + i.slice(1).toLowerCase()
      )
      .join("");
  });
  return reactJSX ? transformToReactJSX(jsx) : jsx;
}

export function toComponentName(icon: string) {
  return icon
    .split(/:|-|_/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}
