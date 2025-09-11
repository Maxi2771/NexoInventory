function SearchBar({ placeholder }) {
    return (
        <div className="bg-gray-800 p-2 rounded-lg">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full"
            />
        </div>
    );
}

export default SearchBar;