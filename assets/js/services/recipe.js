import recipes from "../data/recipe.js";
import { optionDropdown, dropdownSearch } from "./dropdown.js";
import { displayCard } from "../index.js";
import { manageTags } from "./tag.js";

let filteredRecipes = []
let filterIngredients = []
let filterAppliance = []
let filterUstensils = []
let selectedTag = [];

const numberRecipes = document.getElementById("number-recipe");

function findAll() {
    return recipes;
}

function search() {
    const searchBar = document.getElementById("searchbar");

    searchBar.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();
        let baseRecipes = selectedTag.length > 0 ? filteredRecipes : findAll();
        let newFilteredRecipes = [];

        for (let i = 0; i < baseRecipes.length; i++) {
            let recipe = baseRecipes[i];
            let includeRecipe = false;

            if (searchString.length > 2) {
                if (recipe.name.toLowerCase().includes(searchString) ||
                    recipe.description.toLowerCase().includes(searchString)) {
                    includeRecipe = true;
                } else {
                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchString)) {
                            includeRecipe = true;
                            break;
                        }
                    }
                }
            } else {
                if (recipe.name.toLowerCase().includes('') ||
                    recipe.description.toLowerCase().includes('')) {
                    includeRecipe = true;
                } else {
                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        if (recipe.ingredients[j].ingredient.toLowerCase().includes('')) {
                            includeRecipe = true;
                            break;
                        }
                    }
                }
            }

            if (includeRecipe) {
                newFilteredRecipes.push(recipe);
            }
        }

        filteredRecipes = newFilteredRecipes;

        filterIngredients = optionDropdown(filteredRecipes, 'ingredients');
        filterAppliance = optionDropdown(filteredRecipes, 'appliance');
        filterUstensils = optionDropdown(filteredRecipes, 'ustensils');

        dropdownSearch(filterIngredients, 'ingredients');
        dropdownSearch(filterAppliance, 'appliance');
        dropdownSearch(filterUstensils, 'ustensils');

        searchByTag(selectedTag);

        numberRecipes.textContent = filteredRecipes.length + " recettes";

        manageTags();
    });
}

function searchByTag(tags) {
    let selectedTag = tags;
    let tagRecipe = filteredRecipes.length > 0 ? filteredRecipes : findAll();

    for (let i = 0; i < selectedTag.length; i++) {
        let tag = selectedTag[i];
        tagRecipe = tagRecipe.filter(recipe =>
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag))
            ||
            recipe.appliance.toLowerCase().includes(tag)
            ||
            recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
        );
    }

    let types = ['ingredients', 'appliance', 'ustensils'];
    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let filterResult = optionDropdown(tagRecipe, type);
        dropdownSearch(filterResult, type);
    }

    displayCard(tagRecipe);

    numberRecipes.textContent = tagRecipe.length + " recettes";

    return tagRecipe;
}


export { findAll, search, searchByTag };