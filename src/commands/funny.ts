type Token = {
  access_token: string,
  token_type: string,
  expires_in: number
};

type Feed = {
  data: {
    content: {
      items: {
        pic: {
          webp_url: string;
        };
        id: string;
        type: string;
        url: string;
        share_url: string;
        old_watermark: boolean;
        link: string;
        title: string;
        tags: string[];
        state: string;
        date_create: number;
        publish_at: number;
        is_smiled: boolean;
        is_unsmiled: boolean;
        is_abused: boolean;
        is_featured: boolean;
        is_republished: boolean;
        is_pinned: boolean;
        is_unsafe: boolean;
        bg_color: string;
        thumb: {
          url: string;
          large_url: string;
          x640_url: string;
          webp_url: string;
          large_webp_url: string;
          x640_webp_url: string;
          proportional_url: string;
          proportional_webp_url: string;
          proportional_size: {
            w: number;
            h: number;
          };
        };
        copyright: Record<string, any>; // You can specify a more specific type if available
        num: {
          smiles: number;
          unsmiles: number;
          guest_smiles: number;
          comments: number;
          views: number;
          republished: number;
          shares: number;
        };
        creator: {
          id: string;
          nick: string;
          photo: {
            bg_color: string;
            thumb: {
              large_url: string;
              medium_url: string;
              small_url: string;
            };
            url: string;
          };
          is_verified: boolean;
          is_banned: boolean;
          is_deleted: boolean;
          is_in_subscriptions: boolean;
          is_in_subscribers: boolean;
          is_blocked: boolean;
          num: {
            subscriptions: number;
            subscribers: number;
          };
          total_posts: number;
          original_nick: string;
        };
        size: {
          w: number;
          h: number;
        };
        issue_at: number;
        visibility: string;
        shot_status: string;
        fast_start: boolean;
        risk: number;
        canonical_url: string;
        ocr_text: string;
        can_be_boosted: boolean;
        ftag: string;
      }[];
    };
  };
  status: number;
};

export class iFunny {
    public token : string;
    readonly IFUNNY_YELLOW = 0xFFD22E

    protected header = {
      Host: 'api.ifunny.mobi',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      authorization: 'Basic NjUzNjM0MzQ2MzM4MzI2MjJENjQ2NTY1NjMyRDM0MzAzMjM4MkQ2MTMxNjYzMzJEMzEzMzMxMzAzMzM0MzQzMzMzNjQ2MzM0X01zT0lKMzlRMjg6Y2Y2Njc5OTdiY2U5MTJhOTc1MDZhMmFlYjM0ZTI0MWI5NjZiNTdlZQ==',
      'accept-language': 'en-US,en;q=0.5',
      'ifunny-project-id': 'iFunny',
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'gzip, deflate, br',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0',
    };

    async getFileSize(videoUrl: string) {
      try {
        // Send a HEAD request to get the headers without downloading the entire file
        const response = await fetch(videoUrl, { method: "HEAD" });

        if (response.ok) {
          // Get the 'Content-Length' header value
          const contentLength = response.headers.get("Content-Length");

          if (contentLength) {
            // Convert contentLength to a number (file size in bytes)
            const fileSizeBytes = parseInt(contentLength, 10);

            return fileSizeBytes;
          } else {
            throw new Error("Content-Length header not found.");
          }
        } else {
          throw new Error(`Failed to fetch the video. Status code: ${response.status}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    }

    async getToken() {
      try {
          const body = {
            // username: email,
            // password: pass,
            grant_type: 'password',
          };

          const response = await fetch('https://api.ifunny.mobi/v4/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams(body).toString(),
            headers: this.header,
          });

          if (!response.ok) {
            if (response.status === 403) {
              const result = (await response.json()) as { data: { captcha_url: string } };
              throw new Error(`CAPTCHA Required: ${result.data.captcha_url}`);
            } else {
              throw new Error(`Error! status: ${response.status}`);
            }
          }

          const result = (await response.json()) as Token;
          this.token = result.access_token;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    }

    async getFeatures(limit: number): Promise<Feed | null> {
        try {
          const response = await fetch('https://api.ifunny.mobi/v4/feeds/featured?limit=' + limit, {
            method: 'GET',
            headers: this.header,
          });

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }

          const result = (await response.json()) as Feed;
          return result
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('unexpected error: ', error);
        }
      }
    }

    async getCollective(limit: number): Promise<Feed | null> {
      try {
        const response = await fetch('https://api.ifunny.mobi/v4/feeds/collective?limit=' + limit, {
          method: 'POST',
          headers: this.header,
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as Feed;
        return result
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  }
}