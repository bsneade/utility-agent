/**
 * Selects the first Qualifier that returns a score higher than the score of the Default Qualifier.
 */
export class FirstScoringSelector implements Selector {
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Qualifier {
        // loop through the qualifiers and pick the first one that succeeds
        const first = qualifiers.map(qualifier => {
            return {qualifier: qualifier, value: qualifier.score(context)};
        }).find(
            // find the first matching value
            value_1 => value_1.value > defaultValue);
        return first.qualifier;
    }
}

import { Selector } from "./Selector";
import { Context } from "./Context";
import { Qualifier } from "./Qualifier";