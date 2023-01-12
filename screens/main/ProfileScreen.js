import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import posts from "../../db";

const ProfileScreen = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChangeWidth = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const widthListener = Dimensions.addEventListener("change", onChangeWidth);
    return () => {
      widthListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBgr}
        source={require("../../assets/images/mountains.jpg")}
      >
        <SafeAreaView style={{ ...styles.wrapper, width: dimensions }}>
          <Avatar />
          <TouchableOpacity style={styles.photoExit}>
            <Image
              style={styles.photoIconExit}
              source={require("../../assets/images/log-out.png")}
              activeOpacity={0.8}
            />
          </TouchableOpacity>
          <View style={styles.user}>
            <Text style={styles.userName}>Natali Romanova</Text>
          </View>
          <FlatList
            data={posts}
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
  photoIconExit: {
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
