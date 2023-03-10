import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";
import { authRefresh } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authRefresh());
    console.log("login ------> ", login);
  }, [login]);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
