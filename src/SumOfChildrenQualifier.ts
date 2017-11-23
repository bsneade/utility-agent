import { Action } from "./Action";
import { Scorer } from "./Scorer";
import { Qualifier } from "./Qualifier";
import { Context } from "./Context";

/**
 * Returns the sum of all Scorers
 */
export class SumOfChildrenQualifier extends Qualifier {

    constructor(scorers: Scorer[], action: Action) {
        super(scorers, action);
    }

    score(context: Context) {
        // loop through the scorers and sum them up
        const scorerPromises = this.scorers.map(scorer => {
            return scorer.score(context);
        });
        return Promise.all(scorerPromises)
            .then(values => {
                const sum = values.reduce((acc, val) => acc + val, 0);
                return Promise.resolve(sum);
            })
            .catch(error => { return Promise.reject(error); } );
    }
}