import axios from "axios";

export async function fetchPosts() {
    const KEYWORDS = 'chile'
    const SORT_TYPE= 'recent'
    const TIME_TYPE= 'all'
    const posts = await axios.get(`https://www.reddit.com/search.json?q=${KEYWORDS}&restrict_sr=false&sort=${SORT_TYPE}&t=${TIME_TYPE}`)
    return posts.data.data
}