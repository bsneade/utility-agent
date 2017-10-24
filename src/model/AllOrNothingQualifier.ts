import * as winston from "winston";

/**
 * Returns the sum of all Scorers if all the scores are above the threshold
 */
class AllOrNothingQualifier implements Qualifier {
    scorers: Scorer[];
    action: Action;
    threshold: number;

    constrcutor(scorers: Scorer[], action: Action, threshold: number) {
        this.scorers = scorers;
        this.action = action;
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