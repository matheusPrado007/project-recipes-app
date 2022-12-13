// APIS REFERENTES À PÁGINA DE DETALHES
// DETAILS
export const mealDetailsByID = async (id) => {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await api.json();
  return result;
};

export const cocktailDetailsByID = async (id) => {
  const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const result = await api.json();
  return result;
};
// RECOMANDATIONS
export const mealRecomendationsByID = async () => {
  const api = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const result = await api.json();
  return result;
};

export const cocktailRecomendationsByID = async () => {
  const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const result = await api.json();
  return result;
};
