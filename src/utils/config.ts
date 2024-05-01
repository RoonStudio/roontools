import { CONFIG_FILE_NAME } from "@/commands/init";
import { existsSync, readFileSync } from "fs";

export type Config = {
  icons_directory: string;
  components_extension: "jsx" | "tsx";
};

const config: Config = {
  icons_directory: "./src/components/shared/icons",
  components_extension: "tsx",
};

export const getConfig = () => {
  if (!existsSync(CONFIG_FILE_NAME)) return config;

  const file = readFileSync(CONFIG_FILE_NAME);

  return JSON.parse(file.toString()) as Config;
};
