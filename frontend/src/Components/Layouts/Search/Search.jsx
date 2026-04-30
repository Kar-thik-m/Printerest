import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchPin } from "../../../Action/Pins";
import { useNavigate } from "react-router-dom";
const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = () => {
        try {
            dispatch(SearchPin(searchTerm));
            setSearchTerm("");

        } catch (error) {
            console.log(error);
        } finally {
            navigate(`/search/${searchTerm}`);
        }

    };

    return (
        <div className="w-full flex items-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200 border border-transparent focus-within:border-gray-300">
            <button className="pl-4 pr-2 text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer" onClick={handleSearch}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 bg-transparent outline-none text-base border-none text-gray-800 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
        </div>
    );
};

export default Search;
