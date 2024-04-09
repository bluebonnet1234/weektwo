
const GRID_ROWS_MAX = 6;
const GRID_COLS_MAX = 5;
const Colors = {
	green: 'rgb(154, 205, 50)',
	yellow: 'rgb(238, 245, 34)',
	gray: 'rgb(184, 180, 180)'
};

//Object representing single wordle square
function Square(value, rowNum, colNum, color)
{
	this.value = value;
	this.rowNum = rowNum;
	this.colNum = colNum;
}

//Data for wordle squares
function squaresData(guessedWords)
{
	const  squaresList = [];

	for (let i = 1; i <= GRID_ROWS_MAX; i++)
	{
		let rowWord = guessedWords[i-1] ? [...guessedWords[i-1]] : '';
		for (let j = 1; j <= GRID_COLS_MAX; j++)
		{
			let value = rowWord.length ? rowWord[j-1] : '';
			squaresList.push(new Square(value, i, j));
		}
	}

	return squaresList;
}

//Object representing single Key
function KeyBoardKey(value, keyType)
{
	this.value = value;
	this.keyType = keyType;
}

//Data for onscreen keyboard keys
function keyBoardKeysData()
{
	return [
		'QWERTYUIOP'.split('').map((item) => new KeyBoardKey(item, 'letter')),
		'ASDFGHJKL'.split('').map((item) => new KeyBoardKey(item, 'letter')),
		[  new KeyBoardKey('Enter', 'action'),
		   ...'ZXCVBNM'.split('').map((item) => new KeyBoardKey(item, 'letter')),
			new KeyBoardKey('Back', 'action')
		]
	];
}

//WordleBoard Component
function WordleBoard({ squares, rowsMax, columnsMax })
{
	return React.createElement(
		"div",
		{
			id: "wdl-words"
		},
		squares.map((square, idx) =>
			React.createElement(
				"div",
				{
					key: idx,
					className: "square",
					id: "tile-" + square.rowNum + square.colNum
				},
				square.value
			)
		)
	);
}

//ScreenKeyBoard Component
function ScreenKeyBoard({ keysData })
{
	let keyBoardRows = keysData.map((row, idx) =>
		React.createElement(
			"div",
			{
				key: idx,
				className: "keysrow"
			},
			row.map((kb, i) => {
				let kbprops = {
					key: i,
					type: "button",
					className: kb.keyType+"btn"
				};

				if (kb.keyType == 'letter')
				{
					kbprops["data-letter"] = kb.value;
				}
				else
				{
					kbprops["data-action"] = kb.value;
				}

				return React.createElement(
					"button",
					kbprops,
					kb.value
				)
			})
		)
	);

	return React.createElement(
		"div",
		{
			id: "wdl-keyboard"
		},
		keyBoardRows
	);
}

//GameWrapper Component
function GameWrapper(props)
{
	return React.createElement(
		"div",
		{
			id: "wdl-container"
		},
		React.createElement(
			WordleBoard,
			props,
			null
		),
		React.createElement(
			ScreenKeyBoard,
			{
				keysData: keyBoardKeysData()
			},
			null
		)
	);
}

//Add background color to wordle tiles and relevant keyboard keys
function colorTilesAndKeys(guessedWord, gameWord, currentRow)
{
	let guessLetters = [...guessedWord];
	let gameLetters = [...gameWord];
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
		let tileEl  = document.getElementById(`tile-${currentRow}${i+1}`);
		let keyEl = document.querySelectorAll('[data-letter = "' + guessedWord[i] + '"]')[0];
	
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

//Render UI with predetermined hardcoded values
window.onload = function() {
	const triedWords = ["MIGHT", "FLOOD", "STRAY"];
	const	gameWord = "MOODY";
	const	squares = squaresData(triedWords);

	ReactDOM.render(
		React.createElement(
			GameWrapper,
			{
				squares: squares,
				rowsMax: GRID_ROWS_MAX,
				columnsMax: GRID_COLS_MAX
			},
			null
		),
		document.getElementById("app-root")
	);

	triedWords.forEach((word, idx) => colorTilesAndKeys(word, gameWord, idx+1));
}
