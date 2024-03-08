import Image from "next/image";

import logo2 from "@/assets/logo-column.svg";

const SidebarHeader = () => {
    return (
        <div className="flex h-screen max-h-[10vh] w-full flex-col items-center justify-center pt-4 ">
            <Image src={logo2} className="h-[64px] w-auto" alt="Agro Control" width={512} height={512} />
        </div>
    );
};
export default SidebarHeader;
