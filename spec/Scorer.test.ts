import { Scorer } from "../src/Scorer";
import { Context } from "../src/Context";
import { MockScorer } from "./MockScorer";

describe("Scorer", () => {

    const scorer = new MockScorer(0);

    it("Step function, higher than step", async () => {
        expect(scorer.stepFunction(8, 5)).toBe(1);
    });

    it("Step function, lower than setp", async () => {
        expect(scorer.stepFunction(3, 5)).toBe(0);
    });

    it("Linear fuction, gradient of 1 and no intercept", async () => {
        expect(scorer.linearFunction(10, 1, 0)).toBe(10);
    });

    it("Linear fuction, gradient of 2 and no intercept", async () => {
        expect(scorer.linearFunction(10, 2, 0)).toBe(20);
    });

    it("Linear fuction, gradient of 1 and has intercept", async () => {
        expect(scorer.linearFunction(10, 1, 1)).toBe(11);
    });

    it("Exponential Increase function, power above 1", async () => {
        expect(scorer.exponentialIncreaseFunction(2, 3)).toBe(8);
    });

    it("Exponential Increase function, power below 1", async () => {
        expect(scorer.exponentialIncreaseFunction(2, 0.5)).toBe(2);
    });

    it("Decreasing Rate of Increase function, power above 1", async () => {
        expect(scorer.decreasingRateOfIncreaseFunction(2, 3)).toBe(2);
    });

    it("Decreasing Rate of Increase function, power below 1", async () => {
        expect(scorer.decreasingRateOfIncreaseFunction(2, 0.5)).toBe(1.4142135623730951);
    });

    it("Decreasing Rate of Increase function, power below 0", async () => {
        expect(scorer.decreasingRateOfIncreaseFunction(2, -1)).toBe(2);
    });

    it("Exponential Decay function, value below 0", async () => {
        expect(scorer.exponentialDecayFunction(0, .5)).toBe(0);
    });

    it("Exponential Decay function, value above 1", async () => {
        expect(scorer.exponentialDecayFunction(1, .5)).toBe(1);
    });

    it("Exponential Decay function, value in range", async () => {
        expect(scorer.exponentialDecayFunction(.9, .1)).toBe(0.12589254117941673);
    });

});