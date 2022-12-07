// FILTROS REFERENTES À PÁGINA DE DETALHES

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
