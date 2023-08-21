import cardFactory from "./factories/recipe/recipe.js";
import { findAll, search } from "./services/recipe.js";
import { initDropdown, optionDropdown, dropdownSearch } from "./services/dropdown.js";

let card = document.querySelector(".cardFactory");

async function initRecipe() {
    let recipes = await findAll();

    recipes.forEach(recipe => {
        let cardRecipeFactory = cardFactory(recipe);
        let cardDOM = cardRecipeFactory.createCard();
        card.appendChild(cardDOM);
    });

    let filterIngredients = optionDropdown(recipes, 'ingredients');
    let filterAppliance = optionDropdown(recipes, 'appliance');
    let filterUstensils = optionDropdown(recipes, 'ustensils');

    dropdownSearch(filterIngredients, 'ingredients');
    dropdownSearch(filterAppliance, 'appliance');
    dropdownSearch(filterUstensils, 'ustensils');


}

function displayCard(recipes) {
    card.innerHTML = "";
    recipes.forEach(recipe => {
        let cardRecipeFactory = cardFactory(recipe);
        let cardDOM = cardRecipeFactory.createCard();
        card.appendChild(cardDOM);
    });
}

function init() {
    initRecipe();
    initDropdown();
    search();
}

init();

export { displayCard };