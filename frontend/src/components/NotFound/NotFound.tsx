import notFoundLogo from "../../assets/images/notFound.png"
const NotFound = () => {
  return (
    <div className="flex gap-2 wrap items-center">
      <img src={notFoundLogo} alt="Resource not found image" className="invert h-[40px] w-[40px] brightness-25" />
      <p> No se encontraron resultados...</p>
    </div>
  )
}

export default NotFound