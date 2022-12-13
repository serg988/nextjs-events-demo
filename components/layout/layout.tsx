import MainHeader from "./main-header"

interface ILayout {
  children: React.ReactNode
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  )
}