import SearchBar from "@/components/control/search-bar";
import FilterInformationLabel from "@/types/filter-information-label";
import FilterWithLabel from "@/components/control/filter-with-label";

const ReportCard = () => {
    const eventTypeFilter: FilterInformationLabel = {
        filterItem: [
            {value: "all", label: "Todos"},
            {value: "operacao", label: "Operação"},
            {value: "transbordo", label: "Transbordo"},
            {value: "deslocamento", label: "Deslocamento"},
            {value: "manutencao", label: "Manutenção"},
            {value: "clima", label: "Clima"},
            {value: "troca de turno", label: "Troca de Turno"},
        ],
    };

    return (
        <div className="flex w-full flex-col items-center gap-2">
           
                <SearchBar isReport text="Identificador" />
                <FilterWithLabel isFull filter={eventTypeFilter} paramType="Eventos" />
        </div>
    );
};
export default ReportCard;
