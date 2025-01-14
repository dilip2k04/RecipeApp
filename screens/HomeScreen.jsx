import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set the heart icon in the top-right corner of the navigation bar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('LikedRecipes')} style={styles.heartIcon}>
          <Icon name="heart" size={28} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://dummyjson.com/recipes/search?q=${query}`);
      if (response.data.recipes) {
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
        setError('No recipes found for this search term.');
      }
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Finder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter food name..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={fetchRecipes} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id + item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
            <View style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  recipeItem: { padding: 15, borderBottomWidth: 1 },
  recipeTitle: { fontSize: 18 },
  error: { color: 'red', marginTop: 10 },
  loader: { marginTop: 20 },
  heartIcon: { marginRight: 15 }, // Ensures the icon is positioned correctly
});
