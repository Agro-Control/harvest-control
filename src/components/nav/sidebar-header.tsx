import Image from "next/image";
import logo2 from "@/assets/logo-column.svg";
import Link from "next/link";

const SidebarHeader = () => {
    return (
        <div className="flex h-full max-h-[10vh] w-full flex-col items-center justify-start">
            <Link href="/" className="cursor-pointer">
                <Image loading="lazy" src={logo2} className="h-[64px] w-auto" alt="Agro Control" width={512} height={512} />
            </Link>
            
        </div>
    );
};
export default SidebarHeader;
