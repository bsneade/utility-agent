/**
 * Selects the best Qualifier from the Qualifiers attached to the Selector
 */
interface Selector {
    select(context: Context, qualifiers: Qualifier[], defaultValue: number): Promise<Qualifier>;
}