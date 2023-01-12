import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import posts from "../../db";

const ProfileScreen = () => {
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
        <View style={styles.photo}>
          <ImageBackground
            style={styles.photoUser}
            source={require("../../assets/images/user-photo-m.png")}
          >
            <TouchableOpacity style={styles.photoDelete} activeOpacity={0.8}>
              <Image
                style={styles.photoIconDelete}
                source={require("../../assets/images/delete.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoExit}>
              <Image
                style={styles.photoIconExit}
                source={require("../../assets/images/log-out.png")}
                activeOpacity={0.8}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <SafeAreaView style={{ ...styles.wrapper, width: dimensions }}>
          <ScrollView>
            <View style={styles.user}>
              <Text style={styles.userName}>Natali Romanova</Text>
            </View>
            {posts.map(({ title, image, comments, likes, location }) => {
              return (
                <View style={styles.post} key={title}>
                  <View style={styles.postImgWrapper}>
                    <Image style={styles.postImage} source={image} />
                  </View>
                  <View style={styles.postTitle}>
                    <Text style={styles.postTitleText}>{title}</Text>
                  </View>

                  <View style={styles.postFooter}>
                    <View style={styles.postStats}>
                      <Image
                        style={styles.postFooterIcon}
                        source={require("../../assets/images/comment-full.png")}
                      />
                      <Text style={styles.postFooterText}>{comments}</Text>
                    </View>
                    <View style={styles.postStats}>
                      <Image
                        style={styles.postFooterIcon}
                        source={require("../../assets/images/like.png")}
                      />
                      <Text style={styles.postFooterText}>{likes}</Text>
                    </View>
                    <View style={styles.postLocation}>
                      <Image
                        style={styles.postFooterIcon}
                        source={require("../../assets/images/map.png")}
                      />
                      <Text style={styles.postLocationText}>{location}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
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
  photo: {
    position: "absolute",
    zIndex: 1,
    top: 87,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  photoUser: {
    flex: 1,
    resizeMode: "cover",
  },
  photoDelete: {
    position: "absolute",
    bottom: 21,
    right: -5,
    width: 25,
    height: 25,
  },
  photoExit: {
    position: "absolute",
    bottom: 14,
    right: -111,
    width: 25,
    height: 25,
  },
  photoIconDelete: {
    width: 40,
    height: 40,
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
  post: {
    marginBottom: 32,
  },
  postImgWrapper: {
    height: 240,
    borderRadius: 8,
  },
  postImage: {
    width: "100%",
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

export default ProfileScreen;
