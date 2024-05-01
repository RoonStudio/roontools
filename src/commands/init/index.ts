import { cprint } from "@/utils/color";
import { getConfig } from "@/utils/config";
import { writeFileSync } from "fs";
import inquirer from "inquirer";

export const CONFIG_FILE_NAME = ".roontools";

export default async function () {
  const config = getConfig();

  const { icons_directory, is_using_typescript } = await inquirer.prompt([
    {
      type: "input",
      name: "icons_directory",
      message: "Enter the directory where the icons are stored",
      default: config.icons_directory,
    },
    {
      type: "confirm",
      name: "is_using_typescript",
      message: "Are you using TypeScript?",
      default: config.components_extension === "tsx",
    },
  ]);

  config.icons_directory = icons_directory;
  config.components_extension = is_using_typescript ? "tsx" : "jsx";

  writeFileSync(CONFIG_FILE_NAME, JSON.stringify(config, null, 2));

  cprint("\nConfiguration saved successfully", "green", "bold");
}
