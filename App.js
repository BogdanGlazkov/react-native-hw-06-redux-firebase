import React from "react";
import useRoute from "./router";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const routing = useRoute(1);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
