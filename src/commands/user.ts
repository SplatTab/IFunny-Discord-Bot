import { Command, funny } from ".";
import { ApplicationCommandOptionType, Embed, MessageFlags } from "../types";

const command: Command = {
  data:
  {
    name: "user",
    description: "Look's up a user on iFunny",
    options: [
        {
            name: "username",
            description: "iFunny nickname",
            type: ApplicationCommandOptionType.STRING,
            required: true
        }
    ]
  },

  async execute(interaction) {
    // Sanitizes all non alphanumeric characters besides _. I don't think theres anything else you can put in a iFunny username besides those?
    const user = await funny.searchUserByNick(interaction.data.options[0].value.replace(/[^a-zA-Z0-9_]/g, ''))
    if (user) {
      const embed: Embed = {
        // title: user.about || "No Bio",
        title: "Data:",
        color: parseInt(user.cover_bg_color, 16) || parseInt(user.nick_color, 16) || 0x95a5a6,
        fields: [
          {
            name: "Info:",
            value: `
            ID: ${user.id}
            Bio: ${user.about || "No Bio"}
            Verified: ${user.is_verified ? "Yes" : "No"}
            Banned: ${user.is_banned ? "Yes" : "No"}
            Meme Rank: ${user.meme_experience.rank}
            Meme Days: ${user.meme_experience.days}
            Messaging Privacy: ${user.messaging_privacy_status}
            Private: ${user.is_private ? "Yes" : "No"}
            `
          },
          {
            name: "Stats:",
            value: `
            Total Smiles: ${user.num.total_smiles}
            Total Posts: ${user.num.total_posts}
            Features: ${user.num.featured}
            Subscribers: ${user.num.subscribers}
            Subscriptions: ${user.num.subscriptions}
            Memes Created: ${user.num.created}
            Achievements: ${user.num.achievements}`
          },
          {
            name: "Ban Logs:",
            value: `
            Total Bans: ${user.bans.length}
            ${user.bans.map(ban => `ID: ${ban.id} | Type: ${ban.type} | Date Until: ${ban.date_until}`).join("\n")}
            `
          },
          {
            name: "Cover Photo:",
            value: ""
          },
        ],
        image: {
          url: user.cover_url,
        },
        author: {
          name: user.nick || "Unknown Nickname",
          url: user.web_url || "https://ifunny.co/",
          icon_url: user.photo?.url || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
        }
      }

      return { embeds: [embed]}
    }
    else {
        return { content: "Failed to find user. Double check the username.", flags: MessageFlags.Ephemeral}
    }
  }
}

export default command;