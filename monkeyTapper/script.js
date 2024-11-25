async function stealText() {
    let url = 'https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_alpha.txt';
    stolen = await fetch(url);
    text = await stolen.text();
    return text.split();
    // console.log(text);
}

stealText();

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
addDiv();

async function sentence() {
    const words = await stealText();
    const randWords = words.sort(() => 0.5 - Math.random()).slice(0, 30).join(" ");
    return randWords;
}

setTimeout(() => {
    const g = document.querySelector('#words');
    const content = g.querySelector('p').textContent
    console.log(content);
}, 1500);
