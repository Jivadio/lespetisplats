function initDropdown() {
    openDropdown('ingredient');
    openDropdown('device');
    openDropdown('tool');
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

export default initDropdown;