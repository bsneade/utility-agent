
/** Calculates a score that represents the utility/usefulness of its associated action. */
function Qualifier(scorers) {
	this.scorers = scorers;
}

//set up the base score function
Qualifier.prototype.score = function(context) {
	return Promise.reject("Default Qualifier Used");
}

/**
  Returns the sum of all Scorers if all the scores are above the threshold
*/
function AllOrNothingQualifier(scorers, threshold) {
	this.threshold = threshold;
	Qualifier.call(this, scorers);
}
AllOrNothingQualifier.prototype = Object.create(Qualifier.prototype);
AllOrNothingQualifier.prototype.score = function(context) {
	//loop through the scorers and sum them up
	var scorerPromises = [];
	for (var scorer in this.scorers) {
		scorerPromises.push(scorer.score(context));
	}
	return Promise.all(scorerPromises)
	    .then(values => {
	    	var sum = values.reduce(function(acc, val) {
  					return acc + val;
				}, 0);
	    	return Promise.resolve(sum > this.threshold ? sum : this.threshold);
	    })
	    .catch(error => { return Promise.reject(error); } );
}

/**
  Returns a fixed score
*/
function FixedQualifier(scorers, value) {
	this.value = value;
	Qualifier.call(this, scorers);
}
FixedQualifier.prototype = Object.create(Qualifier.prototype);
FixedQualifier.prototype.score = function(context) {
	return Promise.resolve(this.value);
}

/**
  Returns a fixed score
*/
function SumOfChildrenQualifier(scorers) {
	Qualifier.call(this, scorers);
}
SumOfChildrenQualifier.prototype = Object.create(Qualifier.prototype);
SumOfChildrenQualifier.prototype.score = function(context) {
	//loop through the scorers and sum them up
	var scorerPromises = [];
	for (var scorer in this.scorers) {
		scorerPromises.push(scorer.score(context));
	}
	return Promise.all(scorerPromises)
	    .then(values => {
	    	var sum = values.reduce(function(acc, val) {
  					return acc + val;
				}, 0);
	    	return Promise.resolve(sum);
	    })
	    .catch(error => { return Promise.reject(error); } );
}

module.exports = {
  Qualifier,
  AllOrNothingQualifier,
  FixedQualifier,
  SumOfChildrenQualifier
};