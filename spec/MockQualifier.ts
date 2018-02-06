import { Qualifier } from "../src/Qualifier";
import { Context } from "../src/Context";
import { Action } from "../src/Action";
import { Scorer } from "../src/Scorer";

export class MockQualifier extends Qualifier {
    public constructor(scorers: Scorer[], action: Action) {
        super(scorers, action);
    }

    /**
     * Take the first scorer and score with it
     */
    score(context: Context): Promise<number> {
        return Promise.resolve(this.scorers[0].score(context));
    }
}