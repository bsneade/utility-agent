export class UtilityAgent {
    selector: Selector;
    qualifiers: Qualifier[];

    constructor(selector: Selector, qualifiers: Qualifier[]) {
        this.selector = selector;
        this.qualifiers = qualifiers;
    }

    tick(context: Context, defaultValue: number): Action {
        console.log("UtilityAgent: Performing Tick");
        try {
            const action = this.selector.select(context, this.qualifiers, defaultValue).action;
            console.debug("UtilityAgent::tick - selected action: " + JSON.stringify(action));
            return action;
        } catch (error) {
            console.error("UtilityAgent::tick - error with selector: " + error);
            throw error;
        }
    }
}

import { Selector } from "./Selector";
import { Qualifier } from "./Qualifier";
import { Context } from "./Context";
import { Action } from "./Action";