import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Post from "../../components/Post";
import { authExit } from "../../redux/auth/authOperations";
import { getAllPostsFromFirestore } from "../../redux/posts/postsOperations";

const PostsScreen = ({ navigation }) => {
  const { login, email, photoURL } = useSelector((state) => state.auth);
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsFromFirestore());
  }, []);

  const onLogOut = () => {
    dispatch(authExit());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerFlex}>
          <View></View>
          <View>
            <Text style={styles.headerTitle}>Posts</Text>
          </View>
          <TouchableOpacity style={styles.exit} onPress={onLogOut}>
            <Feather name="log-out" size={25} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView style={styles.postsContainer}>
        <View style={styles.user}>
          <Image style={styles.userImage} source={{ uri: photoURL }} />
          <View style={styles.userText}>
            <Text style={styles.userTitle}>{login}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <FlatList
          data={allPosts}
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
