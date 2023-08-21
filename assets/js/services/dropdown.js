function initDropdown() {
    openDropdown('ingredients');
    openDropdown('appliance');
    openDropdown('ustensils');
}

function openDropdown(option) {
    let dropdownButton = document.getElementById('dropdown-' + option);
    let dropdownChevron = document.getElementById('dropdown-chevron-' + option);
    let dropdownContent = document.querySelector('#dropdown-content-' + option);

    dropdownButton.addEventListener('click', function () {
        if (dropdownContent.classList.contains('dropdown-close')) {
            dropdownContent.classList.remove('dropdown-close');
            dropdownContent.classList.add('dropdown-open');

            dropdownChevron.classList.add('dropdown-chevron-rotate');
        }
        else {
            dropdownContent.classList.remove('dropdown-open');
            dropdownContent.classList.add('dropdown-close');
            dropdownChevron.classList.remove('dropdown-chevron-rotate');
        }
    });
}

function optionDropdown(recipes, option) {
    let selectedOption = [];
    const dropdown = document.getElementById('dropdown-' + option + '-option');
    dropdown.innerHTML = '';

    recipes.forEach(recipe => {
        switch (option) {
            case 'ingredients':
                recipe.ingredients.forEach(ingredient => {
                    if (!selectedOption.includes(ingredient.ingredient.toLowerCase())) {
                        selectedOption.push(ingredient.ingredient.toLowerCase())
                        selectedOption = selectedOption.sort((a, b) => {
                            return a.localeCompare(b)
                        })
                    }
                });
                break;
            case 'appliance':
                recipes.forEach(appliance => {
                    if (!selectedOption.includes(appliance.appliance.toLowerCase())) {
                        selectedOption.push(appliance.appliance.toLowerCase())
                        selectedOption = selectedOption.sort((a, b) => {
                            return a.localeCompare(b)
                        })
                    }
                })
                break;
            case 'ustensils':
                recipe.ustensils.forEach(ustensil => {
                    if (!selectedOption.includes(ustensil.toLowerCase())) {
                        selectedOption.push(ustensil.toLowerCase())
                        selectedOption = selectedOption.sort((a, b) => {
                            return a.localeCompare(b)
                        })
                    }
                });
                break;
        }
    })

    selectedOption.forEach(option => {
        let optionElement = document.createElement('li');
        optionElement.classList.add('dropdown-option');
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    })
}

export { initDropdown, optionDropdown };