import { ChangeEvent, useState } from "react";

function NavbarSearchHook() {
    const [searchWord, setSearchWord] = useState<string>("");
    const [searchBar, setSearchBar] = useState(false);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
        setSearchBar(e.target.value !== ""); // Show searchBar if there is input
    };

    return [searchWord, onChangeSearch, searchBar, setSearchBar] as const; 
}

export default NavbarSearchHook;
