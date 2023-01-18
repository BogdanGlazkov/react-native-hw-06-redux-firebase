import { Alert } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { appFirebase } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { postsSlice } from "../posts/postReducer";

const auth = getAuth(appFirebase);
const { updateUserProfile, updateAvatar, authStateChange, authLogOut } =
  authSlice.actions;
const { postsLogOut } = postsSlice.actions;

export const authSignUp =
  ({ login, email, password, avatarUrl }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        avatarUrl,
      });
      const user = await auth.currentUser;
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatarUrl: user.avatarUrl,
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
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const authSetAvatar =
  ({ avatarUrl }) =>
  async (dispatch) => {
    try {
      await updateProfile(auth.currentUser, {
        avatarUrl,
      });
      dispatch(updateAvatar(avatarUrl));
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
          avatarUrl: user.avatarUrl,
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
