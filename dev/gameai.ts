/// <reference path="knight.ts" />

class GameAI {
    // let the AI choose a move, and update both the
    // knight and the gamestate
    
    public static moveKnight(king:King, knights: Knight[], gameState:GameState) {
        let t0 = performance.now();

         // TODO: remove random move, and replace with AI move

        // RANDOM MOVE - START ------------------

        console.log(king); // only to avoid error: 'king' is declared but its value is never read.

        // choose knight to move
        // let i:number =  Math.floor(Math.random() * Math.floor(knights.length));

        // let legalMoves: [number, number][] = knights[i].getMoves();

        // console.log(legalMoves);

        // let j:number =  Math.floor(Math.random() * Math.floor(legalMoves.length));

        // knights[i].setPosition(legalMoves[j]);
        // gameState.knightPositions[i] = legalMoves[j];

        // RANDOM MOVE - END   ------------------

        function minimax(gameState: GameState, depth: number, maximizingPlayer: boolean): number {
            const score = gameState.getScore();
            if (depth === 0 || score[1]) return score[0];

            if (maximizingPlayer) {
                let maxEval = -Infinity;
                const legalMoves = king.getMoves(gameState.kingPos);
                legalMoves.forEach((move) => {
                    const newState = gameState.copy();
                    newState.kingPos = move;
                    const score = minimax(newState, depth - 1, false);
                    maxEval = Math.max(maxEval, score);
                });
                return maxEval;
            } else {
                let minEval = Infinity;
                knights.forEach((knight, i) => {
                    const legalMoves = knight.getMoves(gameState.knightPositions[i]);
                    legalMoves.forEach((move) => {
                        const newState = gameState.copy();
                        newState.knightPositions[i] = move;
                        const score = minimax(newState, depth - 1, true);
                        minEval = Math.min(minEval, score);
                    });
                });
                return minEval;
            }
        }

        const searchDepth = 4;
        let minEval = Infinity;
        let bestMove: [number, number] = [0, 0];
        let knightIndex = 0;

        knights.forEach((knight, i) => {
            const moves = knight.getMoves(gameState.knightPositions[i]);
            moves.forEach((move) => {
                const newGameState = gameState.copy();
                newGameState.knightPositions[i] = move;
                const currentEval = minimax(newGameState, searchDepth -1, true);
                if (currentEval < minEval) {
                    minEval = currentEval;
                    bestMove = move;
                    knightIndex = i;
                }
                // console.log(currentEval);
            });
        });
        knights[knightIndex].setPosition(bestMove);
        gameState.knightPositions[knightIndex] = bestMove;
 
        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");

    }


}