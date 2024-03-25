import Filter from "@/components/control/filter";
import SearchBar from "@/components/control/search-bar";

interface FilterItem {
    key: string;
    value: string;
}

export interface FilterInformation {
    filterItem: FilterItem[];
    title: string;
}

const statusFilter: FilterInformation = {
    title: "Status",
    filterItem: [
        {key: "Ativo", value: "active"},
        {
            key: "Inativo",
            value: "inactive",
        },
    ],
};
const profileFilter: FilterInformation = {
    title: "Perfil",
    filterItem: [
        {
            key: "Gestor",
            value: "manager",
        },
        {key: "Operador", value: "operator"},
    ],
};

export default function Users() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-start gap-10 px-6 pt-10 text-green-950 ">
            <div className="flex w-full flex-row ">
                <p className="font-poppins text-4xl font-medium">Gestão de usuarios</p>
            </div>
            <div className="flex w-full flex-row items-start justify-start gap-4 ">
                <SearchBar text="Digite o nome para pesquisar..." />
                <Filter filter={statusFilter} />
                <Filter filter={profileFilter} />
            </div>
        </div>
    );
}
