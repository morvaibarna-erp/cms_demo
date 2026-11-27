import { useState } from "react";
import { Image, Pressable, Text, View, Platform } from "react-native";
import { tokens as t, type NewsItem, type PropsMap } from "@acme/contracts";
import { useContent } from "../content";
import { sized } from "../images";

function NewsCard({ item, showImage }: { item: NewsItem; showImage: boolean }) {
  const [open, setOpen] = useState(false);
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";
  const flexDirection = !isMobile ? "row" : "column";
  return (
    <View
      style={{
        backgroundColor: t.color.onPrimary,
        borderRadius: t.radius,
        overflow: "hidden",
        flexDirection: flexDirection,
      }}
    >
      {showImage && !!item.imageUrl && (
        <View style={{ width: 500 }}>
          <Image
            source={{ uri: sized(item.imageUrl, 1300) }}
            resizeMode="cover"
            style={{ width: "100%", aspectRatio: 16 / 9 }}
          />
        </View>
      )}
      <View style={{ padding: t.space.md, gap: 6 }}>
        {!!item.publishedAt && (
          <Text style={{ fontSize: 12, color: t.color.muted }}>
            {item.publishedAt.slice(0, 10)}
          </Text>
        )}
        <Text style={{ fontSize: 18, fontWeight: "700", color: t.color.text }}>
          {item.title}
        </Text>
        {!!item.summary && (
          <Text style={{ color: t.color.text }}>{item.summary}</Text>
        )}
        {open && !!item.body && (
          <Text style={{ color: t.color.text, lineHeight: 22 }}>
            {item.body}
          </Text>
        )}
        {!!item.body && (
          <Pressable onPress={() => setOpen(!open)}>
            <Text style={{ color: t.color.primary, fontWeight: "600" }}>
              {open ? "Show less" : "Read more"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function NewsList({ title, count, showImages }: PropsMap["NewsList"]) {
  const { news } = useContent();
  const items = news.slice(0, count);
  return (
    <View style={{ padding: t.space.md, gap: t.space.sm }}>
      {!!title && (
        <Text style={{ fontSize: 24, fontWeight: "700", color: t.color.text }}>
          {title}
        </Text>
      )}
      {items.length === 0 && (
        <Text style={{ color: t.color.muted }}>
          No news yet. Add articles in Studio (News articles).
        </Text>
      )}
      {items.map((item) => (
        <NewsCard key={item.id} item={item} showImage={showImages === "yes"} />
      ))}
    </View>
  );
}
