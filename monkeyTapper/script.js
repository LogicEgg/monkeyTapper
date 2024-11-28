async function stealText() { //this function fetches a list of words from another website
    let url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt';
    stolen = await fetch(url);
    text = await stolen.text();
    return text.split();
    // console.log(text);
}

async function addDiv() { //this function creates a new div with the id 'words' and creates a 'p' element populated by the words from the stealText function
    const newdiv = document.createElement('div'); //div created here
    newdiv.setAttribute('id', 'words'); //the div is given an id of 'words'
    let words = await stealText(); //awaits the stealText function
    words.forEach(word => { //adds each word to the new div in a 'p' element
        const wordElement = document.createElement('p');
        wordElement.textContent = word;
        newdiv.appendChild(wordElement);
    });
    document.body.appendChild(newdiv);
    document.getElementById('words').style.display='none'; //hides the new div
}

// setTimeout(() => {
//     const g = document.querySelector('#words');
//     const content = g.querySelector('p').textContent;
//     console.log(content);
// }, 1500);

async function getWords() { //gives us a list of words
    await addDiv(); //awaits the addDiv function because I use DOM to select from the div it creates
    const g = document.querySelector('#words');
    const words = g.querySelector('p').textContent;
    const array = words.split('\r\n'); //turns the words into an array so that I can iterate through it later
    // console.log(array);
    let wordlist = '' //an empty string I will add words to later
    for (let i = 0; i < 300; i++) { //randomly iterates through array 300 times and adds the word in that index to the wordlist string
        var word = Math.floor(Math.random() * array.length);
        wordlist += array[word] + ' ';
    }
    console.log(wordlist);

    const box = document.querySelector('#box');
    box.textContent = wordlist;


    return wordlist;
}
document.addEventListener("DOMContentLoaded", function() {
    let startTime = 60;
    let wordsTyped = 0; 
    let wordlist = '';   
    let timer;

    const countDown = document.getElementById('countdown');
    const typingBox = document.getElementById('typing-box');  
    const box = document.getElementById('box');

    getWords().then((words) => {
        wordlist = words;
    });

    typingBox.addEventListener('input', () => {
        const text = typingBox.value.trim();
        wordsTyped = text.split(/\s+/).length;  
    });

    timer = setInterval(updateCount, 1000);

    function updateCount() {
        if (startTime <= 0) {
            clearInterval(timer);
            countDown.innerHTML = "Time's up!";
            
            alert(`You typed ${wordsTyped} words. Your WPM is: ${wordsTyped}`);

            return;
        }

        let minutes = Math.floor(startTime / 60);
        let seconds = startTime % 60;

        countDown.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        startTime--;
    }
});