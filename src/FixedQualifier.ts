import { Qualifier } from "./Qualifier";

/**
 * Returns a fixed score
 */
export class FixedQualifier extends Qualifier {
    readonly value: number;

    constructor(scorers: Scorer[], action: Action, value: number) {
        super(scorers, action);
        this.value = value;
    }

    score(context: Context) {
        return Promise.resolve(this.value);
    }
}

import { Action } from "./Action";
import { Scorer } from "./Scorer";
import { Context } from "./Context";