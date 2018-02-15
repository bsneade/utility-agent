import { Selector } from "./Selector";
import { Qualifier } from "./Qualifier";
import { Context } from "./Context";
import { Action } from "./Action";

export class UtilityAgent {
    selector: Selector;
    qualifiers: Qualifier[];

    constructor(selector: Selector, qualifiers: Qualifier[]) {
        this.selector = selector;
        this.qualifiers = qualifiers;
    }

    tick(context: Context, defaultValue: number): Promise<Action> {
        try {
            console.log("UtilityAgent: Performing Tick");
            return this.selector.select(context, this.qualifiers, defaultValue)
                .then(value => {
                    console.log("UtilityAgent::tick - selected action: " + JSON.stringify(value));
                    return Promise.resolve(value.action);
                })
                .catch(error => {
                    console.error("UtilityAgent::tick - error with selector: " + error);
                    return Promise.reject(error);
                });
        } catch (error) {
            console.error("UtilityAgent::tick - error: " + error);
            return Promise.reject(error);
        }
    }
}