
import axios from "axios";
import { fetchMeal, apiURL } from "../services/mealService";

jest.mock("axios");

describe("mealService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a random meal when search query is empty", async () => {
    const mockMeal = {
      idMeal: "52772",
      strMeal: "Teriyaki Chicken",
    };

    axios.get.mockResolvedValue({
      data: {
        meals: [mockMeal],
      },
    });

    const result = await fetchMeal("");

    expect(axios.get).toHaveBeenCalledWith(
      `${apiURL}random.php`
    );
    expect(result).toEqual(mockMeal);
  });

  it("should search for a meal by its name", async () => {
    const mockMeal = {
      idMeal: "52772",
      strMeal: "Teriyaki Chicken",
    };

    axios.get.mockResolvedValue({
      data: {
        meals: [mockMeal],
      },
    });

    const result = await fetchMeal("chicken");

    expect(axios.get).toHaveBeenCalledWith(
      `${apiURL}search.php?s=chicken`
    );
    expect(result).toEqual(mockMeal);
  });

  it("should return undefined when no meal is found", async () => {
    axios.get.mockResolvedValue({
      data: {
        meals: null,
      },
    });

    const result = await fetchMeal("unknown");

    expect(result).toBeUndefined();
  });

  it("should return undefined when response has no meals property", async () => {
    axios.get.mockResolvedValue({
      data: {},
    });

    const result = await fetchMeal("chicken");

    expect(result).toBeUndefined();
  });

  it("should return null when request fails", async () => {
    const error = new Error("Network error");

    axios.get.mockRejectedValue(error);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await fetchMeal("chicken");

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);

    consoleErrorSpy.mockRestore();
  });
});
