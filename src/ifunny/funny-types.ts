export type Token = {
  access_token: string,
  token_type: string,
  expires_in: number
};

// Thumbnail of meme or first image
type Thumbnail = {
  small_url: string;
  url: string; // This will be the url without the watermark
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
}

// Self explanatory
type ProfilePhoto = {
  bg_color: string;
  thumb: {
      large_url: string;
      medium_url: string;
      small_url: string;
  };
  url: string;
}

// iFunny's user rating or meme rank points see meme experience later
type UserRating = {
  points: number;
  current_level: {
    id: string;
    value: number;
    points: number;
  };
  next_level: {
    id: string;
    value: number;
    points: number;
  };
  max_level: {
    id: string;
    value: number;
    points: number;
  }; // Always has same values
  is_show_level: boolean;
}

// Basic user for feed extended later
type BasicUser = {
  id: string;
  nick: string;
  photo: ProfilePhoto;
  is_verified: boolean;
  is_banned: boolean;
  is_deleted: boolean;
  is_in_subcribers: boolean;
  is_in_subscriptions: boolean;
  is_blocked: boolean;
  nick_color: string; // Hex Code with no #
  rating: UserRating;
}

// States of a meme smiles etc
type ContentStats = {
  smiles: number;
  unsmiles: number;
  guest_smiles: number; // Smiled with Basic Token
  comments: number;
  views: number;
  republished: number;
  shares: number;
}

// Type of meme/format
export enum MemeType {
  pic = "pic",
  video_clip = "video_clip"
}

// A list of memes grabbed from a feed
export type Feed = {
  data: {
    content: {
      items: {
        video_clip?: {
          screen_url: string;
          bytes: number;
          source_type: string;
          duration: number; // In seconds
        };
        pic?: {
          webp_url: string;
        };
        id: string;
        type: MemeType;
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
        thumb: Thumbnail
        copyright?: Record<string, string>;
        num: ContentStats
        creator: BasicUser
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

// Meming experience or rank includes days and badge image
type MemeExperience = {
  days: number;
  rank: string; // MemeRank
  badge_url: string; // `https://img.ifunny.co/meme_experience/${index}.png`
  badge_size: {
      w: number;
      h: number;
  };
  next_milestone: number;
}

// Don't know much about this but a ban log
type SmallBan = {
  id: string,
  date_until: number, // Seconds since unix epoch
  type: string;
}

// Clout level stats
type UserStats = {
  subscriptions: number;
  subscribers: number;
  total_posts: number;
  created: number;
  featured: number;
  total_smiles: number;
  achievements: number;
}

export enum PrivacyStatus {
  Closed = "closed",
  Public = "public",
  Subscribers = "subscribers",
}

// Full user info
export interface User extends BasicUser {
  is_subscribed_to_updates: boolean;
  meme_experience: MemeExperience;
  messaging_privacy_status: PrivacyStatus; // "closed" | "public" | "subscribers";
  is_available_for_chat: boolean;
  is_private: boolean;
  messenger_token: string; // "1010101010101010101010101010101010101010";
  messenger_active: boolean;
  bans: SmallBan[];
  web_url: string; // `https://ifunny.co/user/${nick}`;
  are_you_blocked: boolean;
  about: string;
  cover_url: string; // `https://img.ifunny.co/user_covers/${cover_id}.webp`;
  cover_bg_color: string; // "2d2214";
  num: UserStats;
  original_nick: string; // If the user's name is against content policy
}