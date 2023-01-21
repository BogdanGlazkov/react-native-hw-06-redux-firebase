import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const icons = {
  comments: require("../assets/images/comment-empty.png"),
  likes: require("../assets/images/like.png"),
  likesFull: require("../assets/images/like-full.png"),
  map: require("../assets/images/map.png"),
};

const favorites = [];

export default function Post({ item, navigation }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const setFavorite = (id) => {
    favorites.push(id);
    setIsFavorite(true);
  };

  const unsetFavorite = (id) => {
    const index = favorites.indexOf(id);
    favorites.splice(index, 1);
    setIsFavorite(false);
  };

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
          <Image style={styles.postFooterIcon} source={icons.comments} />
          <Text style={styles.postFooterText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postStats}
          onPress={isFavorite ? unsetFavorite : setFavorite}
        >
          <Image
            style={styles.postFooterIcon}
            source={isFavorite ? icons.likesFull : icons.likes}
          />
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
          <Image style={styles.postFooterIcon} source={icons.map} />
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
  postFooterIcon: {
    width: 24,
    height: 24,
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
