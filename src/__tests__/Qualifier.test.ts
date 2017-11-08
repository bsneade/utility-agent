import {} from "jest";

jest.mock("./MockAction");
import { MockAction } from "./MockAction";
jest.mock("./MockContext");
import { MockContext } from "./MockContext";
import { Scorer } from "../Scorer";
jest.mock("./MockScorer");
import { MockScorer } from "./MockScorer";

import { AllOrNothingQualifier } from "../AllOrNothingQualifier";
import { SumOfChildrenQualifier } from "../SumOfChildrenQualifier";
import { FixedQualifier } from "../FixedQualifier";


it("All Or Nothing Qualifier, Is above threshold", () => {
    // set up our mocks
    const action = new MockAction();
    const context = new MockContext();
    const scorers = [] as Array<Scorer>;
    scorers.push(new MockScorer(50));
    scorers.push(new MockScorer(49));
    scorers.push(new MockScorer(10));

    // create our instance to test
    const qualifier = new AllOrNothingQualifier(scorers, action, 100);

    // run our function under test
    qualifier.score(context)
        .then(result => {
            expect(result).toBe(109);
        });

    // assert our mocks
    expect(scorers[0].score).toBeCalled();
    expect(scorers[1].score).toBeCalled();
    expect(scorers[2].score).toBeCalled();
});

test("All Or Nothing Qualifier, Is below threshold", () => {
    // set up our mocks
    const action = new MockAction();
    const context = new MockContext();
    const scorers = [] as Array<Scorer>;
    scorers.push(new MockScorer(50));
    scorers.push(new MockScorer(49));

    // create our instance to test
    const qualifier = new AllOrNothingQualifier(scorers, action, 100);

    // run our function under test
    qualifier.score(context)
        .then(result => {
            expect(result).toBe(0);
        });

    // assert our mocks
    expect(scorers[0].score).toBeCalled();
    expect(scorers[1].score).toBeCalled();
});

test("Fixed Qualifier", () => {
    const action = new MockAction();
    const context = new MockContext();
    const scorers = [] as Array<Scorer>;

    // create our instance to test
    const qualifier = new FixedQualifier(scorers, action, 10);

    // run our function under test
    qualifier.score(context)
        .then(result => {
            expect(result).toBe(10); // ignores the qualifiers
        });
});

test("Sum Of Children Qualifier", () => {
    // set up our mocks
    const action = new MockAction();
    const context = new MockContext();
    const scorers = [] as Array<Scorer>;
    scorers.push(new MockScorer(50));
    scorers.push(new MockScorer(49));
    scorers.push(new MockScorer(10));

    // create our instance to test
    const qualifier = new SumOfChildrenQualifier(scorers, action);

    // run our function under test
    qualifier.score(context)
        .then(result => {
            expect(result).toBe(109);
        });

    // assert our mocks
    expect(scorers[0].score).toBeCalled();
    expect(scorers[1].score).toBeCalled();
    expect(scorers[2].score).toBeCalled();
});
