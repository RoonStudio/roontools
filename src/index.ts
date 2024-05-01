#!/usr/bin/env node
import { Command, createCommand } from "commander";
import { description, version, name, bin } from "../package.json";
import icon from "@/commands/icon";
import figlet from "figlet";
import init, { CONFIG_FILE_NAME } from "./commands/init";
import { existsSync } from "fs";
import { cprint } from "./utils/color";

const APP_BANNER = "ROON TOOLS";

const BIN_NAME = Object.keys(bin)[0];

function main(_: any, banner: string) {
  console.log("\n" + banner);

  // Command setup
  const program = createCommand(name);

  const ensure_prequisites = (_: Command, command: Command) => {
    if (command.name() === "init") return;

    if (existsSync(CONFIG_FILE_NAME)) return;

    cprint(
      "No configuration file found. Default values will be applied.",
      "cyan",
      "bold"
    );
    cprint(
      `To create a configuration file, run '${BIN_NAME} init'.\n`,
      "cyan",
      "bold"
    );
  };

  program
    .version(version)
    .description(description)
    .hook("preAction", ensure_prequisites)
    .showHelpAfterError("(add --help for additional information)");

  program
    .command("icon")
    .description("Get icons from iconify directly into your project")
    .action(icon);

  program.command("init").description("Initialize config file").action(init);

  program.parse();
}

figlet.text(
  APP_BANNER,
  {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    // width: 80,
    whitespaceBreak: true,
  },
  main
);
