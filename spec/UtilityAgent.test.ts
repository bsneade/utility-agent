import { spy, verify } from "ts-mockito";

import { UtilityAgent } from "../src/UtilityAgent";

import { MockContext } from "./MockContext";
import { Qualifier } from "../src/Qualifier";
import { MockQualifier } from "./MockQualifier";
import { MockScorer } from "./MockScorer";
import { MockAction } from "./MockAction";
import { MockSelector } from "./MockSelector";

describe("UtilityAgent Integeration Test", () => {

    it("Tick", async () => {
        // set up our mocks
        const context = new MockContext();
        const action = new MockAction();
        const qualifiers = [new MockQualifier([new MockScorer(50)], action),
            new MockQualifier([new MockScorer(49)], action)] as Array<Qualifier>;
        const selector = new MockSelector();
        const spiedSelector = spy(selector);

        // create our agent to test
        const utilityAgent = new UtilityAgent(selector, qualifiers);

        // invoke our method under test
        const result = utilityAgent.tick(context, 50);

        // assertions
        expect(result).toBe(action);
        verify(spiedSelector.select(context, qualifiers, 50)).called();
    });

});