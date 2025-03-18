import GenreButton from './GenreButon';

function InputBox({
    animeName,
    setAnimeName,
    genre,
    setGenre,
    minEpisodes,
    setMinEpisodes,
    maxEpisodes,
    setMaxEpisodes,
    sortBy,
    setSortBy,
    onSearch
  }) {
    // Common genre list
    const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];
    
    // Convert string of genres to array
    const selectedGenres = genre.split(',').filter(g => g.trim() !== '');
    
    // Handle genre selection
    const handleGenreClick = (clickedGenre) => {
      const genreArray = genre.split(',').filter(g => g.trim() !== '');
      
      if (genreArray.includes(clickedGenre)) {
        // Remove genre if already selected
        const newGenres = genreArray.filter(g => g !== clickedGenre);
        setGenre(newGenres.join(','));
      } else {
        // Add genre if not already selected
        const newGenres = [...genreArray, clickedGenre];
        setGenre(newGenres.join(','));
      }
    };
    
    // Handle sort selection
    const handleSortChange = (value) => {
      setSortBy(value);
    };

    // Clear all filters
    const handleClearFilters = () => {
      setAnimeName("");
      setGenre("");
      setMinEpisodes("");
      setMaxEpisodes("");
      setSortBy("");
    };

    return (
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Search Anime</h2>
        
        <div className="space-y-6">
          {/* Anime Name Input */}
          <div>
            <label htmlFor="animeName" className="block text-sm font-medium text-gray-700 mb-1">Anime Name</label>
            <input
              id="animeName"
              type="text"
              placeholder="Enter anime title..."
              value={animeName}
              onChange={(e) => setAnimeName(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          {/* Genre Selection Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Genres</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {genres.map((g) => (
                <GenreButton 
                  key={g} 
                  genre={g} 
                  onClick={handleGenreClick} 
                  isSelected={selectedGenres.includes(g)}
                />
              ))}
            </div>
            
            {/* Selected Genres Display */}
            {selectedGenres.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-md text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-800">Selected Genres:</span>
                  <button 
                    onClick={() => setGenre("")} 
                    className="text-xs text-gray-500 hover:text-red-500"
                  >
                    Clear all
                  </button>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedGenres.map(g => (
                    <span key={g} className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                      {g}
                      <button 
                        onClick={() => handleGenreClick(g)} 
                        className="ml-1 text-blue-400 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Episode Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minEpisodes" className="block text-sm font-medium text-gray-700 mb-1">Min Episodes</label>
              <input
                id="minEpisodes"
                type="number"
                placeholder="Minimum"
                value={minEpisodes}
                onChange={(e) => setMinEpisodes(e.target.value)}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="maxEpisodes" className="block text-sm font-medium text-gray-700 mb-1">Max Episodes</label>
              <input
                id="maxEpisodes"
                type="number"
                placeholder="Maximum"
                value={maxEpisodes}
                onChange={(e) => setMaxEpisodes(e.target.value)}
                className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Sort By Radio Buttons */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sort Results By</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded-md">
              <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "episodes"}
                  onChange={() => handleSortChange("episodes")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Episodes ↑</span>
              </label>
              <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "-episodes"}
                  onChange={() => handleSortChange("-episodes")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Episodes ↓</span>
              </label>
              <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "rating"}
                  onChange={() => handleSortChange("rating")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Rating ↑</span>
              </label>
              <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "-rating"}
                  onChange={() => handleSortChange("-rating")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Rating ↓</span>
              </label>
              <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "name"}
                  onChange={() => handleSortChange("name")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Name (A-Z)</span>
              </label>
              <label className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === "-name"}
                  onChange={() => handleSortChange("-name")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Name (Z-A)</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
          <button
            onClick={handleClearFilters}
            className="text-gray-600 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </div>
    );
  }
  
  export default InputBox;
