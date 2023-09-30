// Borrowed from: https://github.com/glenstack/glenstack/blob/master/packages/cf-workers-discord-bot/src/types.ts

export enum ApplicationCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

export type ApplicationCommandOptionChoice = {
  name: string;
  value: string | number;
};

export type ApplicationCommandOption = {
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
  default?: boolean;
  required?: boolean;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
};

export type ApplicationCommand = {
  name: string;
  description: string;
  options?: ApplicationCommandOption[];
};

export type Snowflake = string;

export enum InteractionType {
  Ping = 1,
  ApplicationCommand = 2,
}

export type OptionType = any;

export type ApplicationCommandInteractionDataOption = {
  name: string;
  value?: OptionType;
  options?: ApplicationCommandInteractionDataOption[];
};

export type ApplicationCommandInteractionData = {
  id: Snowflake;
  name: string;
  options?: ApplicationCommandInteractionDataOption[];
};

export type GuildMember = {
  deaf: boolean;
  is_pending: boolean;
  joined_at: string;
  mute: boolean;
  nick?: string;
  pending: boolean;
  permissions: string;
  premium_since?: string;
  roles: string[];
  user: {
    avatar?: string;
    discriminator: string;
    id: string;
    public_flags: number;
    username: string;
  };
};

export type User = {
  id: Snowflake;
  username: string;
  discriminator: string;
  global_name?: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration?: string;
}

export type Interaction = {
  id: Snowflake;
  type: InteractionType;
  data?: ApplicationCommandInteractionData;
  guild_id?: Snowflake;
  channel_id?: Snowflake;
  member?: GuildMember;
  user?: User;
  token: string;
  version: number;
}


export enum EmbedType {
  rich = "rich",
  image = "image",
  video = "video",
  gifv = "gifv",
  article = "article",
  link = "link",
}

export type EmbedThumbnail = {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

export type EmbedVideo = {
  url?: string;
  height?: number;
  width?: number;
};

export type EmbedImage = {
  url?: string;
  proxy_url?: string;
  height?: number;
  width?: number;
};

export type EmbedProvider = {
  name?: string;
  url?: string;
};

export type EmbedAuthor = {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type EmbedFooter = {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
};

export type EmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

export type Embed = {
  title?: string;
  type?: EmbedType;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedThumbnail;
  video?: EmbedVideo;
  provider?: EmbedProvider;
  author?: EmbedAuthor;
  fields?: EmbedField[];
};

export type Component = {
  style: number;
  label: string;
  url: string;
  disabled: boolean;
  type: number;
};

export enum MessageFlags {
  Crossposted = 1 << 0, // This message has been published to subscribed channels (via Channel Following)
  IsCrosspost = 1 << 1, // This message originated from a message in another channel (via Channel Following)
  SuppressEmbeds = 1 << 2, // Do not include any embeds when serializing this message
  SourceMessageDeleted = 1 << 3, // The source message for this crosspost has been deleted (via Channel Following)
  Urgent = 1 << 4, // This message came from the urgent message system
  HasThread = 1 << 5, // This message has an associated thread, with the same id as the message
  Ephemeral = 1 << 6, // This message is only visible to the user who invoked the Interaction
  Loading = 1 << 7, // This message is an Interaction Response and the bot is "thinking"
  FailedToMentionSomeRolesInThread = 1 << 8, // This message failed to mention some roles and add their members to the thread
  SupressNotifications = 1 << 12, // This message will not trigger push and desktop notifications
  IsVoiceMessage = 1 << 13, // This message is a voice message
}