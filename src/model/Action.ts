/** The action that the AI executes when a specific Qualifier is selected. */
interface Action {
    name: string;
    execute(context: Context): Context;
    terminated(context: Context): Context;
}