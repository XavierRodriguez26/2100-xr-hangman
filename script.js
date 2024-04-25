// Initializing all the variables we created in the HTML 

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

let chosenWord = ""; // This is the code for the random word that will be generated each game

//Display option buttons
const displayOptions = () => {
  OptionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  OptionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
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
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 2;


// Line Drawing paramaters
const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
};

// BODY PART DRAWINGS
    
    // HEAD
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI *2, true); // This will make the head circular
        context.stroke();
    };

    //BODY
    const body = () => {
      drawLine(70, 40, 70, 80);
    };

    //LEFT ARM
    const leftArm = () => {
        drawLine(70, 50, 50, 70); 
    };

    // RIGHT ARM
    const rightArm = () => {
        drawLine(70, 50, 90, 70); 
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
const drawMan = (count) => {
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