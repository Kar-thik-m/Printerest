import React, { useState } from "react";
import SStyle from "../Search/Search.module.css";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchTerm) return;

        try {
            const response = await fetch(`http://localhost:4000/item/search?query=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            const data = await response.json();
            setResults(data);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message);
            setResults([]); // Clear previous results on error
        }
    };

    return (
        <div>
            <div className={SStyle.search}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className={SStyle.searchinput} 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className={SStyle.searchbutton} onClick={handleSearch}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>

            {error && <div className={SStyle.error}>{error}</div>}
            
            <div className={SStyle.results}>
                {results.length > 0 ? (
                    results.map((pin) => (
                        <div key={pin._id} className={SStyle.resultItem}>
                            <h3>{pin.title}</h3>
                            <img src={pin.image.url} alt={pin.title} className={SStyle.resultImage} />
                        </div>
                    ))
                ) : (
                    <div className={SStyle.noResults}>No results found.</div>
                )}
            </div>
        </div>
    );
};

export default Search;
