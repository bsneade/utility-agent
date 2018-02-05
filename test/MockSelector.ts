import { Qualifier } from "../src/Qualifier";
import { Context } from "../src/Context";
import { Selector } from "../src/Selector";

export class MockSelector implements Selector {
    /**
     * Returns the first qualifier wrapped in a promise
     */
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Promise<Qualifier> {
        return Promise.resolve(qualifiers[0]);
    }
}