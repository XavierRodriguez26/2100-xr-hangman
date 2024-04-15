// Initializing all the variables we created in the HTML 

const WordContainer = document.getelemenybyid('letter-container');
const OptionsContainer = document.getelemenybyid('options-container');
const UserInput = document.getelemenybyid('user-input');
const NewCame = document.getelemenybyid('new-game');
const GameButton = document.getelemenybyid('new-game-button');
const Canvas = document.getelemenybyid('letter-container');
const ResultText = document.getelemenybyid('letter-container');

// Option Values - Values will randomly be chosen when New Game button is clicked

let options = {
    CarBrand: [
        "Toyota",
        "Honda",
        "Hyundai",
        "Ford",
        "Chevrolet",
        "Jeep",
        "Dodge",
    ],

    Colors: [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple"
    ],
};