import "./StartScreen.css";
import React from 'react'

const StartScreen = ({start}) => {
  return (
    <div className="startscreen">
        <img src="/logopokemon.png" className="logo" alt="Logo Pokémon"></img>
        <p>Clique na Pokébola para jogar!</p>
        <div className="buttonStart" onClick={start}></div>
    </div>
  )
}

export default StartScreen