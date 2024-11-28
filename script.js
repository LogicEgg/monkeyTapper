async function stealText() {
    let url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt';
    stolen = await fetch(url); //need to wait for the fetch
    text = await stolen.text(); //takes the text that's fetched
    return text.split();
    // console.log(text);
}

async function addDiv() {
    const newdiv = document.createElement('div'); //creates a new div
    newdiv.setAttribute('id', 'words'); //asigns the div the id 'words'
    let words = await stealText(); //need to wait for the stealtext function to finish
    words.forEach(word => { //throws each word into a paragraph element in the newly created div
        const wordElement = document.createElement('p');
        wordElement.textContent = word;
        newdiv.appendChild(wordElement);
    });
    document.body.appendChild(newdiv); //adds the div to the page
    document.getElementById('words').style.display='none'; //hides the div
}

// setTimeout(() => {
//     const g = document.querySelector('#words');
//     const content = g.querySelector('p').textContent;
//     console.log(content);
// }, 1500);

async function getWords() {
    await addDiv(); //need to wait for the div with all the words to be added to the page
    const g = document.querySelector('#words');
    const words = g.querySelector('p').textContent; //takes the words in the p element of the div with the 'words' id
    const array = words.split('\r\n'); //creates an array from the words in the line above
    // console.log(array);
    let wordlist = '' //empty string that I will be randomly adding words from the array to
    for (let i = 0; i < 300; i++) { //adds 300 words to the wordlist
        var word = Math.floor(Math.random() * array.length);
        wordlist += array[word] + ' ';
    }
    // console.log(wordlist);
    function add() { //adds the words to the box div
        const box = document.querySelector('#box');
        box.textContent = wordlist;
    }
    add()
    // return wordlist;
}

getWords(); // Function call to retrieve or initialize words (assuming it's defined elsewhere).

// Initialize timer variables
let timerStarted = false; // Tracks whether the countdown timer has started.
let timerInterval; // Holds the reference to the setInterval function.
let remainingTime = 60; // Total countdown time in seconds (1 minute).

// Function to start the countdown timer
function startCountdown() {
    // Ensure the timer starts only once
    if (!timerStarted) {
        timerStarted = true; // Set the timerStarted flag to true.

        // Start a repeated interval that updates every second
        timerInterval = setInterval(() => {
            remainingTime--; // Decrement the remaining time by 1 second.

            // Calculate minutes and seconds from the remaining time
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Format the time as MM:SS (e.g., 0:05 for 5 seconds left)
            const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Update the countdown display on the page
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.textContent = `Time Remaining: ${formattedTime}`;
            }

            // Check if the time has reached 0
            if (remainingTime <= 0) {
                clearInterval(timerInterval); // Stop the timer.
                timerStarted = false; // Reset the timerStarted flag.
                console.log("Time's up!"); // Log a message in the console.

                // Update the countdown display to indicate time is up
                if (countdownElement) {
                    countdownElement.textContent = "Time's up!";
                }

                end(); // Call the end function when time reaches 0 (assumes end is defined elsewhere).
            }
        }, 1000); // Execute the function every 1000 milliseconds (1 second).
    }
}

// Attach an event listener to the input field after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input'); // Get the input field element by its ID.

    if (inputField) {
        // Add an event listener for the 'input' event (triggers on any input change)
        inputField.addEventListener('input', () => {
            // Start the countdown timer if it's not already started
            if (!timerStarted) {
                startCountdown();
            }
        });
    }
});


function end() {
    const boxContent = document.getElementById('box');
    const originalText = boxContent.textContent; //captures the text in the box div
    const input = document.getElementById('input');
    const check = input.textContent; //captures the text you typed in the input div
    var checkIt = check.split(' '); //creates an array to be used in the checkaccuracy function
    var originalArray = originalText.split(' '); //creates an array to be used in the checkaccuracy function
    function checkAccuracy() {      
        let wrong = 0;
        let resultHTML = ''; // Stores the final HTML with colour formatting  
        for (let i = 0; i < checkIt.length; i++) { // Iterate through both arrays            
            if (checkIt[i] !== originalArray[i]) {// Compare values at the same index
                resultHTML += `<span style="color: red;">${checkIt[i]}</span> `; // If the words don't match, add the user's word in red
                wrong++;  // Increment counter if values are different
            } else {
                resultHTML += `<span style="color: green;">${checkIt[i]}</span> `; // If the words match, add the user's word in green
            }
        }
        boxContent.innerHTML = resultHTML;// Updates the box content with the colour coded words
        alert(wrong + ' number of words typed incorrectly.' + ' ' + checkIt.length + ' words typed in 60 seconds.');
        }
    checkAccuracy();
    // console.log(checkIt);
    // console.log(originalText);
    document.addEventListener('keydown', preventKeyDown, true); // disable key input after time is up to prevent accidentally closing alert
}

