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

document.addEventListener("DOMContentLoaded", function() { //Waits for the whole DOM content to be loaded before running the script
    let startTime = 60;

    const countDown = document.getElementById('countdown');

    const timer = setInterval(updateCount, 1000); //Set an interval to call the updateCount funciton every 1000 milliseconds

    function updateCount() { //funciton to update timer
        if (startTime <= 0) {
            clearInterval(timer); //stops interval when timer is done
            countDown.innerHTML = "Time's up!"; //updates the timer element with "Time's up!"
            return;
        }

        let minutes = Math.floor(startTime / 60); //Gets the number of minutes
        let seconds = startTime % 60; //Gets the number of seconds

        countDown.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; //format the countdown to display minutes and seconds
        startTime--; //decreases the countdown time by 1 second
    }
});

setTimeout(() => {
    const boxContent = document.getElementById('box');
    const originalText = boxContent.textContent;
    const input = document.getElementById('input');
    const check = input.textContent;
    var checkIt = check.split(' ');
    var originalArray = originalText.split(' ');
    function checkAccuracy() {      
        let wrong = 0;
        let resultHTML = '';             
        for (let i = 0; i < checkIt.length; i++) { // Iterate through both arrays            
            if (checkIt[i] !== originalArray[i]) {// Compare values at the same index
                resultHTML += `<span style="color: red;">${checkIt[i]}</span> `;
                wrong++;  // Increment counter if values are different
            } else {
                resultHTML += `<span style="color: green;">${checkIt[i]}</span> `;
            }
        }
        boxContent.innerHTML = resultHTML;
        alert(wrong + ' number of words typed incorrectly.' + ' ' + checkIt.length + ' words typed in 60 seconds.');
        }
    checkAccuracy();
    console.log(checkIt);
    console.log(originalText);
    document.addEventListener('keydown', preventKeyDown, true);
}, 63000);
