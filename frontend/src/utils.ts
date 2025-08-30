import type { ApiListingResponse, Post, RedditPostData } from "./types/post";
import axios from "axios";
import type { Comment } from "./types/post";
export function formatNumber(num: number): string {
  if (!num) return "0";
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
  };
}

export async function fetchPost(
  subreddit: string,
  id: string
): Promise<ApiListingResponse<Comment>[] | undefined> {
  if (!subreddit || !id) return;
  const GET_POST_URL = `http://api.reddit.com/r/${subreddit}/comments/${id}.json`;
  try {
    const response =
      await axios.get<ApiListingResponse<Comment>[]>(GET_POST_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

type TimeMeasure = "yr" | "mo" | "day" | "hour" | "minute" | "second";

export function calculateDifferenceTime(epochUNIXTime: number): string {
  const today = new Date();
  const epochToDate = new Date(epochUNIXTime * 1000);
  const difference = today.getTime() - epochToDate.getTime();
  let operator = 1000 * 60 * 60 * 24 * 30 * 365;
  let isMonthDifference = Math.floor(difference / operator);

  const measures: Record<TimeMeasure, number> = {
    yr: 365,
    mo: 30,
    day: 24,
    hour: 60,
    minute: 60,
    second: 1000,
  };

  for (const measure of Object.keys(measures) as TimeMeasure[]) {
    if (isMonthDifference > 0) {
      if ((isMonthDifference > 1 && measure !== "yr" && measure !== "mo"))
        return isMonthDifference + " " + measure + "s ago";
      return isMonthDifference + " " + measure + " ago";

    }
    operator /= measures[measure];
    isMonthDifference = Math.floor(difference / operator);
  }
  return "";
}
