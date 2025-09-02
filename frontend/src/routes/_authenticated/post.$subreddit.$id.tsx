import { createFileRoute } from "@tanstack/react-router";
import { fetchPost } from "../../utils";
import Post from "../../components/Post/Post";
interface RouteParams {
  subreddit: string;
  id: string;
}

export const Route = createFileRoute("/_authenticated/post/$subreddit/$id")({
  component: RouteComponent,
  loader: ({ params }: { params: RouteParams }) =>
    fetchPost(params.subreddit, params.id),
});

function RouteComponent() {
  const response = Route.useLoaderData();
  if (!response) {
    return <div>Loading or no data...</div>;
  }

  const postData = response[0].data.children[0].data;
  const commentsData = response[1].data.children;
  return (
    <div className="w-full flex justify-center items-start">
      {response && <Post originalPoster={postData} comments={commentsData} />}
    </div>
  );
}
