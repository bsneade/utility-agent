export class EnergyScorer extends Scorer {

    /** Do the scoring */
    score(context: Context): number {
        const itContext = <ITContext> context;
        return this.exponentialDecayFunction(itContext.energy, 0.1);
    }

}

import { Scorer, Context } from "..";

import { ITContext } from "./ITContext";