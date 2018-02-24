import { Scorer, Context } from "..";

import { ITContext } from "./ITContext";
 
export class BoardScorer extends Scorer {

	/** Do the scoring */
    score(context: Context): number {
    	let itContext = <ITContext> context;
    	return 0.2; //max of 0.2 for being board
    }

}