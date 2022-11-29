// FILTROS REFERENTES A PÁGINA DE COMIDA

export async function filterMealsByIngredient(ingrediente) {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await api.json();
  return result;
}

export async function filterMealsByName(nome) {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const result = await api.json();
  return result;
}

export async function filterMealsByFistLetter(primeiraLetra) {
  const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const result = await api.json();
  return result;
}

// FILTROS REFERENTES A PÁGINA DE BEBIDAS

export async function filterDrinksByIngredient(ingrediente) {
  const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await api.json();
  return result;
}

export async function filterDrinksByName(nome) {
  const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const result = await api.json();
  return result;
}

export async function filterDrinksByFistLetter(primeiraLetra) {
  const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const result = await api.json();
  return result;
}
