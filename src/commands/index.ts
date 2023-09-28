import { ApplicationCommand, Interaction } from "../types";
import { iFunny } from "../ifunny/funny";
import feature from "./feature"
import collective from "./collective";
import user from "./user"

export const funny = new iFunny();

export interface Command {
    data: ApplicationCommand,
    execute: (interaction: Interaction) => void
}

export default [
  feature,
  collective,
  user
]