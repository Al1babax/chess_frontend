import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";


export default function Game() {
    const [game, setGame] = useState(new Chess());

    function makeAMove(move) {
        const gameCopy = new Chess(game.fen());
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function makeRandomMove() {
        // Console log the turn
        console.log(game.turn());

        const possibleMoves = game.moves();

        // game over
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
            return; // exit if the game is over


        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;

        return true;
    }

    useEffect(() => {
        // Check if it's the computer's turn and make a random move
        if (game.turn() === "b") {
            setTimeout(makeRandomMove, 200);
        }
    }, [game]);

    return (
        <div className="w-[40%]">
            <Chessboard
                animationDuration={300}
                arePremovesAllowed={true}
                showPromotionDialog={true}
                position={game.fen()}
                onPieceDrop={onDrop}
                id="chessboard"
            />
        </div>
    )
}