import { fromKebab, toTitle, TransformCase } from "case-alchemy";

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const fromKebabToTitle = TransformCase(fromKebab, toTitle);
