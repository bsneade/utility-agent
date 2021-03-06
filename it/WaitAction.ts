import { Action, Context } from "..";

export class WaitAction implements Action {
    name = "Wait";

    execute(context: Context): Promise<Context> {
        return new Promise((resolve, reject) => {
            const itContext = <ITContext> context;
            itContext.hunger += .1; // increase the hunger while waiting
            itContext.energy -= .1; // descrese our engery while waiting
            console.info(`Waiting. Energy now ${itContext.energy}`);

            resolve(context);
        }) as Promise<Context>;
    }

    terminated(context: Context): Context {
        console.info("Terminated SleepAction");
        return context;
    }
}

import { ITContext } from "./ITContext";
