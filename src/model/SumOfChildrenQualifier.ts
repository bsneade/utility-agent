/**
 * Returns the sum of all Scorers
 */
class SumOfChildrenQualifier implements Qualifier {
    scorers: Scorer[];
    action: Action;

    constrcutor(scorers: Scorer[], action: Action) {
        this.scorers = scorers;
        this.action = action;
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