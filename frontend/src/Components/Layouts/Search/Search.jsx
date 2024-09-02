import React from "react";
import SStyle from "../Search/Search.module.css"

const Search = () => {
    return (
        <div>
            <div className={SStyle.search}>
                <input type="text" placeholder="Search..." className={SStyle.searchinput} />
                <button className={SStyle.searchbutton}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}
export default Search;