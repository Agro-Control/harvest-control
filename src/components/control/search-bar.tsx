"use client";

import {Input} from "@/components/ui/search";

interface SearchBarProps {
    text: string;
}

const SearchBar = ({text}: SearchBarProps) => {
    return (
       
        <Input placeholder={text} spellCheck="false" />
    ); 
};

export default SearchBar;
