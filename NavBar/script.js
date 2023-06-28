let activeDropDownMenu = null;

document.addEventListener("click", (e) => {
  if (activeDropDownMenu != null) {
    hideDropDown();
  }

  if (!e.target.matches("[data-dropDownButton]") || e.target === activeDropDownMenu) {
    hideDropDown();
    activeDropDownMenu = null;
    return;
  }

  activeDropDownMenu = e.target;
  showDropDown();
  return;
});

function showDropDown() {
  activeDropDownMenu.nextElementSibling.style.opacity = 1;
}

function hideDropDown() {
  if (activeDropDownMenu === null) {
    return;
  }
  activeDropDownMenu.nextElementSibling.style.opacity = 0;
  return;
}
