import { Alert } from "react-native";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { postsSlice } from "./postReducer";

const { getAllPosts, getUsersPosts, getComments, getPhoto } =
  postsSlice.actions;

export const getAllPostsFromFirestore = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const allPosts = querySnapshot.docs
      .map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
      .sort((a, b) => a.location?.timestamp < b.location?.timestamp);
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
      .sort((a, b) => a.location?.timestamp < b.location?.timestamp);
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
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };

export const uploadPhotoToDB = (photo) => async (dispatch) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();
    const postId = Date.now().toString();
    const reference = ref(storage, `images/${postId}`);

    const result = await uploadBytesResumable(reference, file);
    const processedPhoto = await getDownloadURL(result.ref);
    await dispatch(getPhoto({ uploadedPhoto: processedPhoto.toString() }));
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message: ", error.message);
  }
};

export const uploadPostToFirestore =
  ({ uploadedPhoto, title, locationTitle, location, userId }) =>
  async (dispatch) => {
    try {
      await addDoc(collection(db, "posts"), {
        photoUrl: uploadedPhoto.toString(),
        title,
        locationTitle,
        location,
        likes: 0,
        owner: userId,
      });
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message: ", error.message);
    }
  };