import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import {
  authRefresh,
  authSetAvatar,
  authDeleteAvatar,
} from "../redux/auth/authOperations";

export default function Avatar() {
  const [image, setImage] = useState(null);
  const { photoURL } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [120, 120],
      quality: 1,
    });
    if (!result.canceled) {
      await setImage(result.assets[0].uri);
    }
  };

  const uploadAvatar = async () => {
    await pickAvatar();
    if (!image) return;
    await dispatch(authSetAvatar({ image }));
    await dispatch(authRefresh());
  };

  const deleteAvatar = async () => {
    await dispatch(authDeleteAvatar());
    await dispatch(authRefresh());
  };

  return (
    <View style={styles.avatar}>
      <Image style={styles.avatarImg} source={{ uri: photoURL }} />
      <TouchableOpacity
        style={styles.avatarBtn}
        activeOpacity={0.8}
        onPress={photoURL ? deleteAvatar : uploadAvatar}
      >
        {photoURL ? (
          <Feather name="x-circle" size={25} color="#BDBDBD" />
        ) : (
          <Feather name="plus-circle" size={25} color="#FF6C00" />
        )}
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
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
  },
});
