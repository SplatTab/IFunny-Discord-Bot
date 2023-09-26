import { Command, Component, funny } from ".";

const command: Command = {
  data: {
      name: "collective",
      description: "Get's a random meme from collective feed"
  },

  async execute(interaction) {
    // iFunny's API weird or something so if we fail to get a meme we will just spam it 3 times till we get somewhere
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        // I could technically get 1 meme and still get videos but the chances are very low
        const response = await funny.getCollective(7);

        if (response) {
          // So we look for a video specifically then flip a coin whether to use that video or just choose another one of the 5 memes
          let meme = response.data.content.items[0];
          response.data.content.items.forEach(element => {
            if (element.type === "video_clip" && Math.random() == 0) meme = element;
            else meme = response.data.content.items[Math.floor(Math.random() * 7)];
          });

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
          if (meme.type === "video_clip") {
            return { content: meme.share_url, components};
          }
          else {
            const embed = {
              title: meme.title,
              description: meme.ocr_text.replace(/\n/g, ' '),
              color: funny.IFUNNY_YELLOW,
              author: {
                name: meme.creator.nick,
                icon_url: meme.creator.photo.url,
              },
              image: {
                url: meme.thumb.proportional_url
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
          return {
            content: "An error occurred while fetching the collective! Is iFunny down?",
          };
        }
      }
    }
  },
};

export default command;