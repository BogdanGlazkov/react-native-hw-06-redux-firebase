import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  getCommentsFromFirestore,
  uploadCommentToFirestore,
} from "../../redux/posts/postsOperations";

// let allComments = [];

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const { login } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.posts);
  const { postId, photoUrl } = route.params;
  const dispatch = useDispatch();

  // const createComment = async () => {
  //   try {
  //     if (!comment) return;
  //     const commentsColl = await collection(db, "posts", postId, "comments");
  //     await addDoc(commentsColl, { comment, login, date: Date.now() });
  //     await setComment("");
  //     await getAllComments();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // const getAllComments = async () => {
  //   try {
  //     const comments = [];
  //     const commentsColl = await collection(db, `posts/${postId}/comments`);
  //     onSnapshot(commentsColl, (snapshot) => {
  //       snapshot.forEach((doc) => {
  //         const data = doc.data();
  //         comments.push(data);
  //       });
  //       const sortedComments = comments.sort((a, b) => a.date > b.date);
  //       allComments = sortedComments;
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const getDate = (date) => {
    const dateString = new Date(date).toString();
    const newDate = dateString.slice(4, 21);
    return newDate;
  };

  const createComment = async () => {
    dispatch(uploadCommentToFirestore({ postId, comment, login }));
    setComment("");
  };

  useEffect(() => {
    dispatch(getCommentsFromFirestore(postId));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.postImgWrapper}>
          <Image style={styles.postImg} source={{ uri: photoUrl }} />
        </View>

        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentOwner}>{item.login[0]}</Text>
              </View>
              <View style={styles.commentBody}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.commentDate}>{getDate(item.date)}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Comment..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity style={styles.postBtn} onPress={createComment}>
          <Image
            style={styles.postBtnImg}
            source={require("../../assets/images/send.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 350,
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  postImgWrapper: {
    marginVertical: 32,
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  postImg: {
    width: "100%",
    height: "100%",
  },
  comment: {
    marginBottom: 24,
    flexDirection: "row",
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  commentBody: {
    flexGrow: 1,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    alignSelf: "flex-end",
    fontSize: 10,
    color: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    // alignItems: "center",
    height: 50,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 100,
    padding: 16,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  input: {
    fontSize: 16,
    color: "#212121",
  },
  postBtn: {
    position: "absolute",
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    alignSelf: "center",
    borderRadius: 50,
  },
  postBtnImg: {
    width: "100%",
    height: "100%",
  },
});

export default CommentsScreen;
