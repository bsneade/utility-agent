import * as winston from "winston";

import { Qualifier } from "./Qualifier";
import { Action } from "./Action";
import { Scorer } from "./Scorer";
import { Context } from "./Context";

/**
 * Returns the sum of all Scorers if all the scores are above the threshold
 */
export class AllOrNothingQualifier extends Qualifier {
    readonly threshold: number;

    constructor(scorers: Scorer[], action: Action, threshold: number) {
        super(scorers, action);
        this.threshold = threshold;
    }

    score(context: Context) {
        // calculate the sum
        const sum = this.scorers
            // loop through the scorers and get the scores
            .map(scorer => scorer.score(context))
            // sum them up
            .reduce((acc, val) => acc + val, 0);
            console.log(`AllOrNothingQualifier::score - sum is ${sum}, threshold is ${this.threshold}`);
        winston.debug(`AllOrNothingQualifier::score - sum is ${sum}, threshold is ${this.threshold}`);

        // return the the sum if over the threshold, or 0
        return Promise.resolve(sum > this.threshold ? sum : 0);
    }
}