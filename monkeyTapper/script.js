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
    for (let i = 0; i < 300; i++) {
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

document.addEventListener("DOMContentLoaded", function() {
    let startTime = 60;

    const countDown = document.getElementById('countdown');

    const timer = setInterval(updateCount, 1000);

    function updateCount() {
        if (startTime <= 0) {
            clearInterval(timer);
            countDown.innerHTML = "Time's up!";
            return;
        }

        let minutes = Math.floor(startTime / 60);
        let seconds = startTime % 60;

        countDown.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        startTime--;
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
        let wrong = 0              
        for (let i = 0; i < checkIt.length; i++) { // Iterate through both arrays            
            if (checkIt[i] !== originalArray[i]) {// Compare values at the same index
            wrong++;  // Increment counter if values are different
            }
        }
        alert(wrong + ' number of words typed incorrectly.' + ' ' + checkIt.length + ' words typed in 60 seconds.');
        }
    checkAccuracy();
    console.log(checkIt);
    console.log(originalText);
    document.addEventListener('keydown', preventKeyDown, true);
}, 63000);
