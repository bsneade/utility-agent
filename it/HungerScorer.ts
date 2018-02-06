import { Scorer } from "../src/Scorer";

import { Context } from "../src/Context";
import { ITContext } from "./ITContext";
 
export class HungerScorer extends Scorer {

	/** Do the scoring */
    score(context: Context): number {
    	let itContext = <ITContext> context;
    	return this.decreasingRateOfIncreaseFunction(itContext.hunger, 0.95);
    }

}