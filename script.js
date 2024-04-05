// Array of words for the game
let words = ["hangman", "javascript", "computer", "programming", "internet"];

// Variable to store the chosen word
let chosenWord = "";

// Function to choose a random word from the array
function chooseWord() {
    return words[Math.floor(Math.random() * words.length)];
}


// Initialize the game
function init() {
    const word = chooseWord();
    console.log("Word to guess:", chosenWord); // For testing purposes, you can remove this line later
}

// Call the init function when the page loads
window.onload = init;