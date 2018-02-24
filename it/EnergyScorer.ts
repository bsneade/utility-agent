import { Scorer, Context } from "..";

import { ITContext } from "./ITContext";
 
export class EnergyScorer extends Scorer {

	/** Do the scoring */
    score(context: Context): number {
    	let itContext = <ITContext> context;
    	return this.exponentialDecayFunction(itContext.energy, 0.1);
    }

}