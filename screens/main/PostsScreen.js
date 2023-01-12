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
import Post from "../../components/Post";

const icons = {
  logOut: require("../../assets/images/log-out.png"),
  user: require("../../assets/images/user-photo.png"),
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
            <Post item={item} navigation={navigation} />
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
});

export default PostsScreen;
