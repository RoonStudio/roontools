#!/usr/bin/env node
import { createCommand } from "commander";
import { description, version, name } from "../package.json";
import icon from "@/commands/icon";

const startAt = Date.now();

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
