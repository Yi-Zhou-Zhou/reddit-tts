import { RiMenuFill } from "react-icons/ri";
import { useSidebar } from "../../store/useSidebar";
const Sidebar = () => {
    const {open, toggleSidebar} = useSidebar()
  return (
    <aside className={`h-[calc(100vh-58px)] ${open ? 'w-[300px]' : 'w-[32px]'} relative border-r border-light-gray-100 transition-all duration-700`}>
        <span className="p-2 border border-light-gray-400 inline-flex items-center justify-center rounded-[50%] absolute right-[-19px] top-[30px] hover:cursor-pointer" onClick={toggleSidebar}>
            <RiMenuFill size={18}/>
        </span>
    
    </aside>
  )
}

export default Sidebar
