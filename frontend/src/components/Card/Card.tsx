import { useEffect, useRef, useState } from "react";
import type { Post } from "../../types/post";
import Badge from "../Badge/Badge";
import { BiUpvote } from "react-icons/bi";
import { formatNumber } from "../../utils";
import { FaRegComment } from "react-icons/fa";
interface CardProps {
  post: Post;
}

const Card = ({ post }: CardProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [boxHeight, setBoxHeight] = useState<number>(0);

  useEffect(() => {
    if (!post.baseImg) return;
    const el = boxRef.current;
    if (!el) return;

    const update = () => {
      const W = el.clientWidth;
      if (post.baseImg) {
        const { width: iw, height: ih } = post.baseImg;
        const scale = Math.min(1, W / iw);
        const h = Math.min(540, Math.round(ih * scale));
        setBoxHeight(h);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [post.baseImg]);

  useEffect(() => {});

  return (
    <article className="max-w-[100vw] w-[700px] max-h-[100vh] p-4 rounded-2xl hover:cursor-pointer hover:bg-[#f6f8f9]">
      <span className="flex justify-between" key={post.id}>
        <p className="text-tiny font-bold">{post.subreddit_name_prefixed}</p>
      </span>
      <h1 className="font-bold text-lg">{post.title}</h1>

      {post.baseImg && (
        <div ref={boxRef} className="w-full">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: boxHeight || 0 }}
          >
            <img
              src={post.baseImg.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
            />

            <img
              src={post.baseImg.url}
              alt=""
              className="relative z-10 block h-full max-h-full w-auto max-w-full object-contain mx-auto"
            />
          </div>
        </div>
      )}
      {!post.baseImg && (
        <div className=" overflow-hidden">
          <p className="overflow-hidden text-ellipsis break-words post-text">
            {post.selftext}
          </p>
        </div>
      )}
      <span className="">
        <Badge Icon={BiUpvote} text={formatNumber(post.score)} />
        <Badge Icon={FaRegComment} text={formatNumber(post.num_comments)} />
      </span>
    </article>
  );
};

export default Card;
