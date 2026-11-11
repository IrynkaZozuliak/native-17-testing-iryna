import axios from "axios";

export const apiURL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchMeal = async (searchQuery) => {
  try {
    const endpoint = searchQuery ? `search.php?s=${searchQuery}` : "random.php";
    const response = await axios.get(`${apiURL}${endpoint}`);
    return response?.data?.meals?.[0]; 
  } catch (error) {
    console.error(error);
    return null;
  }
};
