import { Scorer, Context } from "..";

export class BoardScorer extends Scorer {

    /** Do the scoring */
    score(context: Context): number {
        const itContext = <ITContext> context;
        return 0.2; // max of 0.2 for being board
    }

}

import { ITContext } from "./ITContext";