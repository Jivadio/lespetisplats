import recipes from "../data/recipe.js";
import { optionDropdown } from "./dropdown.js";
import { displayCard } from "../index.js";

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

            optionDropdown(filteredRecipes, 'ingredients');
            optionDropdown(filteredRecipes, 'appliance');
            optionDropdown(filteredRecipes, 'ustensils');

            displayCard(filteredRecipes);
        }
    })

}

export { findAll, search };