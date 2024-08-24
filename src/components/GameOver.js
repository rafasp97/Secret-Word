import "./GameOver.css";

const GameOver = ({retry, score}) => {
  return (
    <div className="startscreen">
        <img src="https://media.tenor.com/fAw8OmhI1WYAAAAi/game-over-game.gif" className="logo" alt="game over" />
        <p>Pontos: {score}</p>
        <p>Clique na Pokébola para jogar novamente!</p>
        <div className="buttonStart" onClick={retry}></div>
    </div>
  )
}

export default GameOver