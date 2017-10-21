
/** A method for calculating scores that can be reused across Qualifiers. */
function Scorer() {}

//Do the scoring
Scorer.prototype.score = function(context) {
}

/**
This is the equivalent to the simple Boolean trigger logic that the Pacman ghosts use – 
“Has Pacman eaten a power pill? Then definitely run away!”. Note however that the utility 
assigned to this action when the condition is true doesn’t have to be 100% – it’s 
possible to step up in stages, or to only step up a certain amount, so that other actions 
may still have greater utility, even when the condition is true.
*/
Scorer.prototype.stepFunction = function(value, step) {
	return value > step ? 1 : 0;
}

/**
Remember that you can change both the gradient (m) and the intercept (c), but any increase 
in the underlying variable will always lead to a constant proportional increase in utility. 
To give the gradient a downwards slope, set m to be less than 0.
*/
Scorer.prototype.linearFunction = function(value, gradient, intercept) {
	return (gradient * value) + intercept;
}

/**
As the independent variable increases, the marginal utility increases more dramatically.
*/
Scorer.prototype.exponentialIncreaseFunction = function(value, power) {
	return power > 1 ? Math.pow(value, power) : value;
}

/**
When the independent variable is small, a little increase leads to a big increase in utility 
from that action. As the independent variable gets larger, the marginal utility increase 
becomes less and less.
*/
Scorer.prototype.decreasingRateOfIncreaseFunction = function(value, power) {
	return 0 < power && power < 1 ? Math.pow(value, power) : value;
}

/**
When the independent variable is small, a little increase leads to a substantial decrease 
in marginal utility. As the independent variable increases, the marginal utility decrease 
diminishes.
*/
Scorer.prototype.exponentialDecayFunction = function(value, power) {
	return 0 < value && value < 1 ? Math.pow(value, power) : value;
}

/**
This gives an S-shaped curve that, as defined above, is centred about x=0, but is easy 
to shift to make the middle of the curve (where the gradient is steepest) lie wherever 
is appropriate.
*/
Scorer.prototype.sigmoidCurveFunction = function(value, shift) {
	return 1 / (1 + Math.pow(value, shift));
}

function BaseScorer() {
	Scorer.apply(this);
}
BaseScorer.prototype = Object.create(Scorer.prototype);

module.exports = { Scorer, BaseScorer };