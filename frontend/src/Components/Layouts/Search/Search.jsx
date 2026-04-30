import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchPin } from "../../../Action/Pins";
import { useNavigate } from "react-router-dom";
const Search = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleSearch = () => {
        try {
            dispatch(SearchPin(searchTerm));
            setSearchTerm("");
           
        } catch (error) {
            console.log(error);
        }finally{
            navigate(`/search/${searchTerm}`);
        }

    };

    return (
        <div className="w-auto md:w-[30rem] flex items-center">
            <input
                type="text"
                placeholder="Search..."
                className="p-2 text-base border border-[#e9e6e6] flex-grow rounded-l-[10px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="py-2 px-3 text-base border border-[#e9e6e6] text-[#d3cece] cursor-pointer rounded-r-[10px] hover:bg-[#f0f0f0] w-auto" onClick={handleSearch}>
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default Search;
