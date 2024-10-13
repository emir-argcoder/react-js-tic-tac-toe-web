import './App.css';
import { useState } from 'react';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

// Definimos las posibles combinaciones ganadoras del tablero de Ta-Te-Ti
const winningPositions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// Componente principal de la aplicación
const App = () => {

  // Estados: el turno actual, el estado de las casillas, las casillas ganadoras y el marcador de puntajes
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({ 
    X: 0,
    O: 0,
  });
  
  // Función para reiniciar el juego
  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null)); // Vaciamos el tablero
    setWinningSquares([]);
  }
  
  // Función que verifica si hay un ganador o un empate
  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) { // Declaramos ganador
        endGame(newSquares[a], winningPositions[i]);
        return
      }
    }

    // Si no hay ganadores y no hay casillas vacías, es un empate
    if(!newSquares.includes(null)) {
      endGame(null, [...Array(9).keys()]);
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }
  
  // Función que maneja el clic en una casilla
  const handleClick = square => {
    let newSquares = [...squares]; 
    newSquares.splice(square, 1, turn); 
    setSquares(newSquares);
    checkForWinner(newSquares);
  }

  // Función que se llama al terminar el juego (ya sea por victoria o empate)
  const endGame = (result, winningPositions) => {
    setTurn(null); // Impide seguir clickeando después de terminar el juego
    if(result !== null) { // Si hay un ganador, sumamos un punto
      setScore({
        ...score,
        [result]: score[result] +1, 
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 4000); 
  }
  
  // Renderizamos el tablero y el marcador de puntajes
  return (
    <div className="container">
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X}/>
    </div>
  );
}

export default App;
