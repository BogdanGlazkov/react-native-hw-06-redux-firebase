import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import Home from "./screens/main/Home";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

const AuthStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{ paddingHorizontal: 40, paddingVertical: 10 }, null],
      }}
    >
      <MainStack.Screen
        options={({ route }) => ({
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121" />,
          headerShown: false,
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Map" || routeName === "Comments") {
              return { display: "none" };
            }
            return { paddingHorizontal: 40, paddingVertical: 10 };
          })(route),
        })}
        name="Home"
        component={Home}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Feather name="plus" size={14} color="#FFFFFF" />
            </View>
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={24} color="#212121" />,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainStack.Navigator>
  );
};

export default useRoute;
