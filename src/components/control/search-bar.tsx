"use client";
import {useState} from "react";
import {Input} from "@/components/ui/search";
import {useQueryState} from "nuqs";
import useDebounce from "@/utils/hooks/useDebounce";

interface SearchBarProps {
    text: string;
}

const SearchBar = ({text}: SearchBarProps) => {
    const setQueryParam = useQueryState("query")[1];
    const [query, setQuery] = useState("");
    const searchLengthRule = query.length > 0 && query.length < 3;
    useDebounce(
        () => {
            if (searchLengthRule) return;
            setQueryParam(query);
        },
        1500,
        [query],
    );

    return <Input onChange={(e) => setQuery(e.target.value)} placeholder={text} spellCheck="false" />;
};

export default SearchBar;
