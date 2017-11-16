import { Scorer } from "../Scorer";
import { Context } from "../Context";

export class MockScorer extends Scorer {

    resultScore: number;

    constructor(resultScore: number) {
        super();
        this.resultScore = resultScore;
    }

    score(context: Context): number {
        console.log("returning " + this.resultScore);
        return this.resultScore;
    }

}