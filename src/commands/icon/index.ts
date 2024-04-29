import { existsSync } from "fs";
import { cprint } from "@/utils/color";
import { searchIcons } from "./iconify";
import inquirer from "inquirer";

inquirer.registerPrompt("search-list", require("inquirer-search-list"));
/**
 * This an example, try to extend your own logic.
 */
export default async () => {
  if (!existsSync("./src/components/shared/icons")) {
    cprint("Icons folder not found", "red", "bold");
  }

  const icons = await searchIcons("test");

  inquirer
    .prompt([
      {
        type: "search-list",
        message: "Select icon",
        name: "icon",
        choices: icons,
      },
    ])
    .then((answers) => {
      console.log(answers);
    });
};
