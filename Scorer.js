
/** A method for calculating scores that can be reused across Qualifiers. */
function Scorer() {}

//Do the scoring
Scorer.prototype.score = function(context) {
}

function BaseScorer() {
	Scorer.apply(this);
}
BaseScorer.prototype = Object.create(Scorer.prototype);

module.exports = { Scorer, BaseScorer };