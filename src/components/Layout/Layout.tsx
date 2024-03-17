import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Logo from "../Logo/Logo"


export default function Layout() {
  return (
    <>
      <Logo />

      <Suspense>
        <Outlet />
      </Suspense>
    </>
  )
}
