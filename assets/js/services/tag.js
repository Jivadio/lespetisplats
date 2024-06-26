import { closeDropdown } from "./dropdown.js";
import { searchByTag } from "./recipe.js";

let selectedTag = [];
let filtredTags = [];
const tags = document.querySelector("#tags-container");

function diplayTag(element) {
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

async function deleteTag(array) {
  const deleteTag = document.querySelectorAll(".delete-tag");

  deleteTag.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      const tagContainer = e.target.parentElement;
      const tagText = tagContainer.textContent.toLowerCase();
      const index = array.indexOf(tagText);
      array.splice(index, 1);
      tagContainer.remove();
      searchByTag(array);

      manageTags();
    });
  });

  return array;
}

async function manageTags() {
  const dropdownOption = document.querySelectorAll(".dropdown-option");

  dropdownOption.forEach((option) => {
    option.addEventListener("click", (e) => {
      if (!selectedTag.includes(e.target.textContent.toLowerCase())) {
        selectedTag.push(e.target.textContent);

        const tags = document.querySelector("#tags-container");
        tags.innerHTML = "";

        selectedTag.forEach((tag) => {
          diplayTag(tag);
        });

        closeDropdown(e);

        filtredTags = searchByTag(selectedTag);

        deleteTag(selectedTag);
        searchByTag(selectedTag);
      }
    });
  });

  return filtredTags;
}

export { diplayTag, manageTags };
