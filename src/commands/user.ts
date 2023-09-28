import { Command, funny } from ".";
import { User } from "../ifunny/funny-types";

const command: Command = {
  data:
  {
    name: "user",
    description: "Look's up a user on iFunny",
    options: [
        {
            name: "username",
            description: "iFunny nickname",
            type: 3,
            required: true
        }
    ]
  },

  async execute(interaction) {
    // Sanitizes all non alphanumeric characters besides _. I don't think theres anything else you can put in a iFunny username besides those?
    const user: User = await funny.searchUserByNick(interaction.data.options[0].value.replace(/[^a-zA-Z0-9_]/g, ''))
    if (user) {
        return { content: `${user.nick} has ${user.meme_experience.days} days of meme experience`}
    }
    else {
        return { content: "Failed to find user. Double check the username."}
    }
  }
}

export default command;