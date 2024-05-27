import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { IconButton} from "@/components/ui/icon-button"
import { List } from "@phosphor-icons/react";
import logo from "@/assets/logo-row.svg"
import MobileMenu from "./mobile-menu";
import Image from "next/image";
const MobileNav = () => {

  return (
    <div className="flex w-full px-6 pt-6 justify-between items-center lg:hidden overflow-hidden">
         <Image src={logo} className="w-64 h-auto max-h-[30px]" alt="Agro Control" width={248} height={248} />
      <Sheet>
        <SheetTrigger >
          <IconButton Icon={List} />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="max-w-screen flex h-full w-full flex-col gap-5 bg-white p-5 md:max-w-[425px]"
        >
          <div className="flex w-full max-h-[30px] items-center justify-between mb-10 pl-4">
            <div className="flex items-center gap-3">
            <Image src={logo} className="w-64 h-auto " alt="Agro Control" width={248} height={248} />
            </div>
            <SheetClose className="text-green-950"></SheetClose>
          </div>

          <MobileMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNav;