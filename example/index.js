import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Initializer } from "react-native-baidumap-sdk";
import examples from "./examples";

const Stack = createStackNavigator();
Initializer.init("sIMQlfmOXhQmPLF1QMh4aBp8zZO9Lb2A");

export default () => (
  <NavigationContainer>
    <Stack.Navigator>
      {Object.keys(examples).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          component={examples[name].screen}
          options={examples[name].options}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);
