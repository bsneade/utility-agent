import { Scorer } from "../src/Scorer";
import { Context } from "../src/Context";

export class MockScorer extends Scorer {

    resultScore: number;

    constructor(resultScore: number) {
        super();
        this.resultScore = resultScore;
    }

    score(context: Context): number {
        return this.resultScore;
    }

}