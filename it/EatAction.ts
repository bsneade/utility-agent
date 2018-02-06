import * as logger from "winston";

import { Action } from "../src/Action";
import { Context } from "../src/Context";
import { ITContext } from "./ITContext";

export class EatAction implements Action {
    name = "Eat";

    execute(context: Context): Promise<Context> {
        return new Promise((resolve, reject) => {
            let itContext = <ITContext> context;
            if (itContext.hunger > 0) {
                itContext.hunger -= .4; //less hunger per tick for eating
                if (itContext.hunger < 0) {
                    itContext.hunger = 0;
                }
                logger.info(`Eating. Hunger now ${itContext.hunger}`);
            } else {
                logger.warn(`Already saited.  Waiting instead.`)
                // TODO - invoke the wait action
            }
            
            resolve(context);
        }) as Promise<Context>;
    }

    terminated(context: Context): Context {
    	logger.info("Terminated EatAction");
        return context;
    }
}