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

  logListItems() {
    this.listItems.forEach((element) => {
      console.log(element);
    });
  }
}

//Frequently Used Elements
let listOfListDivs = document.querySelectorAll("main > div");
let listofLists = [];

const homeButton = document.querySelector("[data-homeButton]");
const headerText = document.querySelector("header");
const mainContentPane = document.querySelector("main");
const contentPaneText = document.querySelector("[data-contentPaneText]");

let activeList = null;

//Instantiate Default List
let defaultList = new ToDoAppList();
defaultList.addListItem("Laundry");
defaultList.addListItem("Shopping");
defaultList.addListItem("Third");
defaultList.listName = "Default List";
//Mark item as complete
defaultList.completeItem(0);
listofLists.push(defaultList);

//Apply Event Listeners
listOfListDivs.forEach((element) => {
  element.addEventListener("click", () => {
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

//Functions
function clearMainContentPane() {
  listOfListDivs.forEach((element) => (element.style.visibility = "hidden"));
  contentPaneText.innerHTML = null;
}

function displayActiveList() {
  let activeIndex;
  document.querySelector("header").innerText = activeList.dataset.listname;
  for (let i = 0; i < listofLists.length; i++) {
    if (listofLists[i].listName === activeList.dataset.listname) {
      activeIndex = i;
      for (let j = 0; j < listofLists[i].listItems.length; j++) {
        console.log(listofLists[i].isListItemComplete[j]);
        let id = "item" + j;
        contentPaneText.innerHTML += "<li> <input type = 'checkbox' id = '" + id + "'> <label for=" + id + ">" + listofLists[i].listItems[j] + "</label></li>";
      }
    }
  }

  for (let i = 0; i < listofLists[activeIndex].isListItemComplete.length; i++) {
    if (listofLists[activeIndex].isListItemComplete[i] === "T") {
      document.querySelector("#item" + i).checked = true;
    } else {
      document.querySelector("#item" + i).checked = false;
    }
  }

  let checkBoxes = document.querySelectorAll("input");
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("change", () => {
      if (checkBoxes[i].checked === true) {
        listofLists[activeIndex].completeItem(i);
      } else {
        listofLists[activeIndex].uncompleteItem(i);
      }
    });
  }
}

function displayHome() {
  listOfListDivs.forEach((element) => (element.style.visibility = "visible"));
  headerText.innerText = "Notes";
}
