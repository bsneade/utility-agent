

/**
 * Selects the first Qualifier that returns a score higher than the score of the Default Qualifier.
 */
export class FirstScoringSelector implements Selector {
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Promise<Qualifier> {
        // loop through the qualifiers and pick the first one that succeeds
        const qualifierPromises = qualifiers.map(qualifier => {
            // TODO - something seems wrong here, but it seems to work
            return qualifier.score(context).then(value => { return { qualifier: qualifier, value: value }; });
        });
        return Promise.all(qualifierPromises)
            .then(values => {
                const first = values.find(value => value.value > defaultValue);
                return Promise.resolve(first.qualifier);
            })
            .catch(error => { return Promise.reject(error); });
    }
}

import { Selector } from "./Selector";
import { Context } from "./Context";
import { Qualifier } from "./Qualifier";