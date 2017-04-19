let Action = require("./Action.js");
let Context = require("./Context.js");
let Qualifier = require("./Qualifier.js");
let Scorer = require("./Scorer.js");
let { Selector, HighestScoringSelector, FirstScoringSelector } = require("./Selector.js");


function UtilityAgent(selector, qualifiers) {
	this.selector = selector;
	this.qualifiers = qualifiers;
}

UtilityAgent.prototype.tick = function(context, default) {
	return return new Promise((resolve, reject) => { 
		try {
	        var qualifier = this.selector.select(context, this.qualifiers, default);
	        resolve(qualifier.action);
	    } catch (error) {
	    	reject(error);
	    }
    });
}

module.exports = {
   UtilityAgent,
   Action,
   Context,
   Qualifier,
   Scorer,
   Selector,
   HighestScoringSelector,
   FirstScoringSelector
};