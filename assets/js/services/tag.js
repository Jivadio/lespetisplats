import { closeDropdown } from "./dropdown.js";
import { findAll, searchByTag } from "./recipe.js";

let selectedTag = [];

function diplayTag(element) {
    const tags = document.getElementById("tags-container");
    const tag = document.createElement("div");
    tag.classList.add("tag-container");
    tag.innerHTML = element.charAt(0).toUpperCase() + element.slice(1);

    tags.appendChild(tag);

    const deleteTag = document.createElement("img");
    deleteTag.classList.add("delete-tag");
    deleteTag.setAttribute("src", "assets/img/delete.svg");
    deleteTag.setAttribute("alt", "delete tag");
    tag.appendChild(deleteTag);

    return tags;
}

function deleteTag(array) {
    const deleteTag = document.querySelectorAll(".delete-tag");

    deleteTag.forEach(tag => {
        tag.addEventListener("click", (e) => {
            const tagContainer = e.target.parentElement;
            const tagText = tagContainer.textContent.toLowerCase();
            const index = array.indexOf(tagText);
            array.splice(index, 1);
            tagContainer.remove();
        })
    })

}

async function manageTags() {
    const dropdownOption = document.querySelectorAll(".dropdown-option");
    let recipes = await findAll();

    dropdownOption.forEach(option => {
        option.addEventListener("click", (e) => {
            if (!selectedTag.includes(e.target.textContent.toLowerCase())) {
                selectedTag = [];
                selectedTag.push(e.target.textContent);

                selectedTag.forEach(tag => {
                    diplayTag(tag);
                })

                deleteTag(selectedTag);
                closeDropdown(e);
                searchByTag(selectedTag, recipes);
            }
        })
    })
}

export { diplayTag, manageTags };