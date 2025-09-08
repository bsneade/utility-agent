# utility-agent

A JavaScript implementation of a Utility Agent

## What is a Utility Agent

A Utility Agent is a simple form of AI that make decisions based on the utility (score) of an available set of actions.

For some more information check out [Wikipedia - Utility Based Agents][https://en.wikipedia.org/wiki/Intelligent_agent#Utility-based_agents].

## Installation

```
npm install --save utility-agent
```

## Usage

For Javascript, see below.  For Typescript there is a barrel provided.  The same classes need to be extended or implemented as in Javascript.  See the [integration tests](it/UtilityAgent.test.ts).

## Create some Actions

Actions are what your agent is capabile of doing.  The Action should return the modified context.

``` ts
import {Action, Context} from 'utility-agent';

export class ExampleAction implements Action {

  readonly name = "example"; 
  
  execute(context: Context): Context {
    //Perform your action here.
    console.log("Executing action", this.name);
    return context;
  }

  terminated(context: Context): Context {
    console.debug("Action Terminated", this.name);
    return context;
  }
}
```

## Create some scorers

Scorers calculate a utility score based on the provided context.  The base [Scorer](src/Scorer.ts) provides some utility functions for common formulas.

``` ts
import {Context, Scorer} from 'utility-agent';

export class ExampleScorer extends Scorer {

  score(context: Context): number {
    //Your scoring logic goes here.
    //There are a bunch of helper methods for performing some calcuations as well.
    return this.linearFunction(10, 1, 0);
  }
}
```

## Create the Agent

The Agent is the entry point and configuration for the system.  This is where you instantiate your Actions and link them to to your Scorers.  These will go into an array of [Qualifiers](src/Qualifier.ts).  Then we pick which Selector we are going to use and instantiate our UtilityAgent.

``` ts
import {Context, HighestScoringSelector, Qualifier, SumOfChildrenQualifier, UtilityAgent} from 'utility-agent';

//This is the set of actions that your AI will perform.  A Qualifier links a set of 
//   reusable scorers together to determine the total score for the Action.  There
//   are multiple types of Qualifiers.
const qualifiers = [
    new SumOfChildrenQualifier([ new ExampleScorer() ], new ExampleAction()),
];

//Create the Selector, which dictates the method by which scored Qualifiers will be chosen.
const selector = new HighestScoringSelector();

//Finally instantiate your Agent
const agent = new UtilityAgent(selector, qualifiers);
```

## Tick the agent logic

When you call the tick() method on your agent it will calculate the utilities and pick a winning Action.  It will be up to the client to invoke the action with its managed [Context](src/Context.ts).

``` js
//Tick one cycle of the logic
const winningAction = agent.tick(context, null); //our Selector doesn't require a default value here
//Execute the action that was returned
const updatedContext = winningAction.execute(context); 
```