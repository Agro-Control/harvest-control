type CardType = "machines" | "companies" | "units" | "users" | "dashboard" | "group";
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
    "group": "bg-group",
    "dashboard": "bg-dashboard"
};

const FastAccessCard = ({title, image, isLast = false}: FastAcessCardProps) => {
    const bgImage = bgImageMap[image];
    const isCompaniesPath = image === "companies" || image === "units" || image === "group";
    const path = isCompaniesPath ? "business-management/" : "control/";

    return (
        <Link href={`${path}${image}`}  className={` ${isLast ? "md:col-span-2 lg:col-span-1" : ""} flex min-h-[192px] w-full`} >
        <div
            className={`${bgImage} flex min-h-[192px] w-full cursor-pointer flex-col items-center text-center justify-center rounded-xl bg-center bg-no-repeat transition-opacity hover:opacity-80`}
            
            >
            <p className="font-poppins text-2xl font-semibold text-white">{title}</p>
        </div>
           </Link>
    );
};
export default FastAccessCard;
