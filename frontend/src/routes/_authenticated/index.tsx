import { createFileRoute } from "@tanstack/react-router";
import Card from "../../components/Card/Card";
import { CiSearch } from "react-icons/ci";
import { usePosts } from "../../store/usePosts";
const postLoader = async () => {
  const { fetchPosts } = usePosts.getState();
  await fetchPosts();
  return { posts: usePosts.getState().currentPosts };
};
export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
  loader: postLoader,
});

function RouteComponent() {
  const routerData = Route.useLoaderData();
  return (
    <div>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Inserte las keywords a buscar "
          className=" placeholder:text-light-gray-100 w-full outline-none border border-light-gray-400 pl-4 py-2 pr-10 rounded-[36px] mb-8"
        />
        <CiSearch
          size={24}
          className="absolute right-[15px] top-[7px] text-light-gray-100"
        />
        <section className="flex flex-col gap-2">
          {routerData.posts.map((post) => {
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
