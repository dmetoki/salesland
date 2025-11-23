import { Fragment } from "react/jsx-runtime";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggler";
// import CalendarDropdown from "@/components/calendar-dropdown";
import NavUser from "./nav-user";

export default async function Header() {
  return (
    <Fragment>
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-8 z-50 bg-card">
        <div className="flex items-center gap-2 ml-2">
          <Image
            src="/logo.svg"
            alt="Brand logo"
            width={32}
            height={32}
            className="dark:invert-0"
          />
          <span className="font-semibold leading-tight mt-0.5">HAUSBOARD</span>
        </div>
        <div className="flex-1 flex items-center justify-center"></div>
        <div className="flex items-center gap-4">
          {/* <CalendarDropdown/> */}
          <ModeToggle />
          <NavUser />
        </div>
      </header>
    </Fragment>
  )
}