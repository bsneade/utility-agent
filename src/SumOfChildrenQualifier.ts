import { Qualifier } from "./Qualifier";

/**
 * Returns the sum of all Scorers
 */
export class SumOfChildrenQualifier extends Qualifier {

    constructor(scorers: Scorer[], action: Action) {
        super(scorers, action);
    }

    score(context: Context) {
        // loop through the scorers and sum them up
        return Promise.resolve(
            this.scorers
                .map(scorer => {
                    const score = scorer.score(context);
                    console.log(`SumOfChildrenQualifier::${this.action.name}->${scorer.constructor.name}->${score}`);
                    return score;
                }).reduce((acc, val) => acc + val, 0)
        );
    }
}

import { Context } from "./Context";
import { Action } from "./Action";
import { Scorer } from "./Scorer";