import cardFactory from "./factories/recipe/recipe.js";
import findAll from "./services/recipe.js";
import initDropdown from "./services/dropdown.js";

let card = document.querySelector(".cardFactory");

async function initRecipe() {
    findAll().forEach(recipe => {
        let cardRecipeFactory = cardFactory(recipe);
        let cardDOM = cardRecipeFactory.createCard();
        card.appendChild(cardDOM);
    });
}

function init() {
    initRecipe();
    initDropdown();
}

init();