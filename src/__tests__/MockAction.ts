import { Action } from "../Action";
import { Context } from "../Context";

export class MockAction implements Action {
    name: string;

    execute(context: Context): Context {
        return context;
    }

    terminated(context: Context): Context {
        return context;
    }
}