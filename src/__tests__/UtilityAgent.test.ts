import { UtilityAgent } from "../UtilityAgent";

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
jest.mock("./MockSelector");
import { MockSelector } from "./MockSelector";

test("Tick", () => {
    // set up our mocks
    const context = new MockContext();
    const action = new MockAction();
    const qualifiers = [] as Array<Qualifier>;
    qualifiers.push(new MockQualifier([new MockScorer(50)], action));
    qualifiers.push(new MockQualifier([new MockScorer(49)], action));
    const selector = new MockSelector();

    // create our agent to test
    const utilityAgent = new UtilityAgent(selector, qualifiers);

    // invoke our method under test
    utilityAgent.tick(context, 50)
       .then(result => { expect(result).toBe(action); });

    // assertions
    expect(selector.select).toBeCalledWith(context, qualifiers, 50);
});