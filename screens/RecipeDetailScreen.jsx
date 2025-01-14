import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDetail = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, []);

  // Check if the recipe is already liked
  const checkIfLiked = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('likedRecipes');
      if (storedRecipes) {
        const likedRecipes = JSON.parse(storedRecipes);
        const isLiked = likedRecipes.some((item) => item.name === recipe.name);
        setLiked(isLiked);
      }
    } catch (error) {
      console.error('Error checking liked recipes:', error);
    }
  };

  // Toggle Like/Unlike functionality
  const handleLike = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('likedRecipes');
      let likedRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];

      if (liked) {
        // Unlike: Remove recipe from liked list
        likedRecipes = likedRecipes.filter((item) => item.name !== recipe.name);
      } else {
        // Like: Add recipe to liked list
        likedRecipes.push(recipe);
      }

      await AsyncStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating liked recipes:', error);
    }
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No recipe data available!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      <Image source={{ uri: recipe.image }} style={styles.image} />

      <Text style={styles.detail}>Cuisine: {recipe.cuisine}</Text>
      <Text style={styles.detail}>Difficulty: {recipe.difficulty}</Text>
      <Text style={styles.detail}>Prep Time: {recipe.prepTimeMinutes} minutes</Text>
      <Text style={styles.detail}>Cook Time: {recipe.cookTimeMinutes} minutes</Text>
      <Text style={styles.detail}>Servings: {recipe.servings}</Text>
      <Text style={styles.detail}>Calories/Serving: {recipe.caloriesPerServing}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.listItem}>• {ingredient}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe.instructions.map((instruction, index) => (
        <Text key={index} style={styles.listItem}>• {instruction}</Text>
      ))}

      {recipe.tags && (
        <>
          <Text style={styles.sectionTitle}>Tags:</Text>
          <Text style={styles.tags}>#{recipe.tags.join(", #")}</Text>
        </>
      )}

      <Text style={styles.detail}>
        Rating: {recipe.rating} ({recipe.reviewCount} reviews)
      </Text>

      {/* Like Button */}
      
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.likeButton, liked && styles.liked]} onPress={handleLike}>
          <Text style={styles.likeText}>{liked ? "🖤 Liked" : "🖤 Add to Like"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewLikedButton} onPress={() => navigation.navigate('LikedRecipes')}>
          <Text style={styles.viewLikedText}>View Liked Recipes</Text>
        </TouchableOpacity>
      </View>

  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  tags: {
    fontSize: 16,
    fontWeight: "800",
    color: "grey",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  likeButton: {
    alignSelf: 'center',
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 10,
    marginBottom: 10,
  },
  likeButton: {
    flex: 1, 
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 20,
    marginRight: 10, 
    alignItems: "center",
  },
  viewLikedButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },  
  liked: {
    backgroundColor: "#ff4d4d",
  },
  likeText: {
    fontSize: 16,
    color: "black",
  },
  viewLikedText: {
    fontSize: 16,
    color: "white",
  },
});

export default RecipeDetail;
