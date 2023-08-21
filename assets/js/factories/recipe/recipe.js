export default function cardFactory(recipe) {
    let cardContainer = document.createElement("div");
    let imageContainer = document.createElement("div");
    let image = document.createElement("img");
    let cookingTime = document.createElement("div");
    let contentContainer = document.createElement("div");
    let recipeTitle = document.createElement("h3");
    let recipeDescription1 = document.createElement("p");
    let recipeDescription2 = document.createElement("p");
    let ingredients = document.createElement("p");
    let ingredientsContainer = document.createElement("div");

    function createCard() {
        cardContainer.classList.add("cardContainer");
        cardContainer.setAttribute("id", "1");

        imageContainer.classList.add("imageContainer");
        image.classList.add("recipeImage");
        image.setAttribute("src", "assets/img/recipe/" + recipe.image);
        image.setAttribute("alt", "image recette");
        cookingTime.classList.add("cookingTime");
        cookingTime.textContent = recipe.time + " min";
        imageContainer.appendChild(image);
        imageContainer.appendChild(cookingTime);

        contentContainer.classList.add("contentContainer");
        recipeTitle.classList.add("recipeTitle");
        recipeTitle.textContent = recipe.name;

        recipeDescription1.classList.add("recipeDescription1");
        recipeDescription1.textContent = "Recette";

        recipeDescription2.classList.add("recipeDescription2");
        recipeDescription2.textContent = recipe.description;

        ingredients.classList.add("ingredients");
        ingredients.textContent = "Ingrédients";

        ingredientsContainer.classList.add("ingredientsContainer");

        recipe.ingredients.forEach(ingredient => {
            let div = document.createElement("div");

            let ingredientName = document.createElement("p");
            ingredientName.classList.add("ingredientName");
            ingredientName.textContent = ingredient.ingredient;

            let ingredientQuantity = document.createElement("p");
            ingredientQuantity.classList.add("ingredientQuantity");
            let unitText = ingredient.unit ? " " + ingredient.unit : "";
            ingredientQuantity.textContent = ingredient.quantity + unitText;

            ingredientsContainer.appendChild(div);
            div.appendChild(ingredientName);
            div.appendChild(ingredientQuantity);
        });


        contentContainer.appendChild(recipeTitle);
        contentContainer.appendChild(recipeDescription1);
        contentContainer.appendChild(recipeDescription2);
        contentContainer.appendChild(ingredients);
        contentContainer.appendChild(ingredientsContainer);

        cardContainer.appendChild(imageContainer);
        cardContainer.appendChild(contentContainer);

        return (cardContainer);
    }

    return { createCard }
}