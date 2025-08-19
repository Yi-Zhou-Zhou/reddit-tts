import { create } from "zustand";
import axios from "axios";
import type { RedditPostData, Post} from "../types/post";
interface usePost {
  beforeId: string | null;
  afterId: string | null;
  savedPosts: Post[];
  currentPosts: Post[];
  savePost: (post: Post) => void;
  addPost: (post: Post) => void;
  fetchPosts: () => Promise<void>;
  setBeforeId: (id: string) => void;
  setAfterId: (id: string) => void;
}

interface fetchResponse {
    data: {
      before: string | null;
      after: string | null;
      children: Array<{ data: RedditPostData; kind: string }>;
    };
  };


export const usePosts = create<usePost>()((set) => ({
  beforeId: null,
  afterId: null,
  savedPosts: [],
  currentPosts: [],
  fetchPosts: async () => {
    // MUST CHANGE TO USER INPUT VALUES
    const KEYWORDS = "chile";
    const SORT_TYPE = "recent";
    const TIME_TYPE = "all";
    const response = await axios.get<fetchResponse>(
      `https://www.reddit.com/search.json?q=${KEYWORDS}&restrict_sr=false&sort=${SORT_TYPE}&t=${TIME_TYPE}`
    );
    const { after, before, children } = response.data.data;
    set(() => ({
      beforeId: before ? before : null,
      afterId: after ? after : null,
      currentPosts: children.map((post) => ({
        subreddit: post.data.subreddit,
        subreddit_id: post.data.subreddit_id,
        subreddit_name_prefixed: post.data.subreddit_name_prefixed,
        subscribers: post.data.subscribers,
        title: post.data.title,
        selftext: post.data.selftext,
        thumbnail: post.data.thumbnail ? post.data.thumbnail : null,
        url: post.data.url,
        score: post.data.score,
        id: post.data.id,
        num_comments: post.data.num_comments,
        baseImg: post.data.preview ? {
          url: post.data.preview ?  post.data.preview.images[0].source.url.replace(/&amp;/g, "&") : '',
          width: post.data.preview.images[0].source.width,
          height: post.data.preview.images[0].source.height
        } : null
    })),
    }));
  },
  savePost: (post) =>
    set((state) => ({ savedPosts: [...state.savedPosts, post] })),
  addPost: (post) =>
    set((state) => ({ currentPosts: [...state.currentPosts, post] })),
  setBeforeId: (id) => set(() => ({ beforeId: id })),
  setAfterId: (id) => set(() => ({ afterId: id })),
}));
