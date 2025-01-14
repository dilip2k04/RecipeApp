import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LikedRecipes = ({ navigation }) => {
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    fetchLikedRecipes();
  }, []);

  // Fetch liked recipes from AsyncStorage
  const fetchLikedRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('likedRecipes');
      if (storedRecipes) {
        setLikedRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Recipes</Text>
      {likedRecipes.length === 0 ? (
        <Text style={styles.noDataText}>No liked recipes yet!</Text>
      ) : (
        <FlatList
          data={likedRecipes}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.recipeTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  recipeTitle: {
    fontSize: 16,
  },
});

export default LikedRecipes;
