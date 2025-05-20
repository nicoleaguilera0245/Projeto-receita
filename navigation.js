import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RecipesListScreen from './screens/RecipesListScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Receitas" component={RecipesListScreen} />
      <Stack.Screen name="Categorias" component={CategoriesScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Detalhes" component={RecipeDetailScreen} />
      <Stack.Screen name="Favoritos" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
