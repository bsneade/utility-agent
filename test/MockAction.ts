import { Action } from "../src/Action";
import { Context } from "../src/Context";

export class MockAction implements Action {
    name: string;

    execute(context: Context): Context {
        return context;
    }

    terminated(context: Context): Context {
        return context;
    }
}