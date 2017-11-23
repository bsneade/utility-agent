import * as logger from "winston";

import { Scorer } from "../Scorer";
import { Context } from "../Context";
import { MockScorer } from "./MockScorer";

logger.configure({
    level: "debug",
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

describe("Scorer", () => {

    const scorer = new MockScorer(0);

    it("Step function, higher than step", () => {
        expect(scorer.stepFunction(8, 5)).toBe(1);
    });

    it("Step function, lower than setp", () => {
        expect(scorer.stepFunction(3, 5)).toBe(0);
    });

    it("Linear fuction, gradient of 1 and no intercept", () => {
        expect(scorer.linearFunction(10, 1, 0)).toBe(10);
    });

    it("Linear fuction, gradient of 2 and no intercept", () => {
        expect(scorer.linearFunction(10, 2, 0)).toBe(20);
    });

    it("Linear fuction, gradient of 1 and has intercept", () => {
        expect(scorer.linearFunction(10, 1, 1)).toBe(11);
    });

    it("Exponential Increase function, power above 1", () => {
        expect(scorer.exponentialIncreaseFunction(2, 3)).toBe(8);
    });

    it("Exponential Increase function, power below 1", () => {
        expect(scorer.exponentialIncreaseFunction(2, 0.5)).toBe(2);
    });

    it("Decreasing Rate of Increase function, power above 1", () => {
        expect(scorer.decreasingRateOfIncreaseFunction(2, 3)).toBe(2);
    });

    it("Decreasing Rate of Increase function, power below 1", () => {
        expect(scorer.decreasingRateOfIncreaseFunction(2, 0.5)).toBe(1.4142135623730951);
    });

    it("Decreasing Rate of Increase function, power below 0", () => {
        expect(scorer.decreasingRateOfIncreaseFunction(2, -1)).toBe(2);
    });

});