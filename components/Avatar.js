import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile, getAuth } from "firebase/auth";
import { storage, appFirebase } from "../firebase/config";
import { authRefresh } from "../redux/auth/authOperations";

const auth = getAuth(appFirebase);

const images = {
  addIcon: require("../assets/images/add.png"),
  deleteIcon: require("../assets/images/delete.png"),
};

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

  const deleteAvatar = async () => {
    try {
      setImage(null);
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });
      await dispatch(authRefresh());
    } catch (error) {
      console.log("error.message: ", error.message);
    }
  };

  const uploadAvatar = async () => {
    try {
      await pickAvatar();
      await console.log("image===>>>", image);
      const response = await fetch(image);
      const file = await response.blob();
      const postId = Date.now().toString();
      const reference = ref(storage, `images/${postId}`);

      const result = await uploadBytesResumable(reference, file);
      const processedPhoto = await getDownloadURL(result.ref);

      await setImage(processedPhoto);
      await updateProfile(auth.currentUser, {
        photoURL: processedPhoto,
      });
      await dispatch(authRefresh());
    } catch (error) {
      console.log("error.message: ", error.message);
    }
  };

  return (
    <View style={styles.avatar}>
      <Image style={styles.avatarImg} source={{ uri: photoURL }} />
      <TouchableOpacity
        style={styles.avatarBtn}
        activeOpacity={0.8}
        onPress={photoURL ? deleteAvatar : uploadAvatar}
      >
        <Image
          style={styles.avatarIcon}
          source={photoURL ? images.deleteIcon : images.addIcon}
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
