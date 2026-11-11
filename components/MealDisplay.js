import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";

const MealDisplay = ({ meal }) => (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Image
        testID="mealImage"
        source={{ uri: meal.strMealThumb }}
        style={styles.image}
      />
      <Text style={styles.description}>{meal.strInstructions}</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default MealDisplay;
