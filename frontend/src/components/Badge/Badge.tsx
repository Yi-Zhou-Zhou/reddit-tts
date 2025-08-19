import type { IconType } from "react-icons/lib";

interface BadgeType{
    Icon: IconType | null,
    text: string

}
const Badge = ({Icon, text} : BadgeType)  => {
  return (
    <span className='inline-flex items-center px-3 py-[5px] w-fit rounded-2xl gap-1 mr-3 bg-darker-white mt-3 '>
        {Icon && <Icon size={18}/>}
        <p className="text-[14px]">{text}</p>
    </span>
  )
}

export default Badge
