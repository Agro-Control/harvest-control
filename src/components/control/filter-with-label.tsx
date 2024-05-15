import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import FilterInformationLabel from "@/types/filter-information-label";
import {useQueryState} from "nuqs";
interface FilterProps {
    filter: FilterInformationLabel;
    paramType: string;
}

const FilterWithLabel = ({filter, paramType}: FilterProps) => {
    const setTypeParam = useQueryState(paramType)[1];
    const items = filter.filterItem;

    const handleValueChange = async (value: string) => {
        if (value === "all") return await setTypeParam("");

        await setTypeParam(value);
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="h-10 w-[180px] ">
                <SelectValue placeholder={paramType} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => {
                    return (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
export default FilterWithLabel;
