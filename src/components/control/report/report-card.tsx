import SearchBar from "@/components/control/search-bar";


const ReportCard = () => {

    return (
        <div
            className={`bg-report lg:col-span-1 flex min-h-[120px] w-[500px] px-10 flex-row items-center text-center justify-start rounded-xl bg-center bg-no-repeat`}
            >
                <div className="flex flex-col w-full items-start justify-start gap-2" >
                    <p className="text-white text-sm">Busque pela Ordem de Serviço</p>
                    <div className="flex w-[50%]">
                    <SearchBar text="Digite a ordem..." />
                         </div>
                    </div>
        </div>
    );
};
export default ReportCard;
