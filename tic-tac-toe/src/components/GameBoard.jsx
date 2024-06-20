import React, { useState } from 'react'

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ]

const GameBoard = ({ onSelectSquare, board }) => {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const handleSelectSquare = (rowIndex, colIndex) => {
    //     setGameBoard(prev => {
    //         const updatedBoard = [...prev.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })
    //     onSelectSquare()
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={playerSymbol !== null}
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}

export default GameBoard