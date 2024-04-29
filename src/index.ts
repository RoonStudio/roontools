#!/usr/bin/env node
import { createCommand } from "commander";
import { description, version, name } from "../package.json";
import icon from "@/commands/icon";
import figlet from "figlet";
import { cprint } from "./utils/color";

function main() {
  // Command setup
  const program = createCommand(name);

  program
    .version(version)
    .description(description)
    .showHelpAfterError("(add --help for additional information)");

  /**
   * Command register
   * @see https://github.com/tj/commander.js
   */
  program
    .command("icon")
    .description("Get icons from iconify directly into your project")
    .action(icon);

  program.parse();
}

console.log("");

figlet.text(
  name,
  {
    font: "ANSI Regular",
    horizontalLayout: "default",
    verticalLayout: "default",
    // width: 80,
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      cprint("Error", "red", "bold");
      console.dir(err);
      return;
    }
    console.log(data);

    main();
  }
);
