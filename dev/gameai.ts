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

        function minimax(gameState: GameState, depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number {
            const score = gameState.getScore();
            if (depth === 0 || score[1]) return score[0];

            if (maximizingPlayer) {
                let maxEval = -Infinity;
                const legalMoves = king.getMoves(gameState.kingPos);
                const newState = gameState.copy();
                for (const move of legalMoves) {
                    newState.kingPos = move;
                    const currentEval = minimax(newState, depth -1 , alpha, beta, false);
                    maxEval = Math.max(maxEval, currentEval);

                    alpha = Math.max(alpha, currentEval);
                    if (beta <= alpha) break;
                };
                return maxEval;
            } else {
                let minEval = Infinity;
                knights.forEach((knight, i) => {
                    const newState = gameState.copy();
                    const legalMoves = knight.getMoves(gameState.knightPositions[i]);
                    for (const move of legalMoves) {
                        newState.knightPositions[i] = move;
                        const currentEval = minimax(newState, depth - 1, alpha, beta, true);
                        minEval = Math.min(minEval, currentEval);

                        beta = Math.min(beta, currentEval);
                        if (beta <= alpha) break;
                    };
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
            const newGameState = gameState.copy();
            moves.forEach((move) => {
                newGameState.knightPositions[i] = move;
                const currentEval = minimax(newGameState, searchDepth -1, -Infinity, Infinity, true);
                if (currentEval < minEval) {
                    minEval = currentEval;
                    bestMove = move;
                    knightIndex = i;
                }
            });
        });
        knights[knightIndex].setPosition(bestMove);
        gameState.knightPositions[knightIndex] = bestMove;
 
        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");

    }


}