class Person {
    constructor(name, rating, desciption) {
        this.name = name;
        this.rating = rating;
        this.desciption = desciption;
    }
}

let person1 = new Person(
    "Joe",
    2,
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, suscipit?"
);
let person2 = new Person(
    "Amy",
    5,
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
);
let person3 = new Person("Mary", 4, "Lorem ipsum dolor sit amet.");

personList = [person1, person2, person3];
let personIndex = 0;

updateContentPane(personIndex, personList[personIndex]);

function changePerson(directionIndication) {
    if (directionIndication === -1 && personIndex === 0) {
        return;
    }
    if (directionIndication === 1 && personIndex === 2) {
        return;
    }

    personIndex += directionIndication;

    updateContentPane(personIndex, personList[personIndex]);
}

function updateContentPane(personIndex, currentPerson) {
    document.getElementById("profilePicture").src =
        "images/headshot" + (personIndex + 1) + ".png";

    document.getElementById("rating").src =
        "images/" + currentPerson.rating + "star.png";
    document.querySelector("p").innerHTML = currentPerson.desciption;
}
