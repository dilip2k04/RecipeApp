import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'; // Make sure the path is correct
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import LikedRecipes from './screens/LikedRecipes';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="LikedRecipes" component={LikedRecipes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
