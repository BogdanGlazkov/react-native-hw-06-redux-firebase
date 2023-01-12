import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const HomeStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostsScreen}
      />
      <HomeStack.Screen
        // options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <HomeStack.Screen
        // options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
    </HomeStack.Navigator>
  );
};

export default Home;
