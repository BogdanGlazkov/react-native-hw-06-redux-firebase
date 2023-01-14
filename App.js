import React, { useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appFirebase } from "./firebase/config";
import useRoute from "./router";
import { store } from "./redux/store";

const auth = getAuth(appFirebase);

export default function App() {
  const [user, setUser] = useState(null);
  const routing = useRoute(user);
  onAuthStateChanged(auth, (user) => setUser(user));

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
