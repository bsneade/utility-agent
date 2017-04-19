
/** Calculates a score that represents the utility/usefulness of its associated action. */
function Qualifier() {}

/** 
  Selects a value from the qualifiers.
  Node: default implementation just returns the default value
*/
Qualifier.prototype.select = function(context, qualifiers, default) {
	return Promise.resolve(default);
}

function HighestScoringQualifier() {}

module.exports = {
 Qualifier: Qualifier,
 HighestScoringQualifier: HighestScoringQualifier
};