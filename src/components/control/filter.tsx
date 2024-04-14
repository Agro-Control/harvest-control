import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterInformation } from "./../../app/control/users/page";
import { useQueryState } from "nuqs";
import { useState } from "react";

interface FilterProps {
    filter: FilterInformation;
    paramType: string;
    onSelectFilter?: (selected: string) => void; 
}

const Filter = ({ filter, paramType, onSelectFilter }: FilterProps) => {
    const setTypeParam = useQueryState(paramType)[1];

    const title = filter.title;
    const items = filter.filterItem;

    const [selectedValue, setSelectedValue] = useState(""); 

    const handleValueChange = async (value: string) => {
        setSelectedValue(value); 
        await setTypeParam(value);
        
       
        if (onSelectFilter) {
            onSelectFilter(value);
        }
    };

    return (
        <Select onValueChange={handleValueChange} value={selectedValue}> 
            <SelectTrigger className="h-10 w-[180px] ">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => {
                    return (
                        <SelectItem key={item.value} value={item.value}>
                            {item.key}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
export default Filter;