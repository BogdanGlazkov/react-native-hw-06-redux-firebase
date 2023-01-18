import { Alert } from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import { postsSlice } from "./postReducer";

const { getAllPosts, getUsersPosts, getComments, getPhoto } =
  postsSlice.actions;
// export const getAllPostsFromFirestore = () => async (dispatch) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "posts"));
//     await setPosts(
//       querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//     );
//   } catch (error) {
//     Alert.alert("Something went wrong. Try again, please");
//     console.log("error.message: ", error.message);
//   }
// };
export const getAllPostsFromFirestore = () => async (dispatch) => {
  try {
    const allPosts = [];
    const commentsColl = await collection(db, "posts");
    onSnapshot(commentsColl, (snapshot) => {
      snapshot.forEach((doc) => {
        // const data = doc.data();
        allPosts.push(doc.data());
      });
      dispatch(getAllPosts({ allPosts }));
    });
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message1: ", error.message);
  }
};

// export const getUsersPostsFromFirestore = (userId) => async (dispatch) => {
//   try {
//     const q = query(collection(db, "posts"), where("owner", "==", userId));

//     const querySnapshot = await getDocs(q);
//     await setPosts(
//       querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//     );
//   } catch (error) {
//     Alert.alert("Something went wrong. Try again, please");
//     console.log("error.message: ", error.message);
//   }
// };
export const getUsersPostsFromFirestore = (userId) => async (dispatch) => {
  try {
    const usersPosts = [];
    const q = query(collection(db, "posts"), where("owner", "==", userId));
    const querySnapshot = await getDocs(q);
    await querySnapshot.docs.map((doc) =>
      usersPosts.push({ ...doc.data(), id: doc.id })
    );
    dispatch(getUsersPosts({ usersPosts }));
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message2: ", error.message);
  }
};

export const getCommentsFromFirestore = (postId) => async (dispatch) => {
  try {
    const comments = [];
    const commentsColl = await collection(db, `posts/${postId}/comments`);
    onSnapshot(commentsColl, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        comments.push(data);
      });
      const sortedComments = comments.sort((a, b) => a.date > b.date);
      console.log("sortedComments", sortedComments);
      dispatch(getComments({ sortedComments }));
    });
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message3: ", error.message);
  }
};

export const uploadCommentToFirestore =
  ({ postId, comment, login }) =>
  async (dispatch) => {
    try {
      console.log(123, postId, comment, login);
      const commentsColl = await collection(db, "posts", postId, "comments");
      await addDoc(commentsColl, { comment, login, date: Date.now() });
      await getCommentsFromFirestore(postId);
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message4: ", error.message);
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
    await console.log("processedPhoto==>>", processedPhoto);
    await dispatch(getPhoto({ uploadedPhoto: processedPhoto.toString() }));
  } catch (error) {
    Alert.alert("Something went wrong. Try again, please");
    console.log("error.message5: ", error.message);
  }
};

export const uploadPostToFirestore =
  ({ uploadedPhoto, title, locationTitle, location, userId }) =>
  async (dispatch) => {
    try {
      console.log("uploadedPhoto2===>>>", uploadedPhoto);

      await addDoc(collection(db, "posts"), {
        photoUrl: uploadedPhoto.toString(),
        title,
        locationTitle,
        location,
        likes: 0,
        owner: userId,
      });
      // getAllPostsFromFirestore();
      // getUsersPostsFromFirestore();
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log("error.message6: ", error.message);
    }
  };
