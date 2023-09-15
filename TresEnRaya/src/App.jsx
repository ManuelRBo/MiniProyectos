import { useState } from "react";

function App() {
  function Square({ children, isSelected, updateBoard, index }) {
    
    function handleClick() {
      updateBoard(index);
    }
  
    return (
      <div
        onClick={handleClick}
        className={` ${isSelected ? "bg-white" : ""}
    border-4 border-white w-24 h-24 rounded-xl grid place-items-center text-white`}
      >
        {children}
      </div>
    );
  }

  const TURNS = {
    x: "❌",
    o: "⭕",
  };

  const ganador = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const [tablero, setTablero] = useState(window.localStorage.getItem("tablero") ? JSON.parse(window.localStorage.getItem("tablero")) :
    Array(9).fill(null));

  const [turno, setTurno] = useState(window.localStorage.getItem("turno") ? JSON.parse(window.localStorage.getItem("turno")) :
    TURNS.x);

  const [winner, setWinner] = useState(null);

  function updateBoard(index) {
    if (tablero[index] === null && !winner) {
      const newTablero = [...tablero];
      newTablero[index] = turno;
      setTablero(newTablero);
      const newTurno = turno === TURNS.x ? TURNS.o : TURNS.x;
      setTurno(newTurno);
      window.localStorage.setItem("tablero", JSON.stringify(newTablero));
      window.localStorage.setItem("turno", JSON.stringify(newTurno));
      if (checkWinner(newTablero)) {
        setWinner(() => {
          return checkWinner(newTablero);
        });
      }else if (newTablero.every((item) => item !== null)) {
        setWinner("Empate");
      }
    }
  }

  function checkWinner(tableroCheck) {
    for (let i = 0; i < ganador.length; i++) {
      const [a, b, c] = ganador[i];
      if (
        tableroCheck[a] &&
        tableroCheck[a] === tableroCheck[b] &&
        tableroCheck[a] === tableroCheck[c]
      ) {
        return tableroCheck[a];
      }
    }
    return null;
  }

  function resetGame() {
    setTablero(Array(9).fill(null));
    setTurno(TURNS.x);
    setWinner(null);
  }

  return (
    <>
    <div className={winner && "blur"}>
      <h1 className="text-white text-center uppercase font-sans font-semibold text-2xl mb-6">
        Tic Tac Toe
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={resetGame}
          className="text-white font-semibold py-2 px-4 rounded border border-white hover:bg-white hover:text-black"
        >
          Reset Game
        </button>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-5 mb-8 relative">
        {tablero.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {tablero[index]}
            </Square>
          );
        })}

        
      </div>

      <div className="flex justify-evenly">
        <Square isSelected={turno === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turno === TURNS.o}>{TURNS.o}</Square>
      </div>
      </div>

        <main className="grid place-items-center">
      <section className={winner && "border border-white p-7 absolute top-44 bg-black bg-opacity-50"}>
        {winner && (
          <div className="text-white text-center uppercase font-sans font-semibold text-2xl">
            <div className="mb-5">{winner==TURNS.x || winner==TURNS.o ? "Ganador: " + winner : "Empate"}</div>
            <button onClick={resetGame} className="text-white font-semibold py-2 px-4 rounded border border-white hover:bg-white hover:text-black">Jugar de Nuevo</button>
          </div>
        )}
      </section>
      </main>

    </>
  );
}

export default App;
