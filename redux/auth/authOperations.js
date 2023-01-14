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

export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(authSlice.actions.updateUserProfile({ email }));
      console.log(333, user);
      //   await updateProfile(auth.currentUser, {
      //     displayName: login,
      //   });
      //   console.log("user ===> ", user);
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

export const authLogOut = async (dispatch, getState) => {};
