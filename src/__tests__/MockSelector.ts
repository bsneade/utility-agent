import { Qualifier } from "../Qualifier";
import { Context } from "../Context";
import { Selector } from "../Selector";

export class MockSelector implements Selector {
    /**
     * Returns the first qualifier wrapped in a promise
     */
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Promise<Qualifier> {
        return Promise.resolve(qualifiers[0]);
    }
}