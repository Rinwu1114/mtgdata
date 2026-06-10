export default function SearchBar() {
    return(
            <input
                type="text"
                placeholder="Search cards..."
                className="bg-gray-800 text-gray-300
                 placeholder:text-gray-500
                   rounded-lg text-center h-12 w-full
                   flex
                    focus:border-purple-700 focus:ring-3
                     focus:ring-purple-700 focus:outline-none transition duration-200
                   "
            />
    )
}