import { Alert } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { appFirebase, storage } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { postsSlice } from "../posts/postsReducer";

const auth = getAuth(appFirebase);
const {
  updateUserProfile,
  updateAvatar,
  deleteAvatar,
  authStateChange,
  authLogOut,
} = authSlice.actions;
const { postsLogOut } = postsSlice.actions;

export const authSignUp =
  ({ login, email, password, image }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: image,
      });
      const user = await auth.currentUser;
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      dispatch(updateUserProfile(userProfile));
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const authLogIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
    } catch (error) {
      Alert.alert("Wrong email or password");
      console.log("error.message: ", error.message);
    }
  };

export const authSetAvatar =
  ({ image }) =>
  async (dispatch) => {
    try {
      const response = await fetch(image);
      const file = await response.blob();
      const postId = Date.now();
      const reference = ref(storage, `images/${postId}`);

      const result = await uploadBytesResumable(reference, file);
      const processedPhoto = await getDownloadURL(result.ref);
      await updateProfile(auth.currentUser, {
        photoURL: processedPhoto,
      });
      await dispatch(updateAvatar({ uploadedPhoto: processedPhoto }));
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const authDeleteAvatar = () => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: "",
    });
    await dispatch(deleteAvatar());
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
  }
};

export const authRefresh = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const userProfile = {
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(updateUserProfile(userProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  });
};

export const authExit = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authLogOut());
    dispatch(postsLogOut());
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
  }
};
