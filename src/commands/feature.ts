import { Command, funny } from ".";
import { Component, Embed, MessageFlags } from "../types";
import { MemeType } from "../ifunny/funny-types";

const command: Command = {
  data:
  {
    name: "featured",
    description: "Get's a random meme from featured feed",
  },

  async execute(interaction) {
    // iFunny's API weird or something so if we fail to get a meme we will just spam it 3 times till we get somewhere
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        // Have to get 4 memes so we can get a video(iFunny shows a video every 3 memes)
        const response = await funny.getFeatures(4);

        if (response) {
          // Choose one of four memes randomly
          const meme = response.data.content.items[Math.floor(Math.random() * 4)];
          // Button that links to the meme page on iFunny
          const urlButton: Component = {
            style: 5,
            label: "Link",
            url: meme.link,
            disabled: false,
            type: 2,
          };

          const components = [
            {
              type: 1,
              components: [urlButton],
            },
          ];

          // For video memes we just post the link to the video on iFunny's website might change this though
          if (meme.type == MemeType.video_clip) {
            return { content: meme.share_url, components};
          }
          else {
            const embed: Embed = {
              title: meme.title || "Unknown",
              description: meme.ocr_text.replace(/\n/g, ' ') || "Unknown",
              color: funny.IFUNNY_YELLOW,
              author: {
                name: meme.creator.nick || "Unknown",
                icon_url: meme.creator.photo?.url || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              },
              image: {
                url: meme.thumb.proportional_url
              },
              footer: {
                text: `🙂 ${meme.num.smiles} | 💬 ${meme.num.comments} | ♻️ ${meme.num.shares} | 👁️ ${meme.num.views}`
              }
            }

            return { embeds: [embed], components};
          }
        } else {
          throw new Error('Response was not valid');
        }
      } catch (error) {
        console.error("Error:", error);

        // I don't think we are going to get that meme damm you iFunny
        if (attempt >= 3)
        {
          return { content: "An error occurred while fetching the feature! Is iFunny down?", flags: MessageFlags.Ephemeral};
        }
      }
    }
  },
};

export default command;