import { Command } from ".";

const command: Command = {
  data:
  {
    name: "invite",
    description: "Get an invite link for the bot"
  },

  async execute(interaction) {
    return { content: "https://discord.com/api/oauth2/authorize?client_id=1139008014863581345&permissions=8&scope=bot"}
  }
}

export default command;