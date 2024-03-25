import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FilterInformation} from "./../../app/control/users/page";

interface FilterProps {
    filter: FilterInformation;
}

const Filter = ({filter}: FilterProps) => {
    const title = filter.title;
    const items = filter.filterItem;

    return (
        <Select>
            <SelectTrigger className="h-10 w-[180px] ">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => {
                    return <SelectItem value={item.value}>{item.key}</SelectItem>;
                })}
            </SelectContent>
        </Select>
    );
};
export default Filter;
