import { Command, Embed, Component } from ".";
import { iFunny } from "./funny";

const MAX_RETRIES = 3; // Maximum number of retry attempts

const command: Command = {
  data: {
      name: "collective",
      description: "Get's a random meme from collective feed"
  },

  async execute(interaction) {
    async function retryOperation(retryCount: number) {
      try {
        // Fetch's collective meme from ifunny
        const funny = new iFunny();
        const response = await funny.getCollective();

        // Check that the response is not null before using it
        if (response) {
          const meme = response.data.content.items[0];

          // Embed with meme image that get's posted
          const embed: Embed = {
            title: meme.title,
            description: meme.ocr_text.replace(/\n/g, ' '),
            color: 0xFFD22E,
            author: {
              name: meme.creator.nick,
              icon_url: meme.creator.photo.url,
            },
            image: {
              url: meme.thumb.proportional_url,
            },
          };

          // Button that links to the meme on ifunny.co
          const urlbutton: Component = {
            style: 5,
            label: "Link",
            url: meme.link,
            disabled: false,
            type: 2,
          };

          return {
            components: [
              {
                type: 1,
                components: [urlbutton],
              },
            ],
            embeds: [embed],
          };
        } else {
          throw new Error('Response was not valid');
        }
      } catch (error) {
        console.error("Error:", error);

        if (retryCount < MAX_RETRIES) {
          // Retry the operation with an increased retry count
          return retryOperation(retryCount + 1);
        } else {
          return {
            content: "An error occurred while fetching the collective!",
          };
        }
      }
    }

    return retryOperation(0); // Start the retry with 0 retryCount
  },
};

export default command;