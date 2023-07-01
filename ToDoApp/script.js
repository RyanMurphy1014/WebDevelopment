class ToDoAppList {
  associatedElement;
  listItems = [];
  isListItemComplete = [];

  addListItem(item) {
    this.listItems.push(item);
    this.isListItemComplete.push("F");
  }

  completeItem(index) {
    this.isListItemComplete[index] = "T";
  }

  removeListItem(index) {
    this.listItems.splice(index, 1);
    this.isListItemComplete.splice(index, 1);
  }
}

let listOfLists = document.querySelectorAll("main > div");

let activeList = null;
let activeListName;

let defaultList = new ToDoAppList();
defaultList.addListItem("Laundry");
defaultList.addListItem("Shopping");
defaultList.associatedElement = listOfLists[0];

listOfLists.forEach((element) => {
  element.addEventListener("click", () => {
    activeList = element;
    console.log(activeList);
    activeListName = activeList.dataset.listname;
    clearMainContentPane();
    displayActiveList();
  });
});

console.log(listOfLists);

function clearMainContentPane() {
  listOfLists.forEach((element) => (element.style.visibility = "hidden"));
}

function displayActiveList() {
  document.querySelector("header").innerText = activeListName;
}

function displayHome() {
  listOfLists.forEach((element) => (element.style.visibility = "visibile"));
}
