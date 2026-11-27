import { Image, Text, View } from "react-native";
import { tokens as t, type PropsMap } from "@acme/contracts";
import { sized } from "../images";

const WIDTH = { small: 320, medium: 640, full: undefined } as const;

export function ImageBlock({
  imageUrl,
  caption,
  size,
}: PropsMap["ImageBlock"]) {
  if (!imageUrl) {
    return (
      <View
        style={{
          margin: t.space.md,
          padding: t.space.lg,
          backgroundColor: t.color.surface,
          borderRadius: t.radius,
          alignItems: "center",
        }}
      >
        <Text style={{ color: t.color.muted }}>No image selected</Text>
      </View>
    );
  }
  return (
    <View style={{ padding: t.space.md, alignItems: "center", gap: 6 }}>
      <Image
        source={{ uri: sized(imageUrl, 400) }}
        resizeMode="cover"
        style={{
          width: "100%",
          maxWidth: WIDTH[size],
          aspectRatio: 16 / 9,
          borderRadius: t.radius,
        }}
      />
      {!!caption && (
        <Text style={{ color: t.color.muted, fontSize: 13 }}>{caption}</Text>
      )}
    </View>
  );
}
