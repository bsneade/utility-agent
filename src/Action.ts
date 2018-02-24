/** The action that the AI executes when a specific Qualifier is selected. */
export interface Action {
    name: string;
    execute(context: Context): Promise<Context>;
    terminated(context: Context): Context;
}

import { Context } from "./Context";
