import { SvgProps } from "react-native-svg";

import { Arrow } from "./Arrow";

export const Icon = {
  Arrow,
};

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
  style?: SvgProps["style"];
  strokeWidth?: number;
};
