import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MealDisplay from "./components/MealDisplay";
import { fetchMeal } from "./services/mealService";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    (async () => {
      setMeal(await fetchMeal(inputValue));
    })();
  }, []);

  const handleGetMeal = async () => {
    setMeal(await fetchMeal(inputValue));
    setInputValue("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Enter a meal name"
        />
        <Button title="Get Meal" onPress={handleGetMeal} />
        {meal ? (
          <MealDisplay meal={meal} />
        ) : (
          <Text style={styles.text}>No meal was found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default App;
