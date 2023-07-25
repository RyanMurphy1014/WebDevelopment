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
const saveIcon = document.querySelector(".saveIcon");

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

updateListHTML();
displayHome();

//Apply Event Listeners
listOfListDivs.forEach((element) => {
  console.log(listOfListDivs);
  console.log(listofLists);
  element.addEventListener("click", () => {
    headerText.disabled = false;
    headerText.readOnly = false;
    activeList = element;
    clearMainContentPane();
    displayActiveList();
  });
});

homeButton.addEventListener("click", () => {
  activeList = null;
  clearMainContentPane();
  displayHome();
});

saveIcon.addEventListener("click", () => {
  listOfListDivs[activeIndex].dataset.listname = headerText.value;
  listofLists[activeIndex].listName = headerText.value;
  saveIcon.style.visibility = "hidden";
});

headerText.addEventListener("click", () => {
  if (activeList === null) {
    headerText.disabled = true;
  } else {
    headerText.disabled = false;
    saveIcon.style.visibility = "visible";
  }
});

headerText.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    listOfListDivs[activeIndex].dataset.listname = headerText.value;
    listofLists[activeIndex].listName = headerText.value;
    saveIcon.style.visibility = "hidden";
  }
});

//Functions
function clearMainContentPane() {
  listOfListDivs.forEach((element) => (element.style.visibility = "hidden"));
  document.querySelector("[data-contentPaneText]").innerHTML = null;
}

function displayActiveList() {
  let title = activeList.dataset.listname;
  headerText.value = title;
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
  let newListItemSaveIcon = document.querySelector(".newListItemSaveButton");

  newListItemTextbox.addEventListener("click", () => {
    newListItemSaveIcon.style.visibility = "visible";
  });

  newListItemTextbox.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      newListItemSaveIcon.style.visibility = "";
      listofLists[activeIndex].addListItem(newListItemTextbox.value);
      clearMainContentPane();
      displayActiveList();
    }
  });

  newListItemSaveIcon.addEventListener("click", () => {
    newListItemSaveIcon.style.visibility = "";
    listofLists[activeIndex].addListItem(newListItemTextbox.value);
    clearMainContentPane();
    displayActiveList();
  });
}

function displayHome() {
  if (hasListOfListsChanged === true) {
    updateListHTML();
  }

  activeList = null;
  activeIndex = null;

  headerText.disabled = true;

  listOfListDivs.forEach((element) => (element.style.visibility = "visible"));

  let thumbnailText = document.querySelectorAll("div p");
  for (let i = 0; i < listOfListDivs.length; i++) {
    thumbnailText[i].innerHTML = listofLists[i].listName;
  }

  headerText.value = "Notes";
  saveIcon.style.visibility = "hidden";
}

function updateListHTML() {
  listofLists.forEach((element) => {
    mainContentPane.innerHTML += "<div class='listThumbnail' data-listname='" + element.listName + "'><p></p></div>";
  });
  listOfListDivs = document.querySelectorAll("main div");
}
