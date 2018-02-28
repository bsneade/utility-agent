import { Action, Context } from "..";

export class SleepAction implements Action {
    name = "Sleep";

    execute(context: Context): Promise<Context> {
        return new Promise((resolve, reject) => {
            const itContext = <ITContext> context;
            if (itContext.energy < 1) {
                itContext.energy += .2; // .2 energy per tick for sleeping
                if (itContext.energy > 1) {
                    itContext.energy = 1;
                }
                itContext.hunger += .1; // increase the hunger while asleep
                console.info(`Sleeping. Energy now ${itContext.energy}`);
            } else {
                console.warn(`Already rested.  Waiting instead.`);
                // TODO - invoke the wait action
            }

            resolve(context);
        }) as Promise<Context>;
    }

    terminated(context: Context): Context {
        console.info("Terminated SleepAction");
        return context;
    }
}

import { ITContext } from "./ITContext";

