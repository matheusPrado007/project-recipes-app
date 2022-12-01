export const getDrinksApi = async () => {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    if (data.meals !== null) {
      return data;
    }
    return { meals: [] };
  } catch {
    return { meals: [] };
  }
};

export const getMealsApi = async () => {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const data = await response.json();
    if (data.drinks !== null) {
      return data;
    }
    return { drinks: [] };
  } catch {
    return { drinks: [] };
  }
};
