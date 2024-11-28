async function stealText() {
    let url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt';
    stolen = await fetch(url);
    text = await stolen.text();
    return text.split();
    // console.log(text);
}

async function addDiv() {
    const newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'words');
    let words = await stealText();
    words.forEach(word => {
        const wordElement = document.createElement('p');
        wordElement.textContent = word;
        newdiv.appendChild(wordElement);
    });
    document.body.appendChild(newdiv);
    document.getElementById('words').style.display='none';
}

// setTimeout(() => {
//     const g = document.querySelector('#words');
//     const content = g.querySelector('p').textContent;
//     console.log(content);
// }, 1500);

async function getWords() {
    await addDiv();
    const g = document.querySelector('#words');
    const words = g.querySelector('p').textContent;
    const array = words.split('\r\n');
    // console.log(array);
    let wordlist = ''
    for (let i = 0; i < 100; i++) {
        var word = Math.floor(Math.random() * array.length);
        wordlist += array[word] + ' ';
    }
    console.log(wordlist);
    function add() {
        const box = document.querySelector('#box');
        box.textContent = wordlist;
    }
    add()
    return wordlist;
}

getWords();

// Initialize timer variables
let timerStarted = false;
let timerInterval;
let remainingTime = 60; // 60 seconds (1 minute)

// Function to start the countdown timer
function startCountdown() {
    if (!timerStarted) {
        timerStarted = true;

        timerInterval = setInterval(() => {
            remainingTime--;

            // Calculate minutes and seconds
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            // Format as MM:SS
            const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // Update the countdown element
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.textContent = `Time Remaining: ${formattedTime}`;
            }

            // Stop the timer when it reaches 0
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerStarted = false;
                console.log("Time's up!");
                if (countdownElement) {
                    countdownElement.textContent = "Time's up!";
                }
            }
        }, 1000); // Update every second
    }
}

// Attach the event listener to the input field
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input'); 

    if (inputField) {
        inputField.addEventListener('input', () => {
            if (!timerStarted) {
                startCountdown();
            }
        });
    }

    setTimeout(() => {
        const boxContent = document.getElementById('box');
        const originalText = boxContent.textContent;
        const input = document.getElementById('input');
        const check = input.textContent;
        var checkIt = check.split(' ');
        var originalArray = originalText.split(' ');
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
            boxContent.innerHTML = resultHTML; // Updates the box content with the colour coded words
            alert(wrong + ' number of words typed incorrectly.' + ' ' + checkIt.length + ' words typed in 60 seconds.');
            }
        checkAccuracy();
        console.log(checkIt);
        console.log(originalText);
        document.addEventListener('keydown', preventKeyDown, true);
    }, 63000);
});

