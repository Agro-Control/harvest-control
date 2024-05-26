"use client";
import useDebounce from "@/utils/hooks/useDebounce";
import {Input} from "@/components/ui/search";
import {useQueryState} from "nuqs";
import {useState} from "react";

interface SearchBarProps {
    text: string;
}

const SearchBar = ({text}: SearchBarProps) => {
    const setQueryParam = useQueryState("query")[1];
    const [query, setQuery] = useState<string | undefined>();
    const searchLengthRule = query && query.length > 0 && query.length < 3;
    useDebounce(
        () => {
            if (query === "") setQueryParam("");

            // if (searchLengthRule) return;

            if (query) setQueryParam(query);
        },
        1500,
        [query],
    );

    return <Input onChange={(e) => setQuery(e.target.value)} placeholder={text} spellCheck="false" />;
};

export default SearchBar;
