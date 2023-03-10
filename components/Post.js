import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function Post({ item, navigation }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const isComment = item.comments;

  return (
    <View style={styles.post}>
      <View style={styles.postImgWrapper}>
        <Image style={styles.postImg} source={{ uri: item.photoUrl }} />
      </View>
      <View style={styles.postTitle}>
        <Text style={styles.postTitleText}>{item.title}</Text>
      </View>

      <View style={styles.postFooter}>
        <TouchableOpacity
          style={styles.postStats}
          onPress={() =>
            navigation.navigate("Comments", {
              postId: item.id,
              photoUrl: item.photoUrl,
            })
          }
        >
          <Feather
            name="message-circle"
            size={24}
            color={isComment ? "#FF6C00" : "#BDBDBD"}
          />
          <Text style={styles.postFooterText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postStats}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <FontAwesome name={"thumbs-up"} size={24} color="#FF6C00" />
          ) : (
            <Feather name={"thumbs-up"} size={24} color="#BDBDBD" />
          )}
          <Text style={styles.postFooterText}>{isFavorite ? 1 : 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postLocation}
          onPress={() =>
            navigation.navigate("Map", {
              latitude: item.location.coords.latitude,
              longitude: item.location.coords.longitude,
              title: item.locationTitle,
            })
          }
        >
          <Feather name={"map-pin"} size={24} color="#BDBDBD" />
          <Text style={styles.postLocationText}>{item.locationTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginVertical: 10,
  },
  postImgWrapper: {
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  postImg: {
    width: "100%",
    height: "100%",
  },
  postTitle: {
    marginVertical: 8,
  },
  postTitleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  postFooter: {
    flexDirection: "row",
  },
  postStats: {
    flexDirection: "row",
    marginRight: 24,
  },
  postFooterText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#212121",
  },
  postLocation: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  postLocationText: {
    marginLeft: 4,
    textDecorationLine: "underline",
    fontSize: 16,
    color: "#212121",
  },
});
