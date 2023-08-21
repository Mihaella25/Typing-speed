const currentSentenceElement = document.getElementById("current-sentence");
const userInput = document.getElementById("user-input");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");
const startTestButton = document.getElementById("start-test");
const stopTestButton = document.getElementById("stop-test");

const sentences = [
    "Flowers sky sea summer bee books waves skirts balcony socks bag carpet fan food cold drink restaurants ice cream swimming pool cat computer hotel castle fir bed sun dog children boat fun happy.", 
    "Umbrella sand stones informatics work programs painting seagulls pig winter snow mountains short flakes holidays spring eggs hens horse good love family coffee bag camera butterflies hat glasses mask rings scene.",
    "Lightning storm guests spectators ballet dances football ball star. For norland produce age wishing. To figure on it spring season up. Her provision acuteness had excellent two why intention. As called mr needed praise at. Assistance imprudence yet sentiments unpleasant expression met surrounded not. Be at talked ye though secure nearer.",
    "Although moreover mistaken kindness me feelings do be marianne. Son over own nay with tell they cold upon are. Cordial village and settled she ability law herself. Finished why bringing but sir bachelor unpacked any thoughts. Unpleasing unsatiable particular inquietude did nor sir. Get his declared appetite distance his together now families. Friends am himself at on norland it viewing. Suspected elsewhere you belonging continued commanded she.",
    "No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry."
];

let totalCharacterCount = 0;
let totalWordCount = 0;
let randomSentenceIndex = Math.floor(Math.random() * sentences.length);
let currentSentenceIndex = randomSentenceIndex;
let currentSentence = sentences[currentSentenceIndex];
let characters = currentSentence.split("");

displayCurrentSentence();
userInput.addEventListener("input", checkInput);

function displayCurrentSentence() {
    currentSentenceElement.innerHTML = characters.map(character => `<span class="character">${character}</span>`).join("");
}

function checkInput() {
    const inputCharacters = userInput.value.split("");
    const characterSpans = currentSentenceElement.querySelectorAll(".character");

    characterSpans.forEach((characterSpan, index) => {
        if (characterSpan.innerText == inputCharacters[index]) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        } else if (inputCharacters[index] == null) {
            if (characterSpan.classList.contains("correct")) {
                characterSpan.classList.remove("correct");
            }
        } else {
            if (!characterSpan.classList.contains("incorrect")) {
                characterSpan.classList.add("incorrect");
            }
        }
    });

    totalCharacterCount = Array.from(characterSpans).filter(characterSpan => characterSpan.classList.contains("correct")).length;
    totalWordCount = countCorrectWords();

    if (inputCharacters.length === characters.length) {
        ++currentSentenceIndex;

        if (currentSentenceIndex < sentences.length) {
            currentSentence = sentences[currentSentenceIndex];
            characters = currentSentence.split("");
            userInput.value = "";
            displayCurrentSentence();
        } else {
            displayResult();
        }
    }
}

function countCorrectWords() {
    const input = userInput.value.trim();
    return input ? input.split(/\s+/).filter((word, index) => word === sentences[currentSentenceIndex].split(/\s+/)[index]).length : 0;
}

let timer;
let time = 60;
let startTime;

function startTimer() {
    timerElement.innerText = time + "s";
    startTime = new Date();
    timer = setInterval(() => {
        const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
        const remainingSeconds = Math.max(0, time - elapsedSeconds);
        timerElement.innerText = remainingSeconds + "s";
        if (remainingSeconds === 0) {
            clearInterval(timer);
            displayResult();
        }
    }, 1000);
}

function startTest() {
    totalCharacterCount = 0;
    totalWordCount = 0;
    currentSentenceIndex = randomSentenceIndex;
    currentSentence = sentences[currentSentenceIndex];
    characters = currentSentence.split("");
    displayCurrentSentence();
    userInput.value = "";
    resultElement.textContent = "";
    userInput.disabled = false;
    startTimer();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
}

function displayResult() {
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    resultElement.textContent = `You wrote correctly ${totalCharacterCount} characters and ${totalWordCount} words.`;
    userInput.disabled = true;
}

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
};

startTestButton.addEventListener("click", startTest);
stopTestButton.addEventListener("click", displayResult);