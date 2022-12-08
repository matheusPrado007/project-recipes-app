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

export const getCategoriesMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getCategoriesDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getFilter = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals;
};

export const getFilterDrink = async (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.drinks;
};

export const getDrinkCategoryApi = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks;
};

export const getMealsCategoryApi = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.meals;
};
