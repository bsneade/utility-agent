
/**
 * Selects the Qualifier that returns the highest score.
 */
export class HighestScoringSelector implements Selector {
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Promise<Qualifier> {
        // loop through the qualifiers and pick the highest one
        const qualifierPromises = qualifiers.map(qualifier => {
            // TODO - something seems wrong here, but it seems to work
            return qualifier.score(context).then(value => {
                console.log(`HighestScoringSelector::${qualifier.action.name} scored as ${value}`);
                return { qualifier: qualifier, value: value };
            });
        });
        return Promise.all(qualifierPromises)
            .then(values => {
                const highest = values.reduce((prev, current) => (prev.value > current.value) ? prev : current);
                console.log("HighestScoringSelector::select - " + JSON.stringify(highest));
                return Promise.resolve(highest.qualifier);
            })
            .catch(error => { return Promise.reject(error); });
    }
}

import { Selector } from "./Selector";
import { Qualifier } from "./Qualifier";
import { Context } from "./Context";