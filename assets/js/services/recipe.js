import recipes from "../data/recipe.js";
import { optionDropdown, dropdownSearch } from "./dropdown.js";
import { displayCard } from "../index.js";

let filterIngredients = []
let filterAppliance = []
let filterUstensils = []

function findAll() {
    return recipes;
}

function search() {
    const searchBar = document.getElementById("searchbar");

    searchBar.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();

        if (searchString.length > 2) {
            const filteredRecipes = recipes.filter((recipe) => {
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
        }
    })

}

export { findAll, search };