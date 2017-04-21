# utility-agent

A JavaScript implementation of a Utility Agent

## What is a Utility Agent

A Utility Agent is a simple form of AI that make decisions based on the utility (score) of an available set of actions.

For some more information check out [Wikipedia - Utility Based Agents][https://en.wikipedia.org/wiki/Intelligent_agent#Utility-based_agents].

## Installation

## Usage

## Create some Actions

``` js
var UtilityAgent = require("utility-agent");

//Create a constructor
function ExampleAction() {
    //call the super constructor with a name for this action
	UtilityAgent.Action.call(this,"ExampleAction");
}
ExampleAction.prototype = new UtilityAgent.Action(); //copy the prototype

//Override the execute method
ExampleAction.prototype.execute = function(context) {
	//Perform your action here.  It is recommended that your action return a Promise.
}

module.exports = ExampleAction;
```

## Create some scorers

``` js
var UtilityAgent = require("utility-agent");

//Create a constructor
function ExampleScorer() {
    //call the super on the constructor
	UtilityAgent.Scorer.apply(this);
}
ExampleScorer.prototype = Object.create(UtilityAgent.Scorer.prototype); // copy the prototype

//Override the score method
ExampleScorer.prototype.score = function(context) {
    //Your scoring logic goes here.
    //There are a bunch of helper methods for performing some calcuations as well.
	return Promise.resolve(this.linearFunction(10, 1, 0));
}

module.exports = ExampleScorer;
```

## Create the Agent

``` js
var UtilityAgent = require("utility-agent");

//This is the set of actions that your AI will perform.  A Qualifier links a set of 
//   reusable scorers together to determine the total score for the Action.  There
//   are multiple types of Qualifiers.
var qualifiers = [
    new UtilityAgent.SumOfChildrenQualifier([ new ExampleScorer() ], new ExampleAction())
];

//Create the Selector, which dictates the method by which scored Qualifiers will be chosen.
var selector = new UtilityAgent.HighestScoringSelector();

//Finally instantiate your Agent
agent = new UtilityAgent.UtilityAgent(selector, qualifiers);
```

## Tick the agent logic

``` js
//Tick one cycle of the logic
agent.tick(context, null) //our Selector doesn't require a default value here
    .then(winningAction => { 
        //go ahead and execute the action that was returned
    	return Promise.resolve(winningAction.execute(context)); 
    })
    .catch(error => { 
        return Promise.reject("Could not run tick: " + error);
    });
```