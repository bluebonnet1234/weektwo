const wordsList = [ "naval", "bunch", "abbey", "grasp", "organ", "metro", "guide", "essay", "nylon", "broke", "metre", "arrow", "micro", "elect", "guest", "guild", "brush", "build", "hatch", "nerve", "burke", "buddy", "needs", "meter", "might", "never", "midst", "above", "minor", "amend", "graph", "newly", "bring", "order", "bacon", "minus", "booth", "brook", "opera", "mixed", "empty", "burnt", "guilt", "often", "grass", "night", "modem", "amino", "other", "built", "model", "Mitch", "error", "moist", "molly", "doing", "money", "monte", "niche", "ought", "broad", "optic", "about", "dirty", "burst", "abuse", "brisk", "elite", "moody", "moral", "enemy", "brief", "month", "doubt", "happy", "motif", "mouse", "ninth", "grave", "digit", "noisy", "brink", "onset", "brown", "greed", "great", "ounce", "occur", "cable", "orbit", "brain", "cabin", "buyer", "mound", "blast", "mount", "blaze", "noble", "award", "noise", "green", "motor", "cargo", "north", "donor", "mouth", "noted", "onion", "catch", "greet", "nurse", "adapt", "group", "movie", "carry", "notch", "novel", "mummy", "diary", "offer", "dozen", "dodge", "harsh", "event", "gross", "naked", "drawn", "olive", "cache", "array", "borne", "drama", "guess", "ocean", "enter", "music", "naive", "actor", "admit", "nancy", "nasty", "ozone", "paint", "bound", "carol", "overt", "paper", "panel", "outer", "ethic", "arose", "cause", "canon", "handy", "cease", "harry", "grief", "armor", "altar", "panic", "hardy", "oxide", "paste", "patio", "canal", "peace", "habit", "party", "cater", "pearl", "exact", "pasta", "patch", "enjoy", "calif", "pause", "pitch", "penny", "pizza", "Peggy", "piece", "piles", "pinch", "acute", "draft", "haven", "chain", "candy", "piper", "perry", "pilot", "every", "chess", "chick", "peter", "phase", "grown", "piano", "petty", "aside", "drank", "phone", "choir", "cheek", "photo", "plaza", "chalk", "china", "badly", "argue", "dream", "place", "pound", "power", "point", "chill", "price", "heart", "press", "drain", "print", "prime", "child", "plane", "plant", "pride", "chose", "plate", "grove", "heavy", "excel", "prior", "polar", "plain", "probe", "grill", "prose", "adobe", "charm", "entry", "dress", "exert", "chief", "quest", "chaos", "queen", "query", "bleak", "bowel", "proof", "begin", "beast", "civic", "chair", "prove", "badge", "dried", "heath", "hedge", "guard", "queue", "punch", "chuck", "aware", "pulse", "prize", "prone", "irony", "pupil", "proud", "purse", "cisco", "proxy", "rider", "civil", "claim", "rapid", "eager", "sixth", "equal", "reply", "eagle", "quick", "ridge", "scrap", "renal", "arena", "scope", "Intel", "ferry", "henry", "hobby", "index", "sized", "score", "rally", "drift", "quote", "scout", "shore", "shaft", "seize", "class", "input", "faint", "skill", "skies", "clash", "raise", "screw", "realm", "radio", "holly", "again", "ready", "react", "imply", "drink", "sixty", "exist", "skirt", "chart", "short", "radar", "chile", "serve", "incur", "shout", "shown", "siege", "since", "rebel", "after", "chest", "arise", "relay", "refer", "reign", "cheer", "range", "honey", "cheap", "quite", "rehab", "serum", "sided", "check", "seven", "sense", "feast", "quiet", "relax", "silly", "clean", "drill", "resin", "chase", "hello", "shake", "early", "renew", "clerk", "baker", "fatty", "inner", "shaky", "inter", "shade", "ralph", "fancy", "setup", "repay", "began", "ranch", "clear", "extra", "homer", "bench", "sight", "hence", "hefty", "sigma", "earth", "honor", "slept", "click", "cliff", "faith", "shall", "quota", "sleep", "cream", "eight", "agent", "horse", "adopt", "house", "eaten", "shame", "crazy", "drive", "skull", "creed", "blame", "comic", "creek", "japan", "climb", "randy", "slice", "slide", "close", "crest", "clock", "cover", "black", "costa", "hotel", "favor", "color", "shape", "joint", "aging", "adult", "dusty", "shift", "reach", "sharp", "boxer", "slate", "shell", "slave", "ratio", "sleek", "fault", "audio", "hurry", "human", "smith", "corps", "court", "riley", "right", "shiny", "exile", "ivory", "rifle", "jimmy", "could", "elbow", "rigid", "awful", "share", "smell", "smash", "drove", "jones", "cried", "shine", "risky", "river", "atlas", "rival", "baked", "drunk", "roast", "agony", "roger", "alter", "elder", "rouge", "sheep", "robin", "small", "jewel", "round", "dying", "sheer", "shock", "jenny", "smart", "fence", "robot", "shook", "allow", "fatal", "smile", "issue", "shirt", "false", "ideal", "slump", "slope", "rocky", "shelf", "sheet", "image", "roman", "shoot", "rough" ];
const GRID_ROWS_MAX = 6;
const GRID_COLS_MAX = 5;
const ATTEMPTS_MAX = 6;
const Colors = {
	green: 'rgb(154, 205, 50)',
	yellow: 'rgb(238, 245, 34)',
	gray: 'rgb(184, 180, 180)'
};
const Status = {
	notStarted: 'Not Started',
	wordStarted: 'Word In Progress',
	wordCompleted: 'Word Completed',
	wordCorrect: 'Guess Is Correct'
}

class WordleGameState {
	constructor(gameStatus)
	{
		this.currentRow = 1;
		this.triedWords = [];
		this.guessedWord = "";
		this.gameWord = "";
		this.currentStatus = gameStatus;
	}

	setGameWord(newWord)
	{
		this.gameWord = newWord;
	}

	updateGameStatus(newStatus)
	{
		this.currentStatus = newStatus;
	}

	getDisplayTileId()
	{
		let result = `tile-${this.currentRow}${this.guessedWord.length+1}`;
		return result;
	}

	addToGuessedWord(newLetter)
	{
		this.guessedWord += newLetter;
	}

	deleteLastLetter()
	{
		this.guessedWord = this.guessedWord.substring(0, this.guessedWord.length-1);
	}

	setNextRow()
	{
		if (this.guessedWord.length == 5 && this.currentRow < 6){
			this.currentRow++;
			this.guessedWord = '';
		}	
	}

	updateTriedWords()
	{
		this.triedWords.push(this.guessedWord);
		this.updateGameStatus(Status.wordCompleted);
	}
}

//Display Words Grid UI
function displayWordsUi(){
	const wordsContainer = document.getElementById("wdl-words");
	const squares = [];

	for (let i = 1; i <= GRID_ROWS_MAX; i++)
	{
		for (let j = 1; j <= GRID_COLS_MAX; j++)
		{
			squares.push(`<div id=tile-${i}${j} class="square"></div>`);
		}
	}
	wordsContainer.innerHTML = squares.join('');
}

//Get a random word from the word list
function newGameWord()
{
	let randomIndex = Math.floor(Math.random() * wordsList.length);
	return wordsList[randomIndex].toUpperCase();
}

//Check guessed word against correct game word
function checkWord(wdlState) {
	if (wdlState.guessedWord.length < 5) {
		showAlert('Need five letters');
		return;
	}

	if (wdlState.triedWords.includes(wdlState.guessedWord)){
		showAlert("Word guessed before");
		return;
	}

	if (wdlState.guessedWord === wdlState.gameWord) {
		wdlState.updateTriedWords();
		colorTilesAndKeys(wdlState);
		wdlState.updateGameStatus(Status.wordCorrect);
		disableKeyboard();
	
		const successPopupEl = document.getElementById('wdl-success-popup');
		successPopupEl.style.display = 'block'; 
		return;
	}

	//Check if the word is a valid word
	checkWordIsValid(wdlState);
}

//Add html and event handlers
function initializeUi(wdlState) {
	displayWordsUi();
	const keyButtons = document.querySelectorAll(".letterbtn");
	keyButtons.forEach((keybtn) => keybtn.addEventListener('click', () => {
			let letterClicked = keybtn.getAttribute('data-letter');
			displayClickedLetter(wdlState, letterClicked);
		}
	));

	const enterButton = document.querySelectorAll('[data-action="Enter"]')[0];
	enterButton.addEventListener('click', () => {
		checkWord(wdlState);
	});

	const backButton = document.querySelectorAll('[data-action="Back"]')[0];
	backButton.addEventListener('click', () => {
		if (wdlState.currentStatus == Status.wordStarted)
		{
			deletePreviousLetter(wdlState);
		}
	});

	const debugButton = document.getElementById('wdl-debug');
	debugButton.addEventListener('click', () => {
		const gamewordEl = document.getElementById('wdl-gameword');
		if (gamewordEl.classList.contains('hide'))
		{
			gamewordEl.innerText = wdlState.gameWord;
			gamewordEl.classList.remove('hide');
		}
		else {
			gamewordEl.innerText = '';
			gamewordEl.classList.add('hide');
		}
	});

	const restartButton = document.getElementById('wdl-restart');
	restartButton.addEventListener('click', () => {
		location.reload();
	});

	const closePopupEl = document.getElementById('wdl-popup-close');
	closePopupEl.addEventListener('click', function(){
		const successPopupEl = document.getElementById('wdl-success-popup');
		successPopupEl.style.display = 'none';
	});
}

//Display only if the current word is less than 5 chars
function displayClickedLetter(wdlState, newLetter)
{
	if (wdlState.guessedWord.length < GRID_COLS_MAX)
	{
		if (!wdlState.guessedWord.length){
			wdlState.updateGameStatus(Status.wordStarted);
		}

		let displayTileEl = document.getElementById(wdlState.getDisplayTileId());
		displayTileEl.innerText = newLetter;
		wdlState.addToGuessedWord(newLetter);
	}	
}

//Add background color to current grid row tiles and relevant keyboard keys
function colorTilesAndKeys(wdlState)
{
	let guessLetters = [...wdlState.guessedWord];
	let gameLetters = [...wdlState.gameWord];
	let letterColors = ['','','','',''];

	//correct position
	for(let i=0; i < GRID_COLS_MAX; i++)
	{
		if (guessLetters[i] === gameLetters[i])
		{
			guessLetters[i] = gameLetters[i] = '';
			letterColors[i] = 'green';
		}
	}

	//incorrect position or not in word
	for(let i=0; i < GRID_COLS_MAX; i++)
	{
		if (!guessLetters[i]) { continue; }

		let letterIdx = gameLetters.indexOf(guessLetters[i]);
		letterColors[i] = letterIdx >= 0 ? 'yellow' : 'gray';
		gameLetters[letterIdx] = '';
	}

	//set background color
	for(let i=0; i < GRID_COLS_MAX; i++)
	{
		let tileEl  = document.getElementById(`tile-${wdlState.currentRow}${i+1}`);
		let keyEl = document.querySelectorAll('[data-letter = "' + wdlState.guessedWord[i] + '"]')[0];
	
		tileEl.style.backgroundColor = Colors[letterColors[i]];
		if (letterColors[i] == 'green')
		{
			keyEl.style.backgroundColor = Colors.green;
		}
		else if (letterColors[i] == 'yellow' && keyEl.style.backgroundColor != Colors.green)
		{
			keyEl.style.backgroundColor = Colors.yellow;
		}
		else if (letterColors[i] == 'gray' && ![Colors.green, Colors.yellow].includes(keyEl.style.backgroundColor))
		{
			keyEl.style.backgroundColor = Colors.gray;
		}

		tileEl.classList.add('coloredsquare');		
	}
}

//Invoked only when word is in progress
function deletePreviousLetter(wdlState)
{
	if (!wdlState.guessedWord.length){
		wdlState.updateGameStatus(Status.wordCompleted);
		return;
	}
	let prevTileEl = document.getElementById(`tile-${wdlState.currentRow}${wdlState.guessedWord.length}`);
	prevTileEl.innerText = '';
	wdlState.deleteLastLetter();
}

//Display small alert
function showAlert(message)
{
	const alertEl = document.getElementById('wdl-alert');
	const alertMsgEl = document.getElementById('wdl-alert-text');
	alertMsgEl.innerText = message;
	alertEl.classList.add('show-alert');
	setTimeout(() => {
		if (alertEl.classList.contains("show-alert")) {
		  alertEl.classList.remove("show-alert");
		}
	 }, 8000);
}

//Disable keyboard clicks
function disableKeyboard()
{
	const keyButtons = [...document.querySelectorAll(".letterbtn"), ...document.querySelectorAll(".actionbtn")];
	keyButtons.forEach((key) => key.setAttribute('style', 'pointer-events: none;'));
}

//Alert user when max attempts reached
function checkNumberOfAttempts(wdlState)
{
	if (wdlState.triedWords.length == ATTEMPTS_MAX) {
		disableKeyboard();
		showAlert("Reached max attempts");
	}
}

//If guessed word is valid, update state and UI
async function checkWordIsValid(wdlState)
{
	let isValid = false;

	await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + wdlState.guessedWord)
	.then(res => res.text())
	.then(data => {
		data=JSON.parse(data);
		isValid = data.length && data.pop().word;
	})
	.catch(err=> console.log(err));

	if (!isValid) {
		showAlert("Invalid Word");
		return;
	}
	else {
		wdlState.updateTriedWords();
		colorTilesAndKeys(wdlState);
		wdlState.setNextRow();
		checkNumberOfAttempts(wdlState);
	}
}

window.onload = function() {
	const wgState = new WordleGameState(Status.notStarted);
	const gameWord = newGameWord();
	wgState.setGameWord(gameWord);
	initializeUi(wgState);	
};