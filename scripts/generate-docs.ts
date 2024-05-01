import { BIN_NAME, program } from "@/index";
import { fromKebabToTitle } from "@/utils/general";
import { writeFileSync } from "fs";
import { glob } from "glob";

async function main() {
  const commands = program.commands;

  const CTL = "```";

  const screeshots = await glob("assets/screenshots/*.png");

  const readme = `# Roon Tools
  
A tool made by RoonStudios containing multiple command line utilities to help with development

## Installation

${CTL}sh
npm i -g ${BIN_NAME}
# or
pnpm add -g ${BIN_NAME}
# or
yarn global add ${BIN_NAME}
${CTL}

## Usage

${commands
  .map(
    (command) => `### ${fromKebabToTitle(command.name())}
${CTL}
${command.helpInformation()}
${CTL}
`
  )
  .join("\n")}


## Upcoming Features

check [The todo file](TODO.md) for more info 

## Screenshots
${screeshots.map((s) => `![](${s})`).join("\n")}
`;

  writeFileSync("README.md", readme);
}

main();
