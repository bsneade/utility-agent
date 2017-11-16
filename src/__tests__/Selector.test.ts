import * as winston from "winston";

import { HighestScoringSelector } from "../HighestScoringSelector";
import { FirstScoringSelector } from "../FirstScoringSelector";

jest.mock("./MockContext");
import { MockContext } from "./MockContext";
import { Qualifier } from "../Qualifier";
jest.mock("./MockQualifier");
import { MockQualifier } from "./MockQualifier";
import { Scorer } from "../Scorer";
jest.mock("./MockScorer");
import { MockScorer } from "./MockScorer";
jest.mock("./MockAction");
import { MockAction } from "./MockAction";

const hsSelector = new HighestScoringSelector();

test("HighestScoringSelector select", () => {
    // set up our mocks
    const context = new MockContext();
    const action = new MockAction();
    const qualifiers = [] as Array<Qualifier>;
    qualifiers.push(new MockQualifier([new MockScorer(50)], action));
    qualifiers.push(new MockQualifier([new MockScorer(49)], action));

    // invoke the method under test
    hsSelector.select(context, qualifiers, undefined)
        .then(score => { expect(score).toBe(qualifiers[0]); });

    // assert our mocks
    expect(qualifiers[0].score).toBeCalled();
    expect(qualifiers[1].score).toBeCalled();
});

const fsSelector = new FirstScoringSelector();

test("FirstScoringSelector select", () => {
    const context = new MockContext();
    const action = new MockAction();
    const qualifiers = [] as Array<Qualifier>;
    qualifiers.push(new MockQualifier([new MockScorer(50)], action)); // test the threshold case
    qualifiers.push(new MockQualifier([new MockScorer(55)], action)); // should be returned
    qualifiers.push(new MockQualifier([new MockScorer(51)], action)); // test that we didn't keep processing along

    // invoke the method under test
    hsSelector.select(context, qualifiers, 50) // should be higher than 50
        .then(score => { expect(score).toBe(qualifiers[1]); }); // the first one to hit the threshold

    // assert our mocks
    expect(qualifiers[0].score).toBeCalled();
    expect(qualifiers[1].score).toBeCalled();
    expect(qualifiers[2].score).toBeCalled();
});