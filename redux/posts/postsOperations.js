import { Alert } from "react-native";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { postsSlice } from "./postsReducer";

const { getAllPosts, getUsersPosts, getComments, getPhoto, clearPhoto } =
  postsSlice.actions;

export const getAllPostsFromFirestore = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const allPosts = querySnapshot.docs
      .map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
      .sort((a, b) => a.date < b.date);
    dispatch(getAllPosts({ allPosts }));
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
  }
};

export const getUsersPostsFromFirestore = (userId) => async (dispatch) => {
  try {
    const q = query(collection(db, "posts"), where("owner", "==", userId));
    const querySnapshot = await getDocs(q);
    const usersPosts = querySnapshot.docs
      .map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
      .sort((a, b) => a.date < b.date);
    dispatch(getUsersPosts({ usersPosts }));
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
  }
};

export const getCommentsFromFirestore = (postId) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    const commentsColl = querySnapshot.docs.map((doc) => doc.data());
    const sortedComments = commentsColl.sort((a, b) => a.date > b.date);
    dispatch(getComments({ sortedComments }));
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
    r;
  }
};

export const uploadCommentToFirestore =
  ({ postId, comment, login }) =>
  async (dispatch) => {
    try {
      const commentsColl = await collection(db, "posts", postId, "comments");
      await addDoc(commentsColl, { comment, login, date: Date.now() });

      const querySnapshot = await getDocs(commentsColl);
      const updatedCommentsColl = querySnapshot.docs.map((doc) => doc.data());
      const commentsNumber = updatedCommentsColl.length;

      const docRef = await doc(db, "posts", postId);
      await setDoc(docRef, { comments: commentsNumber }, { merge: true });
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const uploadPhotoToDB =
  ({ photo }) =>
  async (dispatch) => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = Date.now();
      const reference = ref(storage, `images/${postId}`);

      const result = await uploadBytesResumable(reference, file);
      const processedPhoto = await getDownloadURL(result.ref);
      await dispatch(getPhoto({ uploadedPhoto: processedPhoto }));
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const uploadPostToFirestore =
  ({ createdPhoto, title, locationTitle, location, userId }) =>
  async (dispatch) => {
    try {
      await addDoc(collection(db, "posts"), {
        photoUrl: createdPhoto,
        title,
        locationTitle,
        location,
        likes: 0,
        comments: 0,
        date: Date.now(),
        owner: userId,
      });
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const clearPhotoFromState = () => async (dispatch) => {
  try {
    await dispatch(clearPhoto());
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
  }
};
