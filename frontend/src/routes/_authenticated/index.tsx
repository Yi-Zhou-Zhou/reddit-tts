import { createFileRoute } from "@tanstack/react-router";
import Card from "../../components/Card/Card";
import { CiSearch } from "react-icons/ci";
import { usePosts } from "../../store/usePosts";
import useDebounce from "../../hooks/useDebounce";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mapRedditChildToPost } from "../../utils";
const postLoader = async () => {
  const { fetchPosts } = usePosts.getState();
  await fetchPosts("a");
  return { posts: usePosts.getState().currentPosts };
};
export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
  loader: postLoader,
});

function RouteComponent() {
  const {fetchPosts} = usePosts.getState()
  const [keywords, setKeywords] = useState<string>('')
  const value = useDebounce(keywords)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    setKeywords(e.target.value)

  }

  const {data, } =useInfiniteQuery({
    queryKey: ['posts', value],
    queryFn: () => fetchPosts(value ? value : ''),
    getNextPageParam: (lastPage) => { return lastPage.data.after ?? undefined},
    initialPageParam: null,



  })
  console.log(data)
  return (
    <div>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Inserte las keywords a buscar "
          onChange={handleChange}
          className=" placeholder:text-light-gray-100 w-full outline-none border border-light-gray-400 pl-4 py-2 pr-10 rounded-[36px] mb-8"
        />
        <CiSearch
          size={24}
          className="absolute right-[15px] top-[7px] text-light-gray-100"
        />
        <section className="flex flex-col gap-2">
          {data && data.pages[0].data.children.map((p) => {
            const post = mapRedditChildToPost(p)
            return (
              <>
                <Card post={post} />
                <hr className="border border-darker-white" />
              </>
            );
          })}
        </section>
      </div>
    </div>
  );
}
