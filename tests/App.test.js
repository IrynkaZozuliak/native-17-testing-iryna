
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import App from "../App";
import { fetchMeal } from "../services/mealService";

jest.mock("../services/mealService", () => ({
  fetchMeal: jest.fn(),
}));

jest.mock("../components/MealDisplay", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return ({ meal }) => (
    <Text testID="mealDisplay">{meal.strMeal}</Text>
  );
});

describe("App component", () => {
  const mockMeal = {
    idMeal: "52772",
    strMeal: "Chicken Teriyaki",
    strMealThumb: "https://example.com/chicken.jpg",
    strInstructions: "Cook the chicken.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a random meal when the app starts", async () => {
    fetchMeal.mockResolvedValue(mockMeal);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledWith("");
      expect(getByText("Chicken Teriyaki")).toBeTruthy();
    });
  });

  it("should display a meal when one is found", async () => {
    fetchMeal.mockResolvedValue(mockMeal);

    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId("mealDisplay")).toBeTruthy();
    });
  });

  it("should display a message when no meal is found", async () => {
    fetchMeal.mockResolvedValue(null);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText("No meal was found")).toBeTruthy();
    });
  });

  it("should allow entering a meal name", async () => {
    fetchMeal.mockResolvedValue(mockMeal);

    const { getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText("Enter a meal name");

    fireEvent.changeText(input, "chicken");

    expect(input.props.value).toBe("chicken");
  });

  it("should search for a meal when Get Meal button is pressed", async () => {
    fetchMeal.mockResolvedValue(mockMeal);

    const { getByPlaceholderText, getByText } = render(
      <App />
    );

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledTimes(1);
    });

    const input = getByPlaceholderText("Enter a meal name");

    fireEvent.changeText(input, "chicken");
    fireEvent.press(getByText("Get Meal"));

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenLastCalledWith("chicken");
    });
  });

  it("should clear the input after pressing Get Meal", async () => {
    fetchMeal.mockResolvedValue(mockMeal);

    const { getByPlaceholderText, getByText } = render(
      <App />
    );

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledTimes(1);
    });

    const input = getByPlaceholderText("Enter a meal name");

    fireEvent.changeText(input, "chicken");
    fireEvent.press(getByText("Get Meal"));

    await waitFor(() => {
      expect(input.props.value).toBe("");
    });
  });

  it("should fetch a new random meal when input is empty", async () => {
    fetchMeal.mockResolvedValue(mockMeal);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenCalledTimes(1);
    });

    fireEvent.press(getByText("Get Meal"));

    await waitFor(() => {
      expect(fetchMeal).toHaveBeenLastCalledWith("");
      expect(fetchMeal).toHaveBeenCalledTimes(2);
    });
  });
});
