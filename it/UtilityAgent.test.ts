import { UtilityAgent } from "../src/UtilityAgent";

import { Qualifier } from "../src/Qualifier";
import { Scorer } from "../src/Scorer";
import { HighestScoringSelector } from "../src/HighestScoringSelector";
import { SumOfChildrenQualifier } from "../src/SumOfChildrenQualifier";

import { ITContext } from "./ITContext";
import { SleepAction } from "./SleepAction";
import { EnergyScorer } from "./EnergyScorer";
import { EatAction } from "./EatAction";
import { HungerScorer } from "./HungerScorer";
import { WaitAction } from "./WaitAction";
import { BoardScorer } from "./BoardScorer";

describe("UtilityAgent Integeration Test", () => {

    it("Tick", () => {
        // Create the context
        const context = new ITContext();

        // Map the actions to qualifiers
        const qualifiers = [
            new SumOfChildrenQualifier([new HungerScorer()], new EatAction()),
            new SumOfChildrenQualifier([new EnergyScorer()], new SleepAction()),
            new SumOfChildrenQualifier([new BoardScorer()], new WaitAction()),
        ] as Array<Qualifier>;

        // Create our Selector
        const selector = new HighestScoringSelector();
        
        // Instantiate a new Utility Agent
        const utilityAgent = new UtilityAgent(selector, qualifiers);

        // Run some ticks and validate the outcomes
        utilityAgent.tick(context, .5)
           .then(action => { 
               console.info(`Action for Tick: ${JSON.stringify(action.name)}`);
               expect(action.name).toBe("Eat");
               action.execute(context)
                   .then(localContext => {
                       console.info(`Executed ${action.name} Action: ${JSON.stringify(localContext)}`);
                   });
                
               return utilityAgent.tick(context, .5);
           })
           .then(action => {
               console.info(`Action for Tick: ${JSON.stringify(action.name)}`);
               expect(action.name).toBe("Wait");
               action.execute(context)
                   .then(localContext => {
                       console.info(`Executed ${action.name} Action: ${JSON.stringify(localContext)}`);
                   });
               return utilityAgent.tick(context, .5);
           })
           .then(action => {
               console.info(`Action for Tick: ${JSON.stringify(action.name)}`);
               expect(action.name).toBe("Sleep");
               action.execute(context)
                   .then(localContext => {
                       console.info(`Executed ${action.name} Action: ${JSON.stringify(localContext)}`);
                   });
           })
           .catch(error => fail(error));
    });

});