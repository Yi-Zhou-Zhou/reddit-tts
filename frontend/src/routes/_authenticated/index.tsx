import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import Card from "../../components/Card/Card";
import { CiSearch } from "react-icons/ci";
import { usePosts } from "../../store/usePosts";
import useDebounce from "../../hooks/useDebounce";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mapRedditChildToPost } from "../../utils";
import NotFound from "../../components/NotFound/NotFound";
import {useInView} from "react-intersection-observer";
import type { InitialFetchReddit, RedditResponse} from "../../types/post";
export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { fetchPosts } = usePosts.getState();
  const [keywords, setKeywords] = useState<string>("");
  const {ref : endRef, inView} = useInView()
  const value = useDebounce(keywords);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setKeywords(e.target.value.toLocaleLowerCase());
  }

  
  const { data, isLoading, fetchNextPage} = useInfiniteQuery<RedditResponse, Error, InitialFetchReddit, readonly [string, string|null], string| null | undefined>({
    queryKey: ["posts", value ?? ""],
    queryFn: ({ pageParam}) => fetchPosts(value ? value : "", pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.after ?? null;
    },
    initialPageParam: null,
  });

  let body;
  
  if (!value) {
    body = <p>Por favor, ingrese keywords para comenzar su búsqueda</p>;
  } else if (isLoading) {
    body = <p>Loading...</p>;
  } else if (data && data.pages[0].data.children.length === 0) {
    body = <NotFound />;
  } else if (data) {
    body = data.pages.flatMap(page => page.data.children.map(p => {
      const post = mapRedditChildToPost(p.data);
            return (
              <React.Fragment key={post.id}>
                <Card post={post} />
                <hr className="border border-darker-white" />
                
              </React.Fragment>
            );
    }))

  }
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage])

  console.log(data)
  return (
    <div>
      <div className="relative mb-8 w-[700px] max-w-screen">
        <input
          type="text"
          placeholder="Inserte las keywords a buscar "
          onChange={handleChange}
          className=" placeholder:text-light-gray-100 w-full outline-none border border-light-gray-400 pl-4 py-2 pr-10 rounded-[36px] mb-8 z-[99px]"
        />
        <CiSearch
          size={24}
          className="absolute right-[15px] top-[7px] text-light-gray-100"
        />

        <section className="flex flex-col gap-2 ]">
            {body}
            {data && data.pages[data.pages.length - 1].data.after && (
  <div ref={endRef} id="endRef" className="h-10" />
)}
          </section>
      </div>
    </div>
  );
}
