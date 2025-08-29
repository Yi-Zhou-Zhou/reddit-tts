import { create } from "zustand";
import axios from "axios";
import type { RedditPostData, Post, RedditResponse} from "../types/post";
import { mapRedditChildToPost } from "../utils";
interface usePost {
  beforeId: string | null;
  afterId: string | null;
  savedPosts: Post[];
  currentPosts: Post[];
  savePost: (post: Post) => void;
  addPost: (post: Post) => void;
  fetchPosts: (keywords: string, pageParam?: string|null) => Promise<RedditResponse>;
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
  fetchPosts: async (keywords = "", pageParam = null) => {
    // MUST CHANGE TO USER INPUT VALUES
    const SORT_TYPE = "hot";
    const TIME_TYPE = "all";
    const response = await axios.get<fetchResponse>(
      `https://www.reddit.com/search.json?q=${keywords}&restrict_sr=false&sort=${SORT_TYPE}&t=${TIME_TYPE}${pageParam ? `&after=${pageParam}` : ''}`
    );
    const { after, before, children } = response.data.data;
    set(() => ({
      beforeId: before ? before : null,
      afterId: after ? after : null,
      currentPosts: children.map((post) => (
        mapRedditChildToPost(post.data)
    )),
    }));
    return response.data;
  },
  savePost: (post) =>
    set((state) => ({ savedPosts: [...state.savedPosts, post] })),
  addPost: (post) =>
    set((state) => ({ currentPosts: [...state.currentPosts, post] })),
  setBeforeId: (id) => set(() => ({ beforeId: id })),
  setAfterId: (id) => set(() => ({ afterId: id })),
}));
