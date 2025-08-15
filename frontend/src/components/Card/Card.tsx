import type { Post } from '../../types/post'

interface CardProps {
  post: Post
}
const Card = ({post} : CardProps) => {
  return (
    <article className='border-[1px] border max-w-[100vw] w-[640px] max-h-[100vh] border-light-gray-100 p-2 hover:cursor-pointer hover:bg-[#F2F0F0]'>
        <span className='flex justify-between' key={post.id}>
          <p>{post.subreddit_name_prefixed}</p>
          <p>{post.score}</p>
        </span>
        <h1>{post.title}</h1>
        <div>
          <img src={"https://preview.redd.it/ribj5i99e1qd1.jpeg?auto=webp&s=9add7cd92e21334cd04b72358d601bc2030188e5"} alt={"Background filter, so image doesnt change dimension"}  className='brightness-15 blur-xs '/>  
          {post.thumbnail && 
          <img className='max-h-[540px] object-contain' src="https://preview.redd.it/ribj5i99e1qd1.jpeg?auto=webp&s=9add7cd92e21334cd04b72358d601bc2030188e5" alt="Reddit image"/>

        }
        </div>
        

    </article>
  )
}

export default Card
