import { Text } from "react-native";
import type { PropsMap } from "@acme/contracts";

export function HeadLine({ title, color, fontSize }: PropsMap["HeadLine"]) {
  return <Text style={{ color, fontSize, fontWeight: "700" }}>{title}</Text>;
}
