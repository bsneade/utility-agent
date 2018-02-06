import * as logger from "winston";

import { mock, when, instance, verify, spy } from "ts-mockito";

import { UtilityAgent } from "../src/UtilityAgent";

import { MockContext } from "./MockContext";
import { Qualifier } from "../src/Qualifier";
import { MockQualifier } from "./MockQualifier";
import { Scorer } from "../src/Scorer";
import { MockScorer } from "./MockScorer";
import { MockAction } from "./MockAction";
import { MockSelector } from "./MockSelector";

logger.configure({
    level: "debug",
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

describe("UtilityAgent", () => {

    it("Tick", () => {
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
        utilityAgent.tick(context, 50)
           .then(result => { expect(result).toBe(action); })
           .catch(error => fail(error));

        // assertions
        verify(spiedSelector.select(context, qualifiers, 50)).called();
    });

});