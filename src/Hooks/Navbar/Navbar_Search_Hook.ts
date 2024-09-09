import { ChangeEvent, useState } from "react";

function NavbarSearchHook() {
    // State to hold the current search word entered by the user
    const [searchWord, setSearchWord] = useState<string>("");

    // State to control the visibility of the search bar
    const [searchBar, setSearchBar] = useState(false);

    // Function to handle changes in the search input
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value); // Update the search word state with the current input value
        setSearchBar(e.target.value !== ""); // Show searchBar if there is any input
    };

    // Return the search word, change handler, search bar visibility, and function to set search bar state
    return [searchWord, onChangeSearch, searchBar, setSearchBar] as const; 
}

export default NavbarSearchHook;
