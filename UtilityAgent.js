let Action = require("./Action.js");
let Context = require("./Context.js");
let Qualifier = require("./Qualifier.js");
let Scorer = require("./Scorer.js");
let Selector = require("./Selector.js");


function UtilityAgent() {}

UtilityAgent.prototype.somefunction = function() {
	
}

module.exports = {
   UtilityAgent: UtilityAgent,
   UAAction: Action,
   UAContext: Context,
   UAQualifier: Qualifier,
   UAScorer: Scorer,
   UASelector: Selector
};