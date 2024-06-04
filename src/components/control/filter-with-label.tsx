import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import FilterInformationLabel from "@/types/filter-information-label";
import {useQueryState} from "nuqs";
import {useTranslation}  from "react-i18next";

interface FilterProps {
    filter: FilterInformationLabel;
    paramType: string;
    isFull?: boolean;
}

const FilterWithLabel = ({filter, paramType, isFull = false}: FilterProps) => {
    const setTypeParam = useQueryState(paramType)[1];
    const items = filter.filterItem;
    const {t} = useTranslation();

    const handleValueChange = async (value: string) => {
        if (value === "all") return await setTypeParam("");

        await setTypeParam(value);
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className={`h-10 ${isFull ? "w-full" : "w-[180px]"}`}>
                <SelectValue placeholder={t(paramType)} />
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
