import { Qualifier } from "../Qualifier";
import { Context } from "../Context";
import { Action } from "../Action";
import { Scorer } from "../Scorer";

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