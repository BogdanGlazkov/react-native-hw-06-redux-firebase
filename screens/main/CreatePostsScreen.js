import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import {
  getAllPostsFromFirestore,
  getUsersPostsFromFirestore,
  uploadPostToFirestore,
} from "../../redux/posts/postsOperations";
import Loader from "../../components/Loader";

const icons = {
  camera: require("../../assets/images/camera.png"),
  cameraEdit: require("../../assets/images/camera-edit.png"),
};

const defaultLocation = {
  coords: {
    accuracy: 600,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 37.4220936,
    longitude: -122.083922,
    speed: 0,
  },
  mocked: false,
  timestamp: 1673563251459,
};

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(defaultLocation);
  const [locationTitle, setLocationTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied :(");
      return;
    }
    const data = await camera.takePictureAsync();
    setPhoto(data.uri.toString());
    const place = await Location.getCurrentPositionAsync({});
    setLocation(place);
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      const place = await Location.getCurrentPositionAsync({});
      setLocation(place);
    }
  };

  const editPhoto = () => {
    setPhoto(null);
  };

  const clearState = () => {
    setTitle("");
    setLocation(defaultLocation);
    setLocationTitle("");
    setPhoto(null);
  };

  const uploadPost = async () => {
    if (!photo) return;
    await dispatch(
      uploadPostToFirestore({
        photo,
        title,
        locationTitle,
        location,
        userId,
      })
    );
    await dispatch(getAllPostsFromFirestore());
    await dispatch(getUsersPostsFromFirestore(userId));
  };

  const sendPhoto = async () => {
    setIsLoading(true);
    await uploadPost();
    await clearState();
    await navigation.navigate("Posts");
    await setIsLoading(false);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.containerPermission}>
        <Text style={styles.permissionText}>
          Need you permission to use camera
        </Text>
        <TouchableOpacity
          style={styles.permissionBtn}
          onPress={requestPermission}
        >
          <Text style={styles.permissionBtnText}>Grant permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.permissionBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.permissionBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerFlex}>
            <TouchableOpacity
              style={styles.exit}
              onPress={() => navigation.navigate("Posts")}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Create post</Text>
            </View>
            <View></View>
          </View>
        </View>

        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.postsContainer}>
            <View style={styles.post}>
              <View style={styles.photo}>
                {photo ? (
                  <>
                    <Image style={styles.takenPhoto} source={{ uri: photo }} />
                    <TouchableOpacity
                      style={{
                        ...styles.photoIconWrp,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }}
                      onPress={editPhoto}
                    >
                      <Image
                        style={styles.photoIcon}
                        source={icons.cameraEdit}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.photoTextWrapper}
                      onPress={editPhoto}
                    >
                      <Text style={styles.photoText}>Edit photo</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.photoInput}>
                      <Camera style={styles.camera} ref={setCamera}>
                        <TouchableOpacity
                          style={styles.photoIconWrp}
                          onPress={takePhoto}
                        >
                          <Image
                            style={styles.photoIcon}
                            source={icons.camera}
                          />
                        </TouchableOpacity>
                      </Camera>
                    </View>
                    <TouchableOpacity
                      style={styles.photoTextWrapper}
                      onPress={pickPhoto}
                    >
                      <Text style={styles.photoText}>Download photo</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={{ ...styles.input, fontWeight: "500" }}
                  placeholder="Title..."
                  placeholderTextColor="#BDBDBD"
                  value={title}
                  onChangeText={(value) => setTitle(value)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Feather name={"map-pin"} size={18} color="#BDBDBD" />
                <TextInput
                  style={{ ...styles.input, marginLeft: 8 }}
                  placeholder="Location..."
                  placeholderTextColor="#BDBDBD"
                  value={locationTitle}
                  onChangeText={(value) => setLocationTitle(value)}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btn,
                  backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
                }}
                disabled={!photo}
                onPress={sendPhoto}
              >
                <Text
                  style={{
                    ...styles.btnTitle,
                    color: photo ? "#FFFFFF" : "#BDBDBD",
                  }}
                >
                  Create post
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.delete} onPress={clearState}>
              <Feather name={"trash-2"} size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerPermission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 18,
  },
  permissionBtn: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  permissionBtnText: {
    fontSize: 16,
    color: "#FFFFFF",
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
    justifyContent: "space-between",
    paddingTop: 32,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  post: {},
  photo: {
    marginBottom: 32,
  },
  photoInput: {
    height: 240,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  takenPhoto: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
  },
  camera: {
    position: "relative",
    height: 268,
    borderRadius: 8,
  },
  photoIconWrp: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  photoIcon: {
    width: 25,
    height: 25,
  },
  photoTextWrapper: {
    marginTop: 8,
  },
  photoText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    fontSize: 16,
    color: "#212121",
  },
  btn: {
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 100,
  },
  btnTitle: {
    fontSize: 16,
  },
  delete: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    alignSelf: "center",
    marginTop: "auto",
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostsScreen;
