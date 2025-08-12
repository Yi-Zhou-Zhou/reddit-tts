import { api } from "../axiosConfig";


export async function fetchPosts() {
    console.log("fETCHING POSTS...")
    const files = await api.get('posts')
    return files
}