import feature from "./feature"
import collective from "./collective";
import { APIApplicationCommandOptionBase, APIUserApplicationCommandGuildInteraction, ApplicationCommandOptionType } from "discord-api-types/v10"

export type Embed = {
    title?: string;
    description?: string;
    color?: number; // Color in decimal format (e.g., 0xFF0000 for red)
    author?: {
      name: string;
      icon_url?: string;
    };
    fields?: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
    thumbnail?: {
      url: string;
    };
    image?: {
      url: string;
    };
    footer?: {
      text: string;
      icon_url?: string;
    };
  };

  export type Component = {
    style: number;
    label: string;
    url: string;
    disabled: boolean;
    type: number;
  };

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