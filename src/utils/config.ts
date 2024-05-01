import { CONFIG_FILE_NAME } from "@/commands/init";
import { readFileSync } from "fs";

export type Config = {
  icons_directory: string;
  components_extension: "jsx" | "tsx";
};

const config: Config = {
  icons_directory: "./src/components/shared/icons",
  components_extension: "tsx",
};

export const getConfig = () => {
  const file = readFileSync(CONFIG_FILE_NAME);

  if (file) {
    return JSON.parse(file.toString()) as Config;
  }

  return config;
};
