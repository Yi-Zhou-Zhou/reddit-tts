export interface RedditPostData extends PostBase{
  preview: {
    images: Array<{
      source: {
        url: string;
        width: number,
        height: number,
      };
      resolution: [{ url: string; width: number; height: number }];
    }>;
  };
}
interface PostBase {
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subscribers?: number;
  title: string;
  selftext: string;
  thumbnail: string | null;
  url: string;
  score: number;
  id: string;
  num_comments: number;
}


export interface Post extends PostBase{
 baseImg: {
  url: string,
  width: number,
  height: number,
 } | null, 
}
  
export interface RedditResponse {
  data: {
    after: string | null,
    before: string | null,
    children: RedditResponseChildren[]
  }
}

export interface RedditResponseChildren {
  data: RedditPostData,
  kind: string
}

export interface InitialFetchReddit {
  pageParams: [string|null],
  pages: QueryPost[]
}

interface QueryPost {
  data: {
    after: string | null,
    before: string | null,
    children: RedditResponseChildren[]
  }

}

export interface Comment{
  author: string,
  author_flair_text: string|null,
  body: string,
  media_metadata: {
    [key:string]: MediaMetadataItem
  }
  score: number,
  is_submitter: boolean,
  created: number, // epoch unix time
  subreddit: string,

}

interface MediaMetadataItem {
  e: string,
  m: string,
  p: MediaType[],
  s: MediaType,
  id: string
}

interface MediaType {
    "u": string,
    "x": number,
    "y": number
  
}

export interface ApiListingItem<T>{
  data: T,
  kind: string,
}

export interface ApiListingResponse<T>{
  data: {
    after: string | null,
    before: string| null,
    children: ApiListingItem<T>[]
  }
}

export interface InitialFetchPost<T>{
  data: ApiListingResponse<T>[]
}


