const ContainerWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="">
      <div className="flex place-content-between px-14 mx-24">{children}</div>
      <div className="relative w-[95%] border-2 justify-self-center border-amber-100 rounded-t-xl h-3 bg-orange-200"></div>
      <div className="w-full border-2 border-amber-100 h-4 rounded-t-xl bg-orange-200"></div>
    </div>
  )
}
export default ContainerWrapper
