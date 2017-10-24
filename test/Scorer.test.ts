const { Scorer, BaseScorer } = require('../Scorer');
scorer = new BaseScorer();

test('Step function, higher than step', () => {
	expect(scorer.stepFunction(8,5)).toBe(1);
});

test('Step function, lower than setp', () => {
	expect(scorer.stepFunction(3,5)).toBe(0);
});

test('Linear fuction, gradient of 1 and no intercept', () => {
	expect(scorer.linearFunction(10,1,0)).toBe(10);
});

test('Linear fuction, gradient of 2 and no intercept', () => {
	expect(scorer.linearFunction(10,2,0)).toBe(20);
});

test('Linear fuction, gradient of 1 and has intercept', () => {
	expect(scorer.linearFunction(10,1,1)).toBe(11);
});

test('Exponential Increase function, power above 1', () => {
	expect(scorer.exponentialIncreaseFunction(2,3)).toBe(8);
});

test('Exponential Increase function, power below 1', () => {
	expect(scorer.exponentialIncreaseFunction(2,0.5)).toBe(2);
});

test('Decreasing Rate of Increase function, power above 1', () => {
	expect(scorer.decreasingRateOfIncreaseFunction(2,3)).toBe(2);
});

test('Decreasing Rate of Increase function, power below 1', () => {
	expect(scorer.decreasingRateOfIncreaseFunction(2,0.5)).toBe(1.4142135623730951);
});

test('Decreasing Rate of Increase function, power below 0', () => {
	expect(scorer.decreasingRateOfIncreaseFunction(2,-1)).toBe(2);
});