    import { create } from "zustand";
import axios from "axios";
interface Post {
  subreddit: string;
  title: string;
  selfText: string;
  thumbnail?: string;
  url: string;
  upvotes: number;
}
interface usePost {
  beforeId: string | null;
  afterId: string | null;
  savedPosts: Array<object>;
  currentPosts: Array<object>;
  savePost: (post: Post) => void;
  addPost: (post: Post) => void;
  fetchPosts: () => void;
  setBeforeId: (id:string) => void,
  setAfterId: (id: string) => void
}

interface fetchResponse{
    data: {
        data: {
            before: string | null,
            after: string | null,
            children: Array<{data: Post, kind: string}>
        }
    }

    
}

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
    const {after, before, children} = response.data.data.data;
    set(() => ({
        beforeId: before? before : null,
        afterId: after? after : null ,
        currentPosts: children.map(post => ({
            subreddit: post.data.subreddit,
            title: post.data.title,
            description: post.data.selfText,
            thumbnail: post.data.thumbnail,
            url: post.data.url,
            upvotes: post.data.upvotes,
        }))
        
    }))
  },
  savePost: (post) =>
    set((state) => ({ savedPosts: [...state.savedPosts, post] })),
  addPost: (post) =>
    set((state) => ({ currentPosts: [...state.currentPosts, post] })),
  setBeforeId: (id) => set(() => ({beforeId: id})),
  setAfterId: (id) => set(() => ({afterId: id}))

}));
