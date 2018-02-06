import * as logger from "winston";

import { mock, when, instance, verify, spy } from "ts-mockito";

import { HighestScoringSelector } from "../src/HighestScoringSelector";
import { FirstScoringSelector } from "../src/FirstScoringSelector";

import { MockContext } from "./MockContext";
import { Qualifier } from "../src/Qualifier";
import { MockQualifier } from "./MockQualifier";
import { Scorer } from "../src/Scorer";
import { MockScorer } from "./MockScorer";
import { MockAction } from "./MockAction";

logger.configure({
    level: "debug",
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

describe("Selector", () => {

    it("HighestScoringSelector select", () => {
        // set up our mocks
        const context = new MockContext();
        const action = new MockAction();
        const qualifiers = [new MockQualifier([new MockScorer(50)], action),
            new MockQualifier([new MockScorer(49)], action)] as Array<Qualifier>;
        const spiedQualifiers = qualifiers.map(qualifier => spy(qualifier));

        // invoke the method under test
        new HighestScoringSelector().select(context, qualifiers, undefined)
            .then(score => { expect(score).toBe(qualifiers[0]); })
            .catch(error => fail(error));

        // assert our mocks
        verify(spiedQualifiers[0].score(context)).called();
        verify(spiedQualifiers[1].score(context)).called();
    });

    it("FirstScoringSelector select", () => {
        const context = new MockContext();
        const action = new MockAction();
        const qualifiers = [new MockQualifier([new MockScorer(50)], action), // test the threshold case
            new MockQualifier([new MockScorer(55)], action), // should be returned
            new MockQualifier([new MockScorer(51)], action)] as Array<Qualifier>; // test that we didn't keep processing along
        const spiedQualifiers = qualifiers.map(qualifier => spy(qualifier));

        // invoke the method under test
        new FirstScoringSelector().select(context, qualifiers, 50) // should be higher than 50
            .then(score => { expect(score).toBe(qualifiers[1]); }) // the first one to hit the threshold
            .catch(error => fail(error));

        // assert our mocks
        verify(spiedQualifiers[0].score(context)).called();
        verify(spiedQualifiers[1].score(context)).called();
        verify(spiedQualifiers[2].score(context)).called();
    });
});