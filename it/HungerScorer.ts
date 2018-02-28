import { Scorer, Context } from "..";

export class HungerScorer extends Scorer {

    /** Do the scoring */
    score(context: Context): number {
        const itContext = <ITContext> context;
        return this.decreasingRateOfIncreaseFunction(itContext.hunger, 0.95);
    }

}

import { ITContext } from "./ITContext";