type CardType = "machines" | "companies" | "units" | "users" | "dashboard";
import {usePathname} from "next/navigation";
import Link from "next/link";

interface FastAcessCardProps {
    title: string;
    image: CardType;
    isLast?: boolean;
}

const bgImageMap = {
    "machines": "bg-machine",
    "companies": "bg-company",
    "units": "bg-unity",
    "users": "bg-operator",
    "dashboard": "bg-dashboard"
};

const FastAccessCard = ({title, image, isLast = false}: FastAcessCardProps) => {

    const pathname = usePathname();

    const bgImage = bgImageMap[image];
    const isCompaniesPath = image === "companies" || image === "units";
    const path = isCompaniesPath ? (pathname === "/control" ? "control/business-management/" : "business-management/") : "control/";

    return (
        <Link href={`${path}${image}`}  className={` ${isLast ? "md:col-span-2 lg:col-span-1" : " lg:col-span-1"} flex min-h-[192px] w-full`} >
        <div
            className={`${bgImage} flex min-h-[192px] w-full cursor-pointer flex-col items-center text-center justify-center rounded-xl bg-center bg-no-repeat transition-opacity hover:opacity-80`}
            
            >
            <p className="font-poppins text-2xl font-semibold text-white">{title}</p>
        </div>
           </Link>
    );
};
export default FastAccessCard;
