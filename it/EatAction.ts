export class EatAction implements Action {
    name = "Eat";

    execute(context: Context): Promise<Context> {
        return new Promise((resolve, reject) => {
            const itContext = <ITContext> context;
            if (itContext.hunger > 0) {
                itContext.hunger -= .4; // less hunger per tick for eating
                if (itContext.hunger < 0) {
                    itContext.hunger = 0;
                }
                console.info(`Eating. Hunger now ${itContext.hunger}`);
            } else {
                console.warn(`Already saited.  Waiting instead.`);
                // TODO - invoke the wait action
            }

            resolve(context);
        }) as Promise<Context>;
    }

    terminated(context: Context): Context {
        console.info("Terminated EatAction");
        return context;
    }
}

import { Action, Context } from "..";

import { ITContext } from "./ITContext";