import { SearchIcon } from "lucide-react";
import React, { JSX } from "react";

const Search = ({
  handleSearch,
}: {
  handleSearch: (searchQuery: string) => void;
}) : JSX.Element => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleButtonClick = () => {
    handleSearch(searchQuery);
  };
  return (
    <div className="m-4 flex items-center">
      <div className="flex items-center w-full space-x-2  ">
        <input
          type="text"
          placeholder="Ask away..."
          value={searchQuery}
          className="w-10/12 px-4 py-2 border rounded-md bg-gray-500"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleButtonClick();
            }
          }}
        />
        <button
          onClick={handleButtonClick}
          className="w-2/12 py-2 px-2  flex items-center justify-center bg-pink-400 hover:bg-pink-800 transition  border rounded-md "
        >
          <SearchIcon className="h-4 w-4 text-white mr-2" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
