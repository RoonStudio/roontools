import { existsSync, writeFileSync } from "fs";
import { cprint } from "@/utils/color";
import { getIcon, searchIcons } from "./iconify";
import inquirer from "inquirer";
import { svgToReactComponent, toComponentName } from "./utils";
import { getConfig } from "@/utils/config";

inquirer.registerPrompt("search-list", require("inquirer-search-list"));

export default async () => {
  const config = getConfig();

  if (!existsSync(config.icons_directory)) {
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

  const icon = await svgToReactComponent(
    svg_icon,
    icon_name,
    config.components_extension === "tsx"
  );

  const filename = `${config.icons_directory}/${icon_name}.${config.components_extension}`;

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

  cprint("\nIcon created successfully!", "green", "bold");
};
