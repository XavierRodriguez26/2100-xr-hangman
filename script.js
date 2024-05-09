// Initializing all the variables we created in the HTML 

// This entire seciton of code is assigning constant variables to the variables that are withing our index.html page to use through our code
const WordContainer = document.getElementById('letter-container'); 
const OptionsContainer = document.getElementById('options-container');
const UserInput = document.getElementById('user-input-section');
const NewGame = document.getElementById('new-game-container');
const GameButton = document.getElementById('new-game-button');
const Canvas = document.getElementById('canvas');
const ResultText = document.getElementById('results');

// Option Values - Values will randomly be chosen when New Game button is clicked

// THIS CODE MAY CHANGE TO UTILIZE A WORDLIST / GENERATOR TO ACCOMODATE FOR PROMISE SECTION OF RUBRIC
let options = {
    car_brand: [
        "TOYOTA",
        "HONDA",
        "FORD",
        "CHEVROLET",
        "JEEP",
        "DODGE",
    ],

    animals: [
      "DOG",
      "CAT",
      "GIRAFFE",
      "ZEBRA",
      "ELEPHANT",
      "MONKEY",
    ],

    colors: [
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW",
        "ORANGE",
        "PURPLE"
    ],
};

// WIN COUNTER

let winCounter = 0; 
let count = 0;

let chosenWord = ""; // Assigning an empty string that will be replaced with the value from any of the words from the chosenWord array elements 

//Display option buttons 

// This section of code is creating the buttons at the top of the screen for each Category of words you can choose to pick from in this game. 
const displayOptions = () => { 
  OptionsContainer.innerHTML += `<h3>Please Select An Option</h3>`; // Adding the H3 element into the OptionsContainer with innerHTML to display the heading on our screen. 
  let buttonCon = document.createElement("div"); 
  for (let value in options) {   
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  OptionsContainer.appendChild(buttonCon); // We are now appending the buttonCon which are the botton variables for each category (CAr brand, Animals, Colors) and linking it to the OptionsContainer which will display the letters and hashes for each word. 
};

//Block all the Buttons
const blocker = () => {  // Assigning constant variable as "blocker"
  let optionsButtons = document.querySelectorAll(".options");  // Creating sub variables under the blocker for the "options"... once we click a button for the category of words, they will not be able to be found again until the next game
  let letterButtons = document.querySelectorAll(".letters"); // Blockling all of the letters that we have guessed already from being selected twice

  //disable all options
  optionsButtons.forEach((button) => { // Each time  
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  NewGame.classList.remove("hide");
};

// Random Word generator 
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

    //Hide Letters
    WordContainer.classList.remove("hide");
    UserInput.innerText = "";

    let optionArray = options[optionValue];

    //Chose Random Word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord - chosenWord.toUpperCase();

    // Replace letter with span containing a Dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    //Display each element as a span
    UserInput.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCounter = 0;
    count = 0;
  

    //Initially erase all content and hide letteres and new game button
    UserInput.innerHTML = "";
    OptionsContainer.innerHTML = "";
    WordContainer.classList.add("hide");
    NewGame.classList.add("hide");
    WordContainer.innerHTML = "";


    //For creating letter buttons    
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCounter += 1;
            //if winCount equals word lenfth
            if (winCounter == charArray.length) {
              ResultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
            ResultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
            blocker();
          }
        }
        //disable clicked button
        button.disabled = true;
      });
      WordContainer.append(button);
    }
  
    displayOptions();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();
};



// CANVAS 
const canvasCreator = () => {
    let context = canvas.getContext("2d"); // Get the 2D drawing context of the canvas
    context.beginPath(); // Start a new path
    context.strokeStyle = "black"; // Set stroke color to black
    context.lineWidth = 2; // Set the line width


// Line Drawing paramaters
const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY); // Move the "pen" to the starting point
    context.lineTo(toX, toY); // Draw a line to the ending point
    context.stroke(); // Stroke the path
};

// BODY PART DRAWINGS
    
  // fromX: The x-coordinate of the starting point of the line.
  // fromY: The y-coordinate of the starting point of the line.
  // toX: The x-coordinate of the ending point of the line.
  // toY: The y-coordinate of the ending point of the line.



    // HEAD
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI *2, true); // This will make the head circular
        context.stroke();
    };

    //BODY
    const body = () => {
      drawLine(70, 40, 70, 80); // draws a vertical line from the point (70, 40) to the point (70, 80), which represents the body of the hangman.
    };

    //LEFT ARM
    const leftArm = () => {
        drawLine(70, 50, 50, 70);  // draws a line from the point (70, 50) to the point (50, 70), which represents the left arm of the hangman.
    };

    // RIGHT ARM
    const rightArm = () => {
        drawLine(70, 50, 90, 70); //  draws a line from the point (70, 50) to the point (90, 70), which represents the right arm of the hangman.
    };

    //LEFT LEG
    const leftLeg = () => {
        drawLine(70, 80, 50, 110); 
    };

    // RIGHT LEG
    const rightLeg = () => {
        drawLine(70, 40, 70, 80); 
    };


 //initial frame
 const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130); 
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man

// Destructure the functions head, body, leftArm, rightArm, leftLeg, and rightLeg from the canvasCreator
// These functions are responsible for drawing different body parts of the hangman on the canvas

// EACH CASE WORKS IN THE FOLLOWING ORDER

// CASE 1 (count 1) = call the head function to draw the head of the hangman
// CASE 2 (count 2) = call the body function and SO ON FOR THE FOLLOWING CASES UNTIL THE COUNT MAX IS HIT
const drawMan = (count) => {
  // Use a switch statement to determine which body part to draw based on the count
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:     
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
GameButton.addEventListener("click", initializer);
window.onload = initializer;