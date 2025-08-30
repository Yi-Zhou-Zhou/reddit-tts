import type { Comment, ApiListingItem } from "../../types/post";
import { GoArrowLeft } from "react-icons/go";
import { calculateDifferenceTime } from "../../utils";
import { useNavigate } from "@tanstack/react-router";
interface PostType {
  originalPoster: Comment;
  comments: ApiListingItem<Comment>[];
}

const Post = ({ originalPoster, comments }: PostType) => {
  const differenceTime = calculateDifferenceTime(originalPoster.created)
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center gap-2">
      <button className="bg-[#E2E1E8] rounded-[50%] p-2 w-8 h-8 hover:cursor-pointer" onClick={() => navigate({to: "/"})}>
        <GoArrowLeft size={15} />
      </button>

      <div className="flex items-center gap-2">
        <span className="w-8 h-8 bg-black rounded-[50%] " />
        <div className="flex flex-col">
          <p className="text-[14px]">
            <strong>r/{originalPoster.subreddit}</strong>
            <span className="font-normal"> • </span>
            <span className="font-normal text-[#576f76]">{differenceTime}</span>
          </p>
          <p className="text-[12px]">{originalPoster.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
