/**
 * Returns a fixed score
 */
class FixedQualifier implements Qualifier {
    scorers: Scorer[];
    action: Action;
    value: number;

    constrcutor(scorers: Scorer[], action: Action, value: number) {
        this.scorers = scorers;
        this.action = action;
        this.value = value;
    }

    score(context: Context) {
        return Promise.resolve(this.value);
    }
}