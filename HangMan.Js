var hangManGame = new HangManGame();
hangManGame.init();

function HangManGame() {
  var globalVar = {
    HiddenWord: [],
    actualWord: [],
    WrongAttempt: 5,
    
    Hint : [],
    secretWord: "",
  };

  var domElement = {};

  this.init = function () {
    InitializeVariables();
    Initialization();
  };

  function InitializeVariables() {
    InitializeDomElement();
  }

  function Initialization() {

   domElement.disableKeyboard.style.display="none";
    domElement.ResetGame.style.display="none";
    domElement.display.style.display="none";
    domElement.Hint.style.display="none";
  }

  function InitializeDomElement() {
    domElement = {
    display: document.getElementById("tbInput"),
    startGameButton: document.getElementById("btnGameStart"),
    noOfAttempts: document.getElementById("guessCount"),
    disableKeyboard: document.getElementById("VirtualKey"),
    ResetGame : document.getElementById("btnResetGame"),
    Hint : document.getElementById("Hint"),
    HangManImage : document.getElementById("gif"),
    SecretWord : document.getElementById("secretWord")
    };
  }

  function getAllIndexes(arr, val) {
    var indexes = [],
      i;
    for (i = 0; i < globalVar.actualWord.length; i++)
      if (globalVar.actualWord[i] === val) indexes.push(i);
    return indexes;
  }
 
  this.getRandomValue = async function () {
     var randomWord = await getRandomWordFromAPI('https://random-words-api.vercel.app/word/vocabulary')
     domElement.disableKeyboard.style.display="block";
    domElement.ResetGame.style.display="block";
    domElement.display.style.display="block";
    domElement.Hint.style.display="block";
    globalVar.secretWord = randomWord[0].word;
    globalVar.actualWord = randomWord[0].word.toLowerCase().split("");
    globalVar.Hint = randomWord[0].definition;
    for (let i = 0; i <= globalVar.actualWord.length - 1; i++) {
      globalVar.HiddenWord.push("-");
    }
    domElement.display.innerText = globalVar.HiddenWord;
    domElement.startGameButton.disabled = true;
    domElement.noOfAttempts.innerText =
      "You have " + globalVar.WrongAttempt + " Chance";
  };

  this.input = function (e) {
    var val = e.value.toLowerCase();
    e.disabled = true;
    
    if (globalVar.actualWord.indexOf(val) >= 0) {
      var indexOfLetter = getAllIndexes(globalVar.actualWord, val);
      for (i = 0; i <= indexOfLetter.length - 1; i++) {
        globalVar.HiddenWord[indexOfLetter[i]] = val;
      }
      domElement.display.innerText = globalVar.HiddenWord;
      if (globalVar.actualWord.equals(globalVar.HiddenWord)) {
        domElement.noOfAttempts.innerText = "You Won";
        var nodes = domElement.disableKeyboard.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].disabled = true;
        }
      }
    } else {
      globalVar.WrongAttempt--;
      domElement.noOfAttempts.innerText =
        "You have " + globalVar.WrongAttempt + " Chance left";
      if (globalVar.WrongAttempt === 0) {
      domElement.noOfAttempts.innerText = "You Failed";
      document.getElementById("gif").style.display="block";
      document.getElementById("secretWord").style.display="block";
      document.getElementById("secretWord").innerText = "Secret Word Is: " + globalVar.secretWord; 
      }
    }
  };
  this.hint = function()
  {
    alert(globalVar.Hint)

  }

  this.reset = function () {
    Initialization()
    domElement.startGameButton.disabled = false;
    document.getElementById("gif").style.display="none";
    document.getElementById("secretWord").style.display="none";
    globalVar.HiddenWord.length = 0;
    globalVar.actualWord.length = 0;

    var nodes = domElement.disableKeyboard.getElementsByTagName("*");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].disabled = false;
    }
    globalVar.WrongAttempt = 5;
    domElement.noOfAttempts.innerText = "";
    domElement.noOfAttempts.innerText = "";
    domElement.display.innerText = "";
  };
}
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });
