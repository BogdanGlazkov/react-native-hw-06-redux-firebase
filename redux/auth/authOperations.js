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

const auth = getAuth(appFirebase);
const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const user = await auth.currentUser;
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
      };
      dispatch(updateUserProfile(userProfile));
    } catch (error) {
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
      //   console.log("user ===> ", user);
    } catch (error) {
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
        };
        dispatch(updateUserProfile(userProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
    } catch (error) {
      console.log("error.message: ", error.message);
    }
  });
};

export const authExit = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authLogOut());
  } catch (error) {
    console.log("error.message: ", error.message);
  }
};
