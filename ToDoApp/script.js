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
defaultList.listName = "Default List";
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

function clearMainContentPane() {
    listOfListDivs.forEach((element) => (element.style.visibility = "hidden"));
    contentPaneText.innerHTML = null;
}

function displayActiveList() {
    console.log(activeList);
    document.querySelector("header").innerText = activeList.dataset.listname;

    for (let i = 0; i < listofLists.length; i++) {
        for (let j = 0; j < listofLists[i].listItems.length; j++) {
            let id = "item" + j;
            contentPaneText.innerHTML +=
                "<li> <input type = 'checkbox' id = '" +
                id +
                "'> <label for=" +
                id +
                ">" +
                listofLists[i].listItems[j] +
                "</label></li>";
        }
    }
}

function displayHome() {
    listOfListDivs.forEach((element) => (element.style.visibility = "visible"));
    headerText.innerText = "Notes";
}
