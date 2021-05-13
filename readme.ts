/**
 * ssb-typescript
 * --------------
 *
 * Contains type definitions for common SSB concepts.
 *
 *     npm install ssb-typescript
 *
 * Usage:
 *
 *     import {Msg} from 'ssb-typescript';
 */

/**
 * Starts with @
 */
export type FeedId = string;

/**
 * Starts with %
 */
export type MsgId = string;

/**
 * Starts with &
 */
export type BlobId = string;

export type Msg<C = Content> = {
  key: MsgId;
  value: {
    previous: MsgId;
    author: FeedId;
    sequence: number;
    timestamp: number;
    hash: "sha256";
    content: C;
    signature: string;
  };
  timestamp: number;
};

export type MsgInThread = Msg<{
  root?: MsgId;
  fork?: MsgId;
  branch?: MsgId;
}>;

export type UnboxedMsg<C = Content> = Msg<C> & {
  value: Msg<C>["value"] & {
    cyphertext: string;
    private: true;
    unbox: string;
  };
  meta?: {
    private: true;
    originalContent: string;
  };
};

export type Privatable<T> = T & { recps?: Array<FeedId> };

export type Content =
  | Privatable<PostContent>
  | Privatable<ContactContent>
  | Privatable<VoteContent>
  | Privatable<AboutContent>
  | null;

export type PostContent = {
  type: "post";
  text: string;
  channel?: string;

  /**
   * Links
   */
  mentions?: Array<any>;
  root?: MsgId;
  branch?: MsgId | Array<MsgId>;
  fork?: MsgId;
  // recps: FeedLinks;
  // mentions: Links;
};

export type AboutContent = {
  type: "about";
  about: FeedId;
  name?: string;
  description?: string;
  image?: string;
};

export type ContactContent = {
  type: "contact";
  contact?: FeedId;
  following?: boolean;
  blocking?: boolean;
};

export type VoteContent = {
  type: "vote";
  vote: {
    link: MsgId;
    value: number;
    expression: string;
  };
};

export type About = {
  name?: string;
  description?: string;
  color?: string;
  imageUrl?: string;
  id?: FeedId;

  /**
   * true means following
   * null means not-following
   * false means blocked
   */
  following?: true | null | false;
};

export type PeerMetadata = {
  host: string;
  port: number;
  key: string;
  name?: string;
  source: "local" | "pub" | "manual";
  announcers?: number;
  duration?: any;
  client: boolean;
  state: "connecting" | "connected" | "disconnecting" | undefined;
  stateChange: number;
  ping?: {
    rtt: {
      mean: number;
      stdev: number;
      count: number;
      sum: number;
      sqsum: number;
    };
    skew: {
      mean: number;
      stdev: number;
      count: number;
      sum: number;
      sqsum: number;
    };
  };
};

export type BlogContent = {
  type: "blog";
  title: string;
  summary: string;
  channel?: string;
  thumbnail?: string;
  blog: string;

  /**
   * Links
   */
  mentions?: Array<any>;
  root?: MsgId;
  branch?: MsgId | Array<MsgId>;
  fork?: MsgId;
  // recps: FeedLinks;
  // mentions: Links;
};
