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
        // loop through the scorers and sum them up
        const scorerPromises = this.scorers.map(scorer => {
            return scorer.score(context);
        });
        return Promise.all(scorerPromises)
            .then(values => {
                const sum = values.reduce(function(acc, val) {
                    return acc + val;
                }, 0);
                winston.debug("AllOrNothingQualifier::score - sum is " + sum + ", threshold is " + this.threshold);
                return Promise.resolve(sum > this.threshold ? sum : 0);
            })
            .catch(error => { return Promise.reject(error); });
    }
}