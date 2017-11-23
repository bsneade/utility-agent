import * as logger from "winston";

import { mock, when, instance, verify, spy } from "ts-mockito";

import { Context } from "../Context";
import { MockAction } from "./MockAction";
import { MockContext } from "./MockContext";
import { Scorer } from "../Scorer";
import { MockScorer } from "./MockScorer";

import { AllOrNothingQualifier } from "../AllOrNothingQualifier";
import { SumOfChildrenQualifier } from "../SumOfChildrenQualifier";
import { FixedQualifier } from "../FixedQualifier";

logger.configure({
    level: "debug",
    transports: [
        new logger.transports.Console({
            colorize: true
        })
    ]
});

describe("Qualifier", () => {

    it("All Or Nothing Qualifier, Is above threshold", () => {
        // set up our mocks
        const action = new MockAction();
        const context = new MockContext();
        const scorers = [new MockScorer(50),
            new MockScorer(49),
            new MockScorer(10)] as Array<Scorer>;
        const spiedScorers = scorers.map(scorer => spy(scorer));

        // create our instance to test
        const qualifier = new AllOrNothingQualifier(scorers, action, 100);

        // run our function under test
        qualifier.score(context)
            .then(result => {
                expect(result).toBe(109);
            })
            .catch(error => fail(error));

        // assert our mocks
        verify(spiedScorers[0].score(context)).called();
        verify(spiedScorers[1].score(context)).called();
        verify(spiedScorers[2].score(context)).called();
    });

    it("All Or Nothing Qualifier, Is below threshold", () => {
        // set up our mocks
        const action = new MockAction();
        const context = new MockContext();
        const scorers = [new MockScorer(50),
            new MockScorer(49)] as Array<Scorer>;
        const spiedScorers = scorers.map(scorer => spy(scorer));

        // create our instance to test
        const qualifier = new AllOrNothingQualifier(scorers, action, 100);

        // run our function under test
        qualifier.score(context)
            .then(result => {
                expect(result).toBe(0);
            })
            .catch(error => fail(error));

        // assert our mocks
        verify(spiedScorers[0].score(context)).called();
        verify(spiedScorers[1].score(context)).called();
    });

    it("Fixed Qualifier", () => {
        const action = new MockAction();
        const context = new MockContext();
        const scorers = [] as Array<Scorer>;

        // create our instance to test
        const qualifier = new FixedQualifier(scorers, action, 10);

        // run our function under test
        qualifier.score(context)
            .then(result => {
                expect(result).toBe(10); // ignores the qualifiers
            })
            .catch(error => fail(error));
    });

    it("Sum Of Children Qualifier", () => {
        // set up our mocks
        const action = new MockAction();
        const context = new MockContext();
        const scorers = [new MockScorer(50),
            new MockScorer(49),
            new MockScorer(10)] as Array<Scorer>;
        const spiedScorers = scorers.map(scorer => spy(scorer));

        // create our instance to test
        const qualifier = new SumOfChildrenQualifier(scorers, action);

        // run our function under test
        qualifier.score(context)
            .then(result => {
                expect(result).toBe(109);
            })
            .catch(error => fail(error));

        // assert our mocks
        verify(spiedScorers[0].score(context)).called();
        verify(spiedScorers[1].score(context)).called();
        verify(spiedScorers[2].score(context)).called();
    });

});
