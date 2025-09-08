describe("UtilityAgent Integeration Test", () => {

    it("Tick", async () => {
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
        let action = utilityAgent.tick(context, .5);
        console.info(`Action for Tick: ${JSON.stringify(action.name)}`);
        expect(action.name).toBe("Eat");
        let localContext = action.execute(context);
        console.info(`Executed ${action.name} Action: ${JSON.stringify(localContext)}`);

        action = utilityAgent.tick(context, .5);
        console.info(`Action for Tick: ${JSON.stringify(action.name)}`);
        expect(action.name).toBe("Wait");
        localContext = action.execute(context);
        console.info(`Executed ${action.name} Action: ${JSON.stringify(localContext)}`);

        action = utilityAgent.tick(context, .5);
        console.info(`Action for Tick: ${JSON.stringify(action.name)}`);
        expect(action.name).toBe("Sleep");
        localContext = action.execute(context);
        console.info(`Executed ${action.name} Action: ${JSON.stringify(localContext)}`);
    });

});

import { HighestScoringSelector, Qualifier, SumOfChildrenQualifier, UtilityAgent } from "..";

import { ITContext } from "./ITContext";
import { SleepAction } from "./SleepAction";
import { EnergyScorer } from "./EnergyScorer";
import { EatAction } from "./EatAction";
import { HungerScorer } from "./HungerScorer";
import { WaitAction } from "./WaitAction";
import { BoardScorer } from "./BoardScorer";