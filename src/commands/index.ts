import feature from "./feature"
import collective from "./collective";
import { iFunny } from "./funny";
import { APIApplicationCommandOptionBase, APIUserApplicationCommandGuildInteraction, ApplicationCommandOptionType } from "discord-api-types/v10"

export type Component = {
  style: number;
  label: string;
  url: string;
  disabled: boolean;
  type: number;
};

export const funny = new iFunny();

//@ts-ignore // I just cant find where is the type for command ;-;
export interface data extends APIApplicationCommandOptionBase<ApplicationCommandOptionType>{
    type?: ApplicationCommandOptionType
}

export interface Command {
    data: data,
    execute: (interaction: APIUserApplicationCommandGuildInteraction) => void
}

export default [
  feature,
  collective
]