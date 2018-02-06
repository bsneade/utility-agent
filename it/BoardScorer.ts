import { Scorer } from "../src/Scorer";

import { Context } from "../src/Context";
import { ITContext } from "./ITContext";
 
export class BoardScorer extends Scorer {

	/** Do the scoring */
    score(context: Context): number {
    	let itContext = <ITContext> context;
    	return 0.2; //max of 0.2 for being board
    }

}