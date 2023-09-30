import { ApplicationCommand, Interaction } from "../types";
import { iFunny } from "../ifunny/funny";

// Commands
import feature from "./feature"
import collective from "./collective";
import user from "./user"
import invite from "./invite";

export const funny = new iFunny();

export interface Command {
    data: ApplicationCommand, // Data for the command name, descriptions, parameters
    execute: (interaction: Interaction) => void // Execute is executed after recieved and is where the command is handled
}

export default [
  invite,
  feature,
  collective,
  user
]