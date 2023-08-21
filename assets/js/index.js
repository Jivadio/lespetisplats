import cardFactory from "./factories/recipe/recipe.js";
import { findAll, search } from "./services/recipe.js";
import { initDropdown, optionDropdown } from "./services/dropdown.js";

let card = document.querySelector(".cardFactory");

async function initRecipe() {
    let recipes = await findAll();

    recipes.forEach(recipe => {
        let cardRecipeFactory = cardFactory(recipe);
        let cardDOM = cardRecipeFactory.createCard();
        card.appendChild(cardDOM);
    });

    optionDropdown(recipes, 'ingredients');
    optionDropdown(recipes, 'appliance');
    optionDropdown(recipes, 'ustensils');
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