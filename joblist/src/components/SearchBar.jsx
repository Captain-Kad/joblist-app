import "../styles/SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <>
      <div className="searchbar-container">
        <div className="input-wrapper">
                  <FaSearch id="search-icon"></FaSearch>
                  <input placeholder="Search for jobs by title or description..." type="text" />
        </div>
        <div>SearchResults</div>
      </div>
    </>
  );
};

export default SearchBar;
