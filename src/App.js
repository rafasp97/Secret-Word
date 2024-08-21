//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from 'react';

//DATA
import {wordsList} from "./data/words"; //por não ter o default

//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //responsável pela escolha da categoria e palavra.
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  //responsável pelas letras certas, erradas, escolhas e pontos no jogo.
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrondLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScrote] = useState(0);

  const pickedWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
  
    return {category, word};
  }

  //inicio do jogo
  const startGame = () => {
    //escolher palavra e categoria
    const {category, word} = pickedWordAndCategory();

    //a função split cria um array de letras com a palavra escolhida;
    let wordLetters = word.split("");

    //colocar essa palavra todas com letras minúsculas;
    //map é uma função de array que passa todas posições do array (semelhante ao for);
    //toLowerCase transforma a letra em minúscula, caso ela não seja.
    wordLetters = wordLetters.map((a) => a.toLowerCase());

    console.log(category, word);
    console.log(wordLetters);

    //setar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);


    setGameStage(stages[1].name)
  }

  //fim de jogo
  const verifyLetter = (letter) => {
    console.log(letter);
  }

  //renicia o jogo
  const restart = () => {
    setGameStage(stages[0].name)
  }
  return (
      <div className="App">
        {gameStage === 'start' && <StartScreen start={startGame}/>}
        {gameStage === 'game' && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
        {gameStage === 'end' && <GameOver retry={restart}/>}
      </div>
  );
}

export default App;
