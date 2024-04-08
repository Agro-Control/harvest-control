type CardType = "machine" | "company" | "unity" | "operator" | "dashboard";

interface FastAcessCardProps {
    title: string;
    image: CardType;
}

const FastAccessCard = ({title, image}: FastAcessCardProps) => {
    const bgImage = image === "machine" ? "bg-machine" : image === "company" ? "bg-company" : image === "unity" ? "bg-unity" : image === "operator" ? "bg-operator" : "bg-dashboard";

    return (
        <div
            className={`${bgImage} ${image === "dashboard" ? "col-span-2 lg:col-span-1" : ""} flex min-h-[192px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-center bg-no-repeat transition-opacity hover:opacity-80`}
        >
            <p className="font-poppins text-2xl font-semibold text-white">{title}</p>
        </div>
    );
};
export default FastAccessCard;
