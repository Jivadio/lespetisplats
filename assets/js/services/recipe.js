import recipes from "../data/recipe.js";
import { optionDropdown, dropdownSearch } from "./dropdown.js";
import { displayCard } from "../index.js";
import { manageTags } from "./tag.js";

let filteredRecipes = []
let filterIngredients = []
let filterAppliance = []
let filterUstensils = []

const numberRecipes = document.getElementById("number-recipe");

function findAll() {
    return recipes;
}

function search() {
    const searchBar = document.getElementById("searchbar");

    searchBar.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();

        if (searchString.length > 2) {
            filteredRecipes = recipes.filter((recipe) => {
                return (
                    recipe.name.toLowerCase().includes(searchString) ||
                    recipe.description.toLowerCase().includes(searchString) ||
                    recipe.ingredients.some((ingredient) => {
                        return ingredient.ingredient.toLowerCase().includes(searchString);
                    })
                );
            });

            filterIngredients = optionDropdown(filteredRecipes, 'ingredients');
            filterAppliance = optionDropdown(filteredRecipes, 'appliance');
            filterUstensils = optionDropdown(filteredRecipes, 'ustensils');

            dropdownSearch(filterIngredients, 'ingredients');
            dropdownSearch(filterAppliance, 'appliance');
            dropdownSearch(filterUstensils, 'ustensils');

            displayCard(filteredRecipes);

            numberRecipes.textContent = filteredRecipes.length + " recettes";

            manageTags();
        }
    })

}

function searchByTag(tags, recipes) {
    recipes = filteredRecipes.length > 0 ? filteredRecipes : findAll();

    tags.forEach(tag => {
        recipes = recipes.filter(recipe =>
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

    filterIngredients = optionDropdown(recipes, 'ingredients')

    filterAppliance = optionDropdown(recipes, 'appliance')

    filterUstensils = optionDropdown(recipes, 'ustensils')

    dropdownSearch(filterIngredients, 'ingredients');
    dropdownSearch(filterAppliance, 'appliance');
    dropdownSearch(filterUstensils, 'ustensils');

    displayCard(recipes);

    numberRecipes.textContent = recipes.length + " recettes";

    return recipes;
}

export { findAll, search, searchByTag };