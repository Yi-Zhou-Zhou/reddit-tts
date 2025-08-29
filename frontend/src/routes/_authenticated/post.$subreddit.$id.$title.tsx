import { createFileRoute } from '@tanstack/react-router'
import { fetchPost } from '../../utils'

interface RouteParams {
  subreddit: string;
  id: string;
  title: string;
}

export const Route = createFileRoute('/_authenticated/post/$subreddit/$id/$title')({
  component: RouteComponent,
  loader: ({params}: {params: RouteParams}) => fetchPost(params.subreddit, params.id)
  
})

function RouteComponent() {
  return <div>Hello "/_authenticated/post"!</div>
}
