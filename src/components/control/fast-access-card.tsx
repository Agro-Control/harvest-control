import Link from "next/link";

type CardType = "machines" | "users" | "dashboard";

interface FastAcessCardProps {
    title: string;
    image: CardType;
}

const FastAccessCard = ({title, image}: FastAcessCardProps) => {
    const bgImage = image === "machines" ? "bg-machine" : image === "users" ? "bg-operator" : "bg-dashboard";

    return (
        <Link href={`control/${image}`}>
        <div
            className={`${bgImage} ${image === "dashboard" ? "col-span-2 lg:col-span-1" : ""} flex min-h-[192px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-center bg-no-repeat transition-opacity hover:opacity-80`}
            
            >
            <p className="font-poppins text-2xl font-semibold text-white">{title}</p>
        </div>
           </Link>
    );
};
export default FastAccessCard;
