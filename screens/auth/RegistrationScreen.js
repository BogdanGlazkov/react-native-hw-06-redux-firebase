import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);

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

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/mountains.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.wrapper,
                paddingBottom: isKeyboardShown ? 32 : 80,
                width: dimensions,
              }}
            >
              <View style={styles.photo}>
                <TextInput style={styles.photoInput} onFocus={() => {}} />
                <TouchableOpacity style={styles.photoIconWrp}>
                  <Image
                    style={styles.photoIcon}
                    source={require("../../assets/images/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Registration</Text>
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isLoginActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Login"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsKeyboardShown(true);
                    setIsLoginActive(true);
                  }}
                  onBlur={() => setIsLoginActive(false)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isEmailActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsKeyboardShown(true);
                    setIsEmailActive(true);
                  }}
                  onBlur={() => setIsEmailActive(false)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: isKeyboardShown ? 0 : 16,
                    position: "relative",
                    borderColor: isPasswordActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={!isPasswordShown}
                  onFocus={() => {
                    setIsKeyboardShown(true);
                    setIsPasswordActive(true);
                  }}
                  onBlur={() => setIsPasswordActive(false)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={styles.hideShow}
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                >
                  <Text style={styles.hideShowText}>
                    {isPasswordShown ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              {!isKeyboardShown && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={onSubmit}
                  >
                    <Text style={styles.btnTitle}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.footer}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.footerTitle}>
                      Already have account? Enter
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
  },
  wrapper: {
    position: "relative",
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 16,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photo: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    marginHorizontal: "auto",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  photoInput: {},
  photoIconWrp: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
  },
  photoIcon: {
    width: 25,
    height: 25,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: 30,
    marginHorizontal: "auto",
    color: "#212121",
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    padding: 16,
    marginBottom: 16,

    color: "#212121",
    backgroundColor: "#F6F6F6",
  },
  hideShow: {
    position: "absolute",
    flex: 1,
    top: "25%",
    right: "5%",
  },
  hideShowText: {
    fontSize: 16,
    color: "#1B4371",
  },
  btn: {
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 16,
    color: "#1B4371",
  },
});
