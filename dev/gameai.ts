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
        /*
            For every move check how many outcomes there are where the knights win and how many outcomes there are when the king wins

            
        */


        const moves = [];
        knights.forEach((knight, i) => {
            const state = gameState.copy();
            const legalMoves: [number, number][] = knights[i].getMoves();

            legalMoves.forEach((move, j) => {
                const nodeIndex = [i,j];
                gameState.knightPositions[i] = legalMoves[j];
                const score = state.getScore();
                if (score[0] === 0) {
                    // King's turn
                    const kingLegalMoves = king.getMoves();
                    kingLegalMoves.forEach((move, i) => {
                        const score = state.getScore();

                    });
                }
                moves.push([nodeIndex,score]);
            });
        });

        let t1 = performance.now();
        console.log("AI move took " + (t1 - t0) + " milliseconds.");

    }


}