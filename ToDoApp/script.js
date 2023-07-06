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

//Frequently Used Elements
let listOfLists = document.querySelectorAll("main > div");
const homeButton = document.querySelector("[data-homeButton]");
const headerText = document.querySelector("header");
const mainContentPane = document.querySelector("main");

let activeList = null;
let activeListName;

//Instantiate Default List
let defaultList = new ToDoAppList();
defaultList.addListItem("Laundry");
defaultList.addListItem("Shopping");
defaultList.associatedElement = listOfLists[0];

//Apply Event Listeners
listOfLists.forEach((element) => {
    element.addEventListener("click", () => {
        activeList = element;
        console.log(activeList);
        activeListName = activeList.dataset.listname;
        clearMainContentPane();
        displayActiveList();
    });
});

homeButton.addEventListener("click", () => {
    activeList = null;
    clearMainContentPane();
    displayHome();
});

console.log(listOfLists);

function clearMainContentPane() {
    listOfLists.forEach((element) => (element.style.visibility = "hidden"));
}

function displayActiveList() {
    document.querySelector("header").innerText = activeListName;
}

function displayHome() {
    listOfLists.forEach((element) => (element.style.visibility = "visible"));
    headerText.innerText = "Notes";
}
