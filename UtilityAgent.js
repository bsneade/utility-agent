let { Action, BaseAction} = require("./Action.js");
let Context = require("./Context.js");
let { Qualifier, AllOrNothingQualifier, FixedQualifier, SumOfChildrenQualifier } = require("./Qualifier.js");
let { Scorer, BaseScorer } = require("./Scorer.js");
let { Selector, HighestScoringSelector, FirstScoringSelector } = require("./Selector.js");

let winston = require("winston");

function UtilityAgent(selector, qualifiers) {
	this.selector = selector;
	this.qualifiers = qualifiers;
}

UtilityAgent.prototype.tick = function(context, defaultValue) {
	try {
		winston.debug("UtilityAgent: Performing Tick")
        return this.selector.select(context, this.qualifiers, defaultValue)
            .then(value => {
            	winston.info("UtilityAgent::tick - selected action: " + JSON.stringify(value));
            	return Promise.resolve(value.action);
            })
            .catch(error => { 
            	winston.error("UtilityAgent::tick - error with selector: " + error);
            	return Promise.reject(error); 
            });
    } catch (error) {
    	winston.error("UtilityAgent::tick - error: " + error);
    	return Promise.reject(error);
    }
}

module.exports = {
   UtilityAgent : UtilityAgent,
   Action : BaseAction,
   Context : Context,
   Qualifier : Qualifier,
   AllOrNothingQualifier : AllOrNothingQualifier, 
   FixedQualifier : FixedQualifier, 
   SumOfChildrenQualifier : SumOfChildrenQualifier,
   Scorer : BaseScorer,
   Selector : Selector,
   HighestScoringSelector : HighestScoringSelector,
   FirstScoringSelector : FirstScoringSelector
};