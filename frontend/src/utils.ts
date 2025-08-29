import type {Post, RedditPostData} from "./types/post";
import axios from "axios";

export function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1000) {
    const remainder = num % 1000;
    const div = (num / 1000).toFixed();
    if (remainder > 0) {
      return div.toString() + "." + remainder.toString()[0] + "K";
    }
    return div.toString() + "K";
  }
  return num.toString();
}

export function mapRedditChildToPost(child: RedditPostData): Post {
  return {
    subreddit: child.subreddit,
    subreddit_id: child.subreddit_id,
    subreddit_name_prefixed: child.subreddit_name_prefixed,
    subscribers: child.subscribers,
    title: child.title,
    selftext: child.selftext,
    thumbnail: child.thumbnail ?? null,
    url: child.url,
    score: child.score,
    id: child.id,
    num_comments: child.num_comments,
    baseImg: child.preview
      ? {
          url: child.preview.images[0].source.url.replace(/&amp;/g, "&"),
          width: child.preview.images[0].source.width,
          height: child.preview.images[0].source.height,
        }
      : null,
  }
}


export async function fetchPost(subreddit: string, id: string){
  if(!subreddit || !id) return;
  const GET_POST_URL = `http://api.reddit.com/r/${subreddit}/comments/${id}.json`
  try {
  const response = await axios.get(GET_POST_URL)
  console.log(response)
    
  } catch (error) {
    console.error(error)
  }
}
