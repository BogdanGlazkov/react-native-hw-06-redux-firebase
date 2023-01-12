import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

const icons = {
  logOut: require("../../assets/images/log-out.png"),
  user: require("../../assets/images/user-photo.png"),
  comments: require("../../assets/images/comment-empty.png"),
  likes: require("../../assets/images/like.png"),
  map: require("../../assets/images/map.png"),
};

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerFlex}>
          <View></View>
          <View>
            <Text style={styles.headerTitle}>Posts</Text>
          </View>
          <TouchableOpacity style={styles.exit}>
            <Image source={icons.logOut} />
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView style={styles.postsContainer}>
        <View style={styles.user}>
          <Image style={styles.userImage} source={icons.user} />
          <View style={styles.userText}>
            <Text style={styles.userTitle}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={styles.postImgWrapper}>
                <Image style={styles.postImg} source={{ uri: item.photo }} />
              </View>
              <View style={styles.postTitle}>
                <Text style={styles.postTitleText}>{item.title}</Text>
              </View>

              <View style={styles.postFooter}>
                <TouchableOpacity
                  style={styles.postStats}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Image
                    style={styles.postFooterIcon}
                    source={icons.comments}
                  />
                  <Text style={styles.postFooterText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postStats}>
                  <Image style={styles.postFooterIcon} source={icons.likes} />
                  <Text style={styles.postFooterText}>0</Text>
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
                  <Text style={styles.postLocationText}>
                    {item.locationTitle}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 88,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  exit: {
    width: 24,
    height: 24,
  },
  postsContainer: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginBottom: 16,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userText: {
    marginLeft: 8,
  },
  userTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
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

export default PostsScreen;
