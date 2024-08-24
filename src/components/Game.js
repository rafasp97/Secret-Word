import { useState, useRef } from "react";
import "./Game.css";
import "./TypeStyle.css"

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, noLetter, pickedImage, openImage, pickedImageOpen, start}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontos: {score}</span>
      </p>
      <h1>Quem é esse Pókemon? </h1>
      <img src={openImage === 1 ? pickedImageOpen : pickedImage} className="card" alt="card"></img>

      <h3 className={`tip ${pickedCategory}`}>Tipo: <span>{pickedCategory}</span></h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (<span key={i} className="letter"> {letter} </span>) : (<span key={i} className="blankSquare"></span>)
        ))}
      </div>
      <div className="letterContainer">
        <p>Escolha uma letra:</p>
        <form onSubmit={handleSubmit}> {/*o onSubmit serve para enviar as informação dos forms*/}
          <input className="input" type="text" name="letter" maxLength="1" required onChange={(evento) => setLetter(evento.target.value)} value={letter} ref={letterInputRef}/>
          {/*o onchange serve para capturar mudanças no formulário */}
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p className="noLetter">{noLetter}</p>
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (<span key={i}> {letter}</span>))}
      </div>

      {/* Botão condicional que reseta a palavra quando ocorre o acerto*/}
      {openImage === 1 && (
        <button className="buttonVictory" onClick={start}>Próximo!</button>
      )}
    </div>
  )
}

export default Game