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

        }
        else {
            filteredRecipes = baseRecipes.filter((recipe) => {
                return (
                    recipe.name.toLowerCase().includes('') ||
                    recipe.description.toLowerCase().includes('') ||
                    recipe.ingredients.some((ingredient) => {
                        return ingredient.ingredient.toLowerCase().includes('');
                    })
                );
            });
        }

        filterIngredients = optionDropdown(filteredRecipes, 'ingredients');
        filterAppliance = optionDropdown(filteredRecipes, 'appliance');
        filterUstensils = optionDropdown(filteredRecipes, 'ustensils');

        dropdownSearch(filterIngredients, 'ingredients');
        dropdownSearch(filterAppliance, 'appliance');
        dropdownSearch(filterUstensils, 'ustensils');

        searchByTag(selectedTag, filteredRecipes);

        numberRecipes.textContent = filteredRecipes.length + " recettes";

        manageTags();
    })

}

function searchByTag(tags) {
    selectedTag = tags;
    tagRecipe = filteredRecipes.length > 0 ? filteredRecipes : findAll();

    selectedTag.forEach(tag => {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.ingredients.some((ingredient) => {
                return ingredient.ingredient.toLowerCase().includes(tag);
            })
            ||
            recipe.appliance.toLowerCase().includes(tag)
            ||
            recipe.ustensils.some((ustensils) => {
                return ustensils.toLowerCase().includes(tag);
            })
        )
    })

    filterIngredients = optionDropdown(filteredRecipes, 'ingredients')

    filterAppliance = optionDropdown(filteredRecipes, 'appliance')

    filterUstensils = optionDropdown(filteredRecipes, 'ustensils')

    dropdownSearch(filterIngredients, 'ingredients');
    dropdownSearch(filterAppliance, 'appliance');
    dropdownSearch(filterUstensils, 'ustensils');

    displayCard(filteredRecipes);

    numberRecipes.textContent = filteredRecipes.length + " recettes";

    return filteredRecipes;
}

export { findAll, search, searchByTag };