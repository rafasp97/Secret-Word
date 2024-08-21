import "./StartScreen.css";

import React from 'react'

const StartScreen = ({start}) => {
  return (
    <div className="startscreen">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para jogar</p>
        <button onClick={start}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen