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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getCommentsFromFirestore,
  uploadCommentToFirestore,
} from "../../redux/posts/postsOperations";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const { login } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.posts);
  const { postId, photoUrl } = route.params;
  const dispatch = useDispatch();

  const getDate = (date) => {
    const dateString = new Date(date).toString();
    const newDate = dateString.slice(4, 21);
    return newDate;
  };

  const createComment = async () => {
    if (!comment) return;
    dispatch(uploadCommentToFirestore({ postId, comment, login }));
    dispatch(getCommentsFromFirestore(postId));
    setComment("");
  };

  useEffect(() => {
    dispatch(getCommentsFromFirestore(postId));
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
        <View style={styles.postImgWrapper}>
          <Image style={styles.postImg} source={{ uri: photoUrl }} />
        </View>

        <FlatList
          style={{ height: "40%" }}
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
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            multiline={true}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity style={styles.postBtn} onPress={createComment}>
            <Ionicons name="arrow-up-circle" size={34} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    marginVertical: 7,
    borderWidth: 1,
    borderRadius: 100,
    padding: 16,
    paddingRight: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  input: {
    width: "90%",
    fontSize: 16,
    color: "#212121",
  },
  postBtn: {
    width: 34,
    height: 34,
    alignSelf: "center",
    borderRadius: 50,
  },
});

export default CommentsScreen;
