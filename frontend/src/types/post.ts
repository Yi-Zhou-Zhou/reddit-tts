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


