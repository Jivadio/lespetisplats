import cardFactory from "./factories/recipe/recipe.js";
import findAll from "./services/recipe.js";

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
}

init();