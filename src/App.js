//CSS
import './App.css';

//REACT
import { useEffect, useState } from 'react';

//DATA
import {wordsList} from "./data/words"; //por não ter o default

//COMPONENTS
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 0, name: "start"},
  {id: 1, name: "game"},
  {id: 2, name: "end"},
]


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedImage, setPickedImage] = useState("");
  const [pickedImageOpen, setPickedImageOpen] = useState("");

  //responsável pela escolha da categoria e palavra.
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  //responsável pelas letras certas, erradas, escolhas e pontos no jogo.
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrondLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScrore] = useState(0);

  const [noLetter, setNoLetter] = useState("");

  const [openImage, setOpenImage] = useState();

  const pickedWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const wordObj = words[category][Math.floor(Math.random() * words[category].length)]
    const word = wordObj.name
    const image = wordObj.image
    const image2 = wordObj.image2
  
    return {category, word, image, image2};
  }

  
  //inicio do jogo
  const startGame = () => {
    setGuesses(3)
    setWrondLetters([])
    setGuessedLetters([])
    setOpenImage(0)

    //escolher palavra e categoria
    const {category, word, image, image2} = pickedWordAndCategory();


    //a função split cria um array de letras com a palavra escolhida;
    let wordLetters = word.split("");

    //colocar essa palavra todas com letras minúsculas;
    //map é uma função de array que passa todas posições do array (semelhante ao for);
    //toLowerCase transforma a letra em minúscula, caso ela não seja.
    wordLetters = wordLetters.map((a) => a.toLowerCase());

    //console.log(category, word);
    //console.log(wordLetters);

    //setar os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setPickedImage(image);
    setPickedImageOpen(image2);


    setGameStage(stages[1].name)

  }
  const verifyLetter = (letter) => {
    //verifica se é uma letra
    if(!/^[a-zA-Z]$/.test(letter)){
      setNoLetter("letra não reconhecida...");
      return
    }
    else{
      setNoLetter("");
    }

    const normalizedLetter = letter.toLowerCase();

    //checar se a letra já foi utilizada.
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){ //'includes' passa todas opções dentro do array
      return;
    }

    //acerto da letra ou remoção da chance
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessLetters) => [...actualGuessLetters, normalizedLetter]) //busca o array que já existe e adiciona mais uma
    }
    else{
      setWrondLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]) //busca o array que já existe e adiciona mais uma
      setGuesses((actualGuesses) => actualGuesses-1);
    }
  }

  //condição de derrota
  useEffect(() => {
    if(guesses <= 0){
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //condição de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)] //retira letras repetidas e retorna um array com letras unicas
    //console.log(uniqueLetters)

    if(guessedLetters.length === uniqueLetters.length){
      setScrore((actualScore) => actualScore + 100)
      setOpenImage(1)
    }
  }, [letters, guessedLetters]) //MUDANÇA AQUI!




  //renicia o jogo
  const restart = () => {
    //resetar os states
    setGuesses(3)
    setWrondLetters([])
    setGuessedLetters([])
    setGameStage(stages[0].name)
    setScrore(0)
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
          noLetter={noLetter}
          pickedImage={pickedImage}
          openImage={openImage}
          pickedImageOpen={pickedImageOpen}
          start={startGame}
        />}
        {gameStage === 'end' && <GameOver retry={restart} score={score} pickedImageOpen={pickedImageOpen} pickedWord={pickedWord}/>}
      </div>
  );
  
}

export default App;
