import { Context } from "./Context";
import { Qualifier } from "./Qualifier";


/**
 * Selects the best Qualifier from the Qualifiers attached to the Selector
 */
export interface Selector {
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Promise<Qualifier>;
}