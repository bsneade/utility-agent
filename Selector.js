let winston = require("winston");

/** 
  Selects the best Qualifier from the Qualifiers attached to the Selector 
 */
function Selector() {}

/** 
  Selects a value from the qualifiers.
  Node: default implementation just returns the default value
*/
Selector.prototype.select = function(context, qualifiers, defaultValue) {
	return Promise.resolve(defaultValue);//FIXME - should return a qualifier
}

/**
  Selects the Qualifier that returns the highest score.
*/
function HighestScoringSelector() {
	Selector.call(this);
}
// Make our prototype so we inherit the parent's methods
HighestScoringSelector.prototype = Object.create(Selector.prototype);
HighestScoringSelector.prototype.select = function(context, qualifiers, defaultValue) {
	//loop through the qualifiers and pick the highest one
	var qualifierPromises = qualifiers.map( qualifier => {
		//TODO - something seems wrong here, but it seems to work
		return qualifier.score(context).then(value => { return { qualifier: qualifier, value: value } });
	});
	return Promise.all(qualifierPromises)
	    .then(values => {
			var highest = values.reduce((prev, current) => (prev.value > current.value) ? prev : current);
			winston.debug("HighestScoringSelector::select - " + JSON.stringify(highest));
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
FirstScoringSelector.prototype.select = function(context, qualifiers, defaultValue) {
	//loop through the qualifiers and pick the first one that succeeds
	var qualifierPromises = qualifiers.map( qualifier => {
		return qualifier.score(context).then(value => { return { qualifier: qualifier, value: value } });
	});
	return Promise.all(qualifierPromises)
	    .then(values => {
	    	for (var value in values) {
	    		if (value.value > defaultValue) {
	    			return Promise.resolve(value.qualifier);
	    		}
	    	}
	    	return Promise.resolve(defaultValue); //FIXME - should return a qualifier
	    })
	    .catch(error => { return Promise.reject(error); } );
}

//Do the exports
module.exports = { 
	Selector,
	HighestScoringSelector,
	FirstScoringSelector
};