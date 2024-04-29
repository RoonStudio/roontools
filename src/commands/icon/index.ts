import { existsSync, writeFileSync } from "fs";
import { cprint } from "@/utils/color";
import { getIcon, searchIcons } from "./iconify";
import inquirer from "inquirer";
import { HtmlToJSX, toComponentName } from "./utils";
import { prettierCode } from "@/utils/prettier";

inquirer.registerPrompt("search-list", require("inquirer-search-list"));

export default async (...args: any) => {
  if (!existsSync("./src/components/shared/icons")) {
    cprint("Icons folder not found", "red", "bold");
    process.exit(1);
  }

  const { searchTerm } = await inquirer.prompt([
    {
      type: "input",
      message: "Search term",
      name: "searchTerm",
    },
  ]);

  const icons = await searchIcons(searchTerm);

  const { icon_ref } = await inquirer.prompt([
    {
      type: "search-list",
      message: "Select icon",
      name: "icon_ref",
      choices: icons,
      transformer: (input, answers) => input + "1" + answers,
    },
  ]);

  const { icon_name } = await inquirer.prompt([
    {
      type: "input",
      message: "Icon name",
      name: "icon_name",
      default: toComponentName(icon_ref.split(":")[1]),
    },
  ]);

  const svg_icon = await getIcon(icon_ref);

  let icon = HtmlToJSX(svg_icon);

  icon = `import { SVGProps } from "react";

export default function ${icon_name}(props: SVGProps<SVGSVGElement>) {
  return ${icon}
}
`;

  icon = icon.replace(/<svg (.*?)>/, "<svg $1 {...props}>");

  try {
    icon = await prettierCode(icon, "babel-ts");
  } catch (error) {
    cprint("Error formatting icon", "red", "bold");
    process.exit(1);
  }

  const filename = `./src/components/shared/icons/${icon_name}.tsx`;

  if (existsSync(filename)) {
    const { prompt } = await inquirer.prompt([
      {
        type: "confirm",
        name: "prompt",
        message: "File already exists, overwrite?",
      },
    ]);

    if (!prompt) {
      process.exit(0);
    }
  }

  writeFileSync(filename, icon);

  cprint("Icon created", "green", "bold");
};
