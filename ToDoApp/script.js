class ToDoAppList {
  listItems = [];
  isListItemComplete = [];
  listName;

  addListItem(item) {
    this.listItems.push(item);
    this.isListItemComplete.push("F");
  }

  completeItem(index) {
    this.isListItemComplete[index] = "T";
  }

  uncompleteItem(index) {
    this.isListItemComplete[index] = "F";
  }

  removeListItem(index) {
    this.listItems.splice(index, 1);
    this.isListItemComplete.splice(index, 1);
  }
}

//Frequently Used Elements
let listOfListDivs;
let listofLists = [];

const homeButton = document.querySelector("[data-homeButton]");
const headerText = document.querySelector(".noteTitle");
const mainContentPane = document.querySelector("main");
const contentPaneText = document.querySelector("[data-contentPaneText]");
const listTitleSaveIcon = document.querySelector(".saveIcon");

let activeList = null;
let activeIndex;

//Instantiate Default List
headerText.disabled = true;
let defaultList = new ToDoAppList();
defaultList.addListItem("Laundry");
defaultList.addListItem("Shopping");
defaultList.addListItem("Cleaning");
defaultList.listName = "Default List";

//Mark item as complete
defaultList.completeItem(0);
listofLists.push(defaultList);

//State Variables
let hasListOfListsChanged = false;
let uniqueIdCounter = 0;

updateListHTML();
displayHome();

//Apply Event Listeners
listOfListDivs.forEach((element) => {
  element.addEventListener("click", () => {
    headerText.disabled = false;
    headerText.readOnly = false;
    activeList = element;
    clearMainContentPane();
    displayActiveList();
  });
});

document.querySelector(".addList").addEventListener("click", () => {
  let placeholderList = new ToDoAppList();
  placeholderList.listName = "NewList" + uniqueIdCounter;
  listofLists.push(placeholderList);

  hasListOfListsChanged = true;
  displayHome();
  clearMainContentPane();

  activeIndex = listofLists.length - 1;
  activeList = document.querySelector("[data-listname=NewList" + uniqueIdCounter + "]");
  uniqueIdCounter++;
  displayActiveList();
});

homeButton.addEventListener("click", () => {
  activeList = null;
  clearMainContentPane();
  displayHome();
});

listTitleSaveIcon.addEventListener("click", () => {
  listOfListDivs[activeIndex].dataset.listname = headerText.value;
  listofLists[activeIndex].listName = headerText.value;
  listTitleSaveIcon.style.visibility = "hidden";
  activeList = document.querySelector("[data-listname='" + headerText.value + "']");
  clearMainContentPane();
  displayActiveList();
});

headerText.addEventListener("click", () => {
  if (activeList === null) {
    headerText.disabled = true;
  } else {
    headerText.disabled = false;
    listTitleSaveIcon.style.visibility = "visible";
  }
});

headerText.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    listOfListDivs[activeIndex].dataset.listname = headerText.value;
    listofLists[activeIndex].listName = headerText.value;
    listTitleSaveIcon.style.visibility = "hidden";
    activeList = document.querySelector("[data-listname='" + headerText.value + "']");
    clearMainContentPane();
    displayActiveList();
  }
});

//Functions
function clearMainContentPane() {
  document.querySelector(".addList").style.visibility = "hidden";
  listOfListDivs.forEach((element) => (element.style.visibility = "hidden"));
  document.querySelector("[data-contentPaneText]").innerHTML = null;
}

function displayActiveList() {
  let title = activeList.dataset.listname;
  headerText.value = title;
  headerText.disabled = false;
  for (let i = 0; i < listofLists.length; i++) {
    if (listofLists[i].listName === activeList.dataset.listname) {
      activeIndex = i;
      for (let j = 0; j < listofLists[i].listItems.length; j++) {
        let id = "item" + j;
        document.querySelector("[data-contentPaneText]").innerHTML += "<li> <input type = 'checkbox' id = '" + id + "' class = 'checkBox'> <label for=" + id + ">" + listofLists[i].listItems[j] + "</label></li>";
      }
    }
  }
  document.querySelector("[data-contentPaneText]").innerHTML +=
    "<div class = 'newListItemContainer'><input class = 'newListItemTextbox' type = 'text' placeholder = 'Add new Item' ></input>" +
    "<svg class = 'newListItemSaveButton' width='25' height='25' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>" +
    "<path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z'></path>" +
    "<path d='M17 21v-8H7v8'></path>" +
    "<path d='M7 3v5h8'></path>" +
    "</svg></div>";

  for (let i = 0; i < listofLists[activeIndex].isListItemComplete.length; i++) {
    if (listofLists[activeIndex].isListItemComplete[i] === "T") {
      document.querySelector("#item" + i).checked = true;
    } else {
      document.querySelector("#item" + i).checked = false;
    }
  }

  let checkBoxes = document.querySelectorAll(".checkBox");
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("change", () => {
      if (checkBoxes[i].checked === true) {
        listofLists[activeIndex].completeItem(i);
      } else {
        listofLists[activeIndex].uncompleteItem(i);
      }
    });
  }

  let newListItemTextbox = document.querySelector(".newListItemTextbox");
  let newListItemSaveButton = document.querySelector(".newListItemSaveButton");

  newListItemTextbox.addEventListener("click", () => {
    newListItemSaveButton.style.visibility = "visible";
  });

  newListItemTextbox.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      newListItemSaveButton.style.visibility = "";
      listofLists[activeIndex].addListItem(newListItemTextbox.value);
      clearMainContentPane();
      displayActiveList();
    }
  });

  newListItemSaveButton.addEventListener("click", () => {
    newListItemSaveButton.style.visibility = "hidden";
    listofLists[activeIndex].addListItem(newListItemTextbox.value);
    clearMainContentPane();
    displayActiveList();
  });
}

function displayHome() {
  if (hasListOfListsChanged === true) {
    updateEndofListHTML();
  }

  activeList = null;
  activeIndex = null;

  headerText.disabled = true;

  listOfListDivs.forEach((element) => (element.style.visibility = "visible"));
  document.querySelector(".addList").style.visibility = "visible";

  let thumbnailText = document.querySelectorAll("div p");
  for (let i = 0; i < listOfListDivs.length; i++) {
    thumbnailText[i].innerHTML = listofLists[i].listName;
  }

  headerText.value = "Notes";
  listTitleSaveIcon.style.visibility = "hidden";
  hasListOfListsChanged = false;

  listOfListDivs.forEach((element) => {
    element.addEventListener("click", () => {
      headerText.disabled = false;
      headerText.readOnly = false;
      activeList = element;
      clearMainContentPane();
      displayActiveList();
    });
  });
}

function updateListHTML() {
  listofLists.forEach((element) => {
    let htmlFragment = "<div class='listThumbnail' data-listname='" + element.listName + "'><p></p></div>";

    mainContentPane.innerHTML = htmlFragment + mainContentPane.innerHTML;
  });
  listOfListDivs = document.querySelectorAll("main div");
}

function updateEndofListHTML() {
  let index = listofLists.length - 1;
  let htmlFragment = "<div class='listThumbnail' data-listname='" + listofLists[index].listName + "'><p></p></div>";
  mainContentPane.innerHTML = htmlFragment + mainContentPane.innerHTML;

  listOfListDivs = document.querySelectorAll("main div");
}
