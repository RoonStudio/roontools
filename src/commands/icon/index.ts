import { existsSync } from "fs";
import { cprint } from "@/utils/color";

/**
 * This an example, try to extend your own logic.
 */
export default async (options: any) => {
  if (!existsSync("./src/components/shared/icons")) {
    cprint("Icons folder not found", "red", "bold");
  }
};
