import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import FilterInformation from "@/types/filter-information";
import {useTranslation} from "react-i18next";
import {useQueryState} from "nuqs";
interface FilterProps {
    filter: FilterInformation;
    paramType: string;
}

const Filter = ({filter, paramType}: FilterProps) => {
    const {t} = useTranslation();
    const setTypeParam = useQueryState(paramType)[1];

    const items = filter.filterItem;

    const handleValueChange = async (value: string) => {
        if (value === "all") return await setTypeParam("");

        await setTypeParam(value);
    };

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="h-10 w-[180px] ">
                <SelectValue placeholder={t(paramType)} />
            </SelectTrigger>
            <SelectContent>
            <SelectItem  value="all">
                            {t("all")}
                        </SelectItem>
                {items.map((item) => {
                    return (
                        <SelectItem key={item.value} value={item.value}>
                            {t(item.value)}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
export default Filter;
