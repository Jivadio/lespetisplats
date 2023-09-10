import recipes from "../data/recipe.js";
import { optionDropdown, dropdownSearch } from "./dropdown.js";
import { displayCard } from "../index.js";
import { manageTags } from "./tag.js";

let filteredRecipes = [];
let filterIngredients = [];
let filterAppliance = [];
let filterUstensils = [];
let selectedTag = [];
let tagsRecipe = [];

function findAll() {
  return recipes;
}

const numberRecipes = document.getElementById("number-recipe");
const containerCard = document.getElementsByClassName("cardFactory");
const noRecipeVar = document.getElementById("no-recipe");

function search() {
  const searchBar = document.getElementById("searchbar");

  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    let baseRecipes = selectedTag.length > 0 ? tagsRecipe : findAll();

    if (searchString.length > 2) {
      filteredRecipes = baseRecipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(searchString) ||
          recipe.description.toLowerCase().includes(searchString) ||
          recipe.ingredients.some((ingredient) => {
            return ingredient.ingredient.toLowerCase().includes(searchString);
          })
        );
      });
    } else {
      filteredRecipes = baseRecipes;
    }

    if (filteredRecipes.length == 0) {
      noRecipe(searchString);
    } else {
      containerCard[0].style.display = "grid";
      noRecipeVar.style.display = "none";
    }

    filterIngredients = optionDropdown(filteredRecipes, "ingredients");
    filterAppliance = optionDropdown(filteredRecipes, "appliance");
    filterUstensils = optionDropdown(filteredRecipes, "ustensils");

    dropdownSearch(filterIngredients, "ingredients");
    dropdownSearch(filterAppliance, "appliance");
    dropdownSearch(filterUstensils, "ustensils");

    numberRecipes.textContent = filteredRecipes.length + " recettes";

    displayCard(filteredRecipes);
    manageTags();
  });
}

function filterByTags(tags) {
  let tagRecipe = findAll();

  tags.forEach((tag) => {
    tagRecipe = tagRecipe.filter(
      (recipe) =>
        recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient.toLowerCase().includes(tag);
        }) ||
        recipe.appliance.toLowerCase().includes(tag) ||
        recipe.ustensils.some((ustensils) => {
          return ustensils.toLowerCase().includes(tag);
        })
    );
  });

  return tagRecipe;
}

function searchByTag(tags) {
  selectedTag = tags;

  const tagRecipe = filterByTags(selectedTag);

  filterIngredients = optionDropdown(tagRecipe, "ingredients");
  filterAppliance = optionDropdown(tagRecipe, "appliance");
  filterUstensils = optionDropdown(tagRecipe, "ustensils");

  dropdownSearch(filterIngredients, "ingredients");
  dropdownSearch(filterAppliance, "appliance");
  dropdownSearch(filterUstensils, "ustensils");

  displayCard(tagRecipe);

  numberRecipes.textContent = tagRecipe.length + " recettes";

  tagsRecipe = tagRecipe;
}

function noRecipe(value) {
  console.log(value);
  noRecipeVar.textContent =
    "Aucune recette ne contient '" +
    value +
    "', vous pouvez chercher « tarte aux pommes », « poisson », etc...";
  containerCard[0].style.display = "none";
  noRecipeVar.style.display = "block";
}

export { findAll, search, searchByTag };
