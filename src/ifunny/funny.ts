import { Feed, Token, User } from "./funny-types";

export class iFunny {
    public token : Token;
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

    // Will maybe use this later too
    async getToken(email: string, password: string) {
      try {
          const body = {
            username: email,
            password: password,
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

          this.token = (await response.json()) as Token;
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

    async searchUserByNick(nick: string): Promise<User | null> {
      try {
        const response = await fetch('https://api.ifunny.mobi/v4/users/by_nick/' + nick, {
          method: 'GET',
          headers: this.header,
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as { data: User};
        return result.data
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  }
}