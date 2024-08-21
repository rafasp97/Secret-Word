import "./GameOver.css";

const GameOver = ({retry}) => {
  return (
    <div>
        <button onClick={retry}>Restart</button>
    </div>
  )
}

export default GameOver