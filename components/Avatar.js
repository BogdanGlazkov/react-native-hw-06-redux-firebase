import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const images = {
  avatar: require("../assets/images/user-photo-m.png"),
  addIcon: require("../assets/images/add.png"),
  deleteIcon: require("../assets/images/delete.png"),
};

export default function Avatar() {
  const [image, setImage] = useState(null);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [120, 120],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteAvatar = () => {
    setImage(null);
  };

  return (
    <View style={styles.avatar}>
      <Image
        style={styles.avatarImg}
        source={image ? { uri: image } : images.avatar}
      />
      <TouchableOpacity
        style={styles.avatarBtn}
        activeOpacity={0.8}
        onPress={image ? deleteAvatar : pickAvatar}
      >
        <Image
          style={styles.avatarIcon}
          source={image ? images.deleteIcon : images.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    zIndex: 1,
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarImg: {
    flex: 1,
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 21,
    right: -5,
    width: 25,
    height: 25,
  },
  avatarIcon: {
    width: 40,
    height: 40,
  },
});
