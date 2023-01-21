import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { authExit } from "../../redux/auth/authOperations";
import { getUsersPostsFromFirestore } from "../../redux/posts/postsOperations";

const ProfileScreen = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const { userId, login } = useSelector((state) => state.auth);
  const { usersPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersPostsFromFirestore(userId));
    const onChangeWidth = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const widthListener = Dimensions.addEventListener("change", onChangeWidth);
    return () => {
      widthListener.remove();
    };
  }, []);

  const onLogOut = () => {
    dispatch(authExit());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBgr}
        source={require("../../assets/images/mountains.jpg")}
      >
        <SafeAreaView style={{ ...styles.wrapper, width: dimensions }}>
          <Avatar />
          <TouchableOpacity style={styles.photoExit} onPress={onLogOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.user}>
            <Text style={styles.userName}>{login}</Text>
          </View>
          <FlatList
            data={usersPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Post item={item} navigation={navigation} />
            )}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBgr: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
  },
  wrapper: {
    marginTop: 147,
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 138,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  photoExit: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 25,
    height: 25,
  },
  user: {
    alignItems: "center",
    marginBottom: 32,
  },
  userName: {
    fontWeight: "500",
    fontSize: 30,
    color: "#212121",
  },
});

export default ProfileScreen;
