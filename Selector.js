

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
		qualifierPromises.push(qualfier.score(context).then(value => return { qualifier: qualifier, value: value }));
	}
	return Promise.all(qualifierPromises)
	    .then(values => {
	    	var highest = { qualifier: null, value: 0 };
	    	for (var value in values) {
	    		if (value.value > highest.value) {
	    			highest = value;
	    		}
	    	}
	    	return Promise.resolve(highest.qualifier);
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
		qualifierPromises.push(qualfier.score(context).then(value => return { qualifier: qualifier, value: value }));
	}
	return Promise.all(qualifierPromises)
	    .then(values => {
	    	for (var value in values) {
	    		if (value.value > default) {
	    			return Promise.resolve(value.qualifier);
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