
import React from "react";
import { render } from "@testing-library/react-native";
import MealDisplay from "../components/MealDisplay";

describe("MealDisplay component", () => {
  const mockMeal = {
    strMeal: "Chicken Teriyaki",
    strMealThumb: "https://example.com/chicken.jpg",
    strInstructions: "Cook the chicken with teriyaki sauce.",
  };

  it("should render the meal name", () => {
    const { getByText } = render(
      <MealDisplay meal={mockMeal} />
    );

    expect(getByText("Chicken Teriyaki")).toBeTruthy();
  });

  it("should render meal instructions", () => {
    const { getByText } = render(
      <MealDisplay meal={mockMeal} />
    );

    expect(
      getByText("Cook the chicken with teriyaki sauce.")
    ).toBeTruthy();
  });

  it("should render the meal image", () => {
    const { getByTestId } = render(
      <MealDisplay meal={mockMeal} />
    );

    const image = getByTestId("mealImage");

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({
      uri: "https://example.com/chicken.jpg",
    });
  });

  it("should render all meal information", () => {
    const { getByText, getByTestId } = render(
      <MealDisplay meal={mockMeal} />
    );

    expect(getByText(mockMeal.strMeal)).toBeTruthy();
    expect(getByText(mockMeal.strInstructions)).toBeTruthy();
    expect(getByTestId("mealImage")).toBeTruthy();
  });
});
