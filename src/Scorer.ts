
/** A method for calculating scores that can be reused across Qualifiers. */
export abstract class Scorer {
    /** Do the scoring */
    abstract score(context: Context): number;

    /**
     * This is the equivalent to the simple Boolean trigger logic that the Pacman ghosts use –
     * “Has Pacman eaten a power pill? Then definitely run away!”. Note however that the utility
     * assigned to this action when the condition is true doesn’t have to be 100% – it’s
     * possible to step up in stages, or to only step up a certain amount, so that other actions
     * may still have greater utility, even when the condition is true.
     */
    stepFunction(value: number, step: number): number {
      return value > step ? 1 : 0;
    }

    /**
     * Remember that you can change both the gradient (m) and the intercept (c), but any increase
     * in the underlying variable will always lead to a constant proportional increase in utility.
     * To give the gradient a downwards slope, set m to be less than 0.
     */
    linearFunction(value: number, gradient: number, intercept: number): number {
        return (gradient * value) + intercept;
    }

    /**
     * As the independent variable increases, the marginal utility increases more dramatically.
     */
    exponentialIncreaseFunction(value: number, power: number): number {
        return power > 1 ? Math.pow(value, power) : value;
    }

    /**
     * When the independent variable is small, a little increase leads to a big increase in utility
     * from that action. As the independent variable gets larger, the marginal utility increase
     * becomes less and less.
     */
    decreasingRateOfIncreaseFunction(value: number, power: number): number {
        return 0 < power && power < 1 ? Math.pow(value, power) : value;
    }

    /**
     * When the independent variable is small, a little increase leads to a substantial decrease
     * in marginal utility. As the independent variable increases, the marginal utility decrease
     * diminishes.
     */
    exponentialDecayFunction(power: number, value: number): number {
        return 0 < power && power < 1 ? Math.pow(value, power) : power;
    }

    /**
     * This gives an S-shaped curve that, as defined above, is centred about x=0, but is easy
     * to shift to make the middle of the curve (where the gradient is steepest) lie wherever
     * is appropriate.
     */
    sigmoidCurveFunction(value: number, shift: number) {
        return 1 / (1 + Math.pow(value, shift));
    }
}

import { Context } from "./Context";
