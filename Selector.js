

/** 
  Selects the best Qualifier from the Qualifiers attached to the Selector 
 */
function Selector() {}

/** 
  Selects a value from the qualifiers.
  Node: default implementation just returns the default value
*/
Qualifier.prototype.select = function(context, qualifiers, default) {
	return Promise.resolve(default);
}

/**
  Selects the Qualifier that returns the highest score.
*/
function HighestScoringSelector() {
	Selector.call(this);
}
// Make our prototype so we inherit the parent's methods
HighestScoringSelector.prototype = Object.create(Selector.prototype);
HighestScoringSelector.prototype.select = function(context, qualifiers, default) {
	//loop through the qualifiers and pick the highest one
	var qualifierPromises = [];
	for (var qualifier in qualifiers) {
		qualifierPromises.push(qualfier.score(context));
	}
	return Promise.all(qualifierPromises)
	    .then(values => {
	    	var highest = defualt;
	    	for (var value in values) {
	    		if (value > highest) {
	    			highest = value;
	    		}
	    	}
	    	return Promise.resolve(highest);
	    })
	    .catch(error => { return Promise.reject(error); } );
}

/**
  Selects the first Qualifier that returns a score higher than the score of the Default Qualifier.
*/
function FirstScoringSelector() {
	Selector.call(this);
}
// Make our prototype so we inherit the parent's methods
FirstScoringSelector.prototype = Object.create(Selector.prototype);
FirstScoringSelector.prototype.select = function(context, qualifiers, default) {
	//loop through the qualifiers and pick the first one that succeeds
	var qualifierPromises = [];
	for (var qualifier in qualifiers) {
		qualifierPromises.push(qualfier.score(context));
	}
	return Promise.all(qualifierPromises)
	    .then(values => {
	    	for (var value in values) {
	    		if (value > default) {
	    			return Promise.resolve(value);
	    		}
	    	}
	    	return Promise.resolve(defualt);
	    })
	    .catch(error => { return Promise.reject(error); } );
}

//Do the exports
module.exports = { 
	Selector,
	HighestScoringSelector,
	FirstScoringSelector
};