import { Scorer } from "./Scorer";
import { Action } from "./Action";
import { Context } from "./Context";

/** Calculates a score that represents the utility/usefulness of its associated action. */
export abstract class Qualifier {
    protected scorers: Scorer[];
    protected _action: Action;

    protected constructor(scorers: Scorer[], action: Action) {
        this.scorers = scorers;
        this._action = action;
    }

    get action(): Action {
        return this._action;
    }

    abstract score(context: Context): Promise<number>;
}