function SearchBar({ placeholder }) {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full"
            />
        </div>
    );
}

export default SearchBar;