import { createFileRoute } from '@tanstack/react-router'
import { fetchPosts } from '../../api/posts'
export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
  loader: () => fetchPosts()
})

function RouteComponent() {

  return <div>Hello "/_authenticated/ Ya"!</div>
}
