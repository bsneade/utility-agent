/** Calculates a score that represents the utility/usefulness of its associated action. */
interface Qualifier {
    scorers: Scorer[];
    action: Action;
    score(context: Context): Promise<number>;
}