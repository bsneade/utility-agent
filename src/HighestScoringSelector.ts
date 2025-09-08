/**
 * Selects the Qualifier that returns the highest score.
 */
export class HighestScoringSelector implements Selector {
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Qualifier {
        // loop through the qualifiers and pick the highest one
        const highest = qualifiers.map(qualifier => {
            return {qualifier: qualifier, value: qualifier.score(context)};
        }).reduce(
            // reduce via the comparison to find the highest value
            (prev, current) => (prev.value > current.value) ? prev : current);
        return highest.qualifier;
    }
}

import { Selector } from "./Selector";
import { Qualifier } from "./Qualifier";
import { Context } from "./Context";