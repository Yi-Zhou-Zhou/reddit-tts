import type { RedditResponseChildren, Post} from "./types/post";

export function formatNumber(num: number): string {
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

export function mapRedditChildToPost(child: RedditResponseChildren): Post {
  const d = child.data
  return {
    subreddit: d.subreddit,
    subreddit_id: d.subreddit_id,
    subreddit_name_prefixed: d.subreddit_name_prefixed,
    subscribers: d.subscribers,
    title: d.title,
    selftext: d.selftext,
    thumbnail: d.thumbnail ?? null,
    url: d.url,
    score: d.score,
    id: d.id,
    num_comments: d.num_comments,
    baseImg: d.preview
      ? {
          url: d.preview.images[0].source.url.replace(/&amp;/g, "&"),
          width: d.preview.images[0].source.width,
          height: d.preview.images[0].source.height,
        }
      : null,
  }
}
